import React, { useState } from "react";
import { ReactNative } from "@vendetta/metro/common";
import { Forms } from "@vendetta/ui/components";
import { showToast } from "@vendetta/ui/toasts";
import { getAssetIDByName } from "@vendetta/ui/assets";
import { storage } from "@vendetta/plugin";
import { useProxy } from "@vendetta/storage";

const { FormIcon, FormTextRow, FormButtonRow } = Forms;

export default () => {
  useProxy(storage);
  const [apiKey, setApiKey] = useState(storage.openai_api_key || "");

  const saveApiKey = () => {
    if (!apiKey.trim()) {
      showToast("API key cannot be empty.", getAssetIDByName("ic_error"));
      return;
    }
    storage.openai_api_key = apiKey.trim();
    showToast("OpenAI API key saved.", getAssetIDByName("ic_success"));
  };

  const clearApiKey = () => {
    storage.openai_api_key = "";
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