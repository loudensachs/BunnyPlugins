// stuff/patcher.ts
import { findByName, findByProps } from '@vendetta/metro'
import { React, ReactNative as RN } from '@vendetta/metro/common'
import { after, before } from '@vendetta/patcher'
import  saveEditsOnUnload  from '@vendetta/plugin'
import { getAssetIDByName } from '@vendetta/ui/assets'
import { LazyActionSheet } from '$/components/ActionSheet'
import { showInputAlert } from '@vendetta/ui/alerts'
import { hideActionSheet } from '$/components/ActionSheet'
import { setEdit } from '..'
import { getEdit } from '..'
import { findInReactTree } from '@vendetta/utils'
import Pinmes from '../components/MessageActionSheetButton'
import intlProxy from '$/lib/intlProxy'
import { RedesignRow } from '@nexpid/vdp-shared'
import { showToast } from '@vendetta/ui/toasts'

export default function () {
  // Explicitly type the patches array
  const patches: Array<() => void> = []
  

  patches.push(
    before('openLazy', LazyActionSheet, ([component, key, msg]) => {
        const message = msg?.message
        if (key !== 'MessageLongPressActionSheet' || !message) return

        component.then(i => {
            const unp = after('default', i, (_, comp) => {
                React.useEffect(
                    () => () => {
                        unp()
                    },
                    [],
                )

                const buttons = findInReactTree(
                    comp,
                    x => x[0]?.type?.name === 'ButtonRow',
                )
                if (!buttons) return comp

                const at = Math.max(
                    buttons.findIndex(
                        x => x.props.message === intlProxy.MARK_UNREAD,
                    ),
                    0,
                )
                buttons.splice(
                    at,
                    0,
                    React.createElement(Pinmes, message),
                )
            })
        })
    }),
)


const RowManager = findByName("RowManager");




// Add this patch to update message rows with local edits
patches.push(
  after('generate', RowManager.prototype, ([data], row) => {
    if (data.rowType !== 1 || !data.message) return;
  
    const editInfo = getEdit(data.message.channel_id, data.message.id);
  
    if (editInfo && saveEditsOnUnload) {
      row.message.content = editInfo.newContent;
    } else if (editInfo && !saveEditsOnUnload) {
      // When edits are cleared, revert to original content if available
      row.message.content = editInfo.originalContent ?? data.message.content;
    }
  
    if (data.message.__vml_deleted) {
      row.message.edited = "deleted";
      row.message.state = "SEND_FAILED";
    }
  })
);

  return () => {
    for (const unpatch of patches) {
      unpatch()
    }
  }
}
