import { ReactNative, stylesheet } from "@vendetta/metro/common";
import { Forms } from "@vendetta/ui/components";
import { showConfirmationAlert } from "@vendetta/ui/alerts";
import { getAssetIDByName } from "@vendetta/ui/assets";
import { showToast } from "@vendetta/ui/toasts";
import { useProxy } from "@vendetta/storage";
import { storage } from "@vendetta/plugin";
import { vstorage } from "..";
import { FluxDispatcher } from "@vendetta/metro/common";
import { semanticColors } from '@vendetta/ui'
import Text from "$/components/Text";

const styles = stylesheet.createThemedStyleSheet({
  destructiveIcon: {
    tintColor: semanticColors.TEXT_DANGER,
  },
})
const destructiveText: Parameters<typeof Text>[0] = {
  color: 'TEXT_DANGER',
  variant: 'text-md/semibold',
}


const { FormIcon, FormSwitchRow, FormRow } = Forms;

// Initialize default value for the setting if not present
storage.saveEditsOnUnload ??= true;

export default () => {
  useProxy(storage);
  useProxy(vstorage);

  return (
    <ReactNative.ScrollView>
      <FormSwitchRow
        label="Save Edits on Unload"
        leading={<FormIcon source={getAssetIDByName("ic_block")} />}
        onValueChange={(v) => (storage.saveEditsOnUnload = v)}
        value={storage.saveEditsOnUnload}
      />
      <FormRow
        label={<Text {...destructiveText}>Clear Edits</Text>}
        leading={
          <FormRow.Icon
            style={styles.destructiveIcon}
            source={getAssetIDByName('TrashIcon')}
          />
        }
        onPress={() => {
          showConfirmationAlert({
            title: 'Clear Edits',
            content:
              'Are you sure you want to clear all local edits?',
            confirmText: 'Clear',
            confirmColor: 'red' as ButtonColors,
            onConfirm: () => {
              const messagesToUpdate: { channel_id: string; id: string; content: string | undefined; }[] = [];

              // Collect all messages that have local edits
              for (const channel in vstorage.edits) {
                for (const msgId in vstorage.edits[channel]) {
                  const editInfo = vstorage.edits[channel][msgId];
                  messagesToUpdate.push({
                    channel_id: channel,
                    id: msgId,
                    content: editInfo.originalContent,
                  });
                }
              }

              // Clear all local edits
              vstorage.edits = {};

              // Dispatch an update for each message to force a UI refresh
              for (const msg of messagesToUpdate) {
                FluxDispatcher.dispatch({
                  type: 'MESSAGE_UPDATE',
                  message: msg,
                });
              }

              showToast('All local edits cleared', getAssetIDByName('TrashIcon'));
            },

            isDismissable: true,
          })
        }}
      />
    </ReactNative.ScrollView>
  );
};
