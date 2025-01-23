// components/MessageActionSheetButton.tsx
import { RedesignRow } from '@nexpid/vdp-shared'
import { getAssetIDByName } from '@vendetta/ui/assets'
import { showInputAlert } from '@vendetta/ui/alerts'
import { showToast } from '@vendetta/ui/toasts'
import { hideActionSheet } from '$/components/ActionSheet'
import { setEdit } from '..'
import { getEdit } from '..'
import { FluxDispatcher } from '@vendetta/metro/common'

export default function (message: {
  channel_id: string
  id: string
  content: string
}) {
  return (
    <RedesignRow
      label="Edit Local Message"
      icon={getAssetIDByName('PencilIcon')}
      onPress={() => {
        var initValue = message?.content.toString();

        //if edit exists, use that as initial value
        const edit = getEdit(message.channel_id, message.id);
        if (edit) {
          initValue = edit.newContent;
        }

        showInputAlert({
          title: 'Edit Local Message',
          confirmText: 'Edit',
          onConfirm: newContent => {
            const currentEdit = getEdit(message.channel_id, message.id);
            const originalContent = currentEdit?.originalContent ?? message.content;
            setEdit(message.channel_id, message.id, newContent, originalContent);
            showToast(
              'Message edited locally',
              getAssetIDByName('PencilIcon')
            );

            // Dispatch an update event to refresh the message UI
            FluxDispatcher.dispatch({
              type: "MESSAGE_UPDATE",
              message: {
                ...message,
                content: newContent,  // optionally include updated content
                // You can include additional flags if your patch depends on them
              },
            });
          },
          placeholder: 'Edited message content..',
          initialValue: initValue,
        });
        hideActionSheet();
      }}
    />
  );
}
