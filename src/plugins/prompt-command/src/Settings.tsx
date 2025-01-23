// Settings.tsx
import React, { useState } from "react";
import { ReactNative } from "@vendetta/metro/common";
import { Forms } from "@vendetta/ui/components";
import { showToast } from "@vendetta/ui/toasts";
import { getAssetIDByName } from "@vendetta/ui/assets";
import { useProxy } from "@vendetta/storage";
import { cstorage } from "."; // Adjust the import path as necessary

const { FormIcon, FormTextRow, FormButtonRow } = Forms;

export default () => {
  useProxy(cstorage);
  const [apiKey, setApiKey] = useState(cstorage.openai_api_key || "");

  const saveApiKey = () => {
    if (!apiKey.trim()) {
      showToast("API key cannot be empty.", getAssetIDByName("ic_error"));
      return;
    }
    cstorage.openai_api_key = apiKey.trim();
    showToast("OpenAI API key saved.", getAssetIDByName("ic_success"));
  };

  const clearApiKey = () => {
    cstorage.openai_api_key = "";
    setApiKey("");
    showToast("OpenAI API key cleared.", getAssetIDByName("ic_success"));
  };

  return (
    <ReactNative.ScrollView style={{ padding: 16 }}>
      <FormTextRow
        label="OpenAI API Key"
        placeholder="Enter your OpenAI API key"
        value={apiKey}
        onChangeText={setApiKey}
        secureTextEntry
        leading={<FormIcon source={getAssetIDByName("ic_key")} />}
      />
      <FormButtonRow
        label="Save API Key"
        leading={<FormIcon source={getAssetIDByName("ic_save")} />}
        onPress={saveApiKey}
      />
      <FormButtonRow
        label="Clear API Key"
        leading={<FormIcon source={getAssetIDByName("ic_delete")} />}
        onPress={clearApiKey}
        destructive
      />
    </ReactNative.ScrollView>
  );
};
