import { ReactNative, stylesheet } from "@vendetta/metro/common";
import { Forms } from "@vendetta/ui/components";
import { showConfirmationAlert } from "@vendetta/ui/alerts";
import { getAssetIDByName } from "@vendetta/ui/assets";
import { showToast } from "@vendetta/ui/toasts";
import { useProxy } from "@vendetta/storage";
import { storage } from "@vendetta/plugin";
import { cstorage } from ".";
import { showInputAlert } from '@vendetta/ui/alerts'
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
storage.signature ??= true;
storage.includePrompt ??= true;

export default () => {
  useProxy(storage);
  useProxy(cstorage);

  return (
    <ReactNative.ScrollView>
      <FormSwitchRow
        label="Include Prompt in Response"
        leading={<FormIcon source={getAssetIDByName("ic_edit_24px")} />}
        onValueChange={(v) => (storage.includePrompt = v)}
        value={storage.includePrompt}
      />
      <FormSwitchRow
        label="GPT Signature"
        leading={<FormIcon source={getAssetIDByName("ic_edit_24px")} />}
        onValueChange={(v) => (storage.signature = v)}
        value={storage.signature}
      />
      <FormRow
        label="Set OpenAI API Key"
        leading={
          <FormRow.Icon
            style={styles.destructiveIcon}
            source={getAssetIDByName('ic_globe_24px')}
          />
        }
        onPress={() => {
          showInputAlert({
            title: 'Set OpenAI API Key',
            confirmText: 'Set',
            confirmColor: 'blue' as ButtonColors,
            onConfirm: (apiKey) => {
              cstorage.openai_api_key = apiKey;
              showToast('OpenAI API Key set successfully');
            },
            initialValue: cstorage.openai_api_key,
          });
        }}
      />

    </ReactNative.ScrollView>
  );
};
