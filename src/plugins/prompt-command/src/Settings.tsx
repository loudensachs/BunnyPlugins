import React from "react";
import { ReactNative } from "@vendetta/metro/common";
import { Forms } from "@vendetta/ui/components";
import { showToast } from "@vendetta/ui/toasts";
import { getAssetIDByName } from "@vendetta/ui/assets";
import { storage } from "@vendetta/plugin";
import { useProxy } from "@vendetta/storage";

const { FormIcon, FormTextRow, FormButtonRow } = Forms;

export default () => {
  // Use useProxy to make the component reactive to storage changes
  useProxy(storage);

  // Directly access the API key from storage
  const apiKey = storage.openai_api_key || "";

  // Function to save the API key
  const saveApiKey = () => {
    if (!apiKey.trim()) {
      showToast("API key cannot be empty.", getAssetIDByName("ic_error"));
      return;
    }
    storage.openai_api_key = apiKey.trim();
    showToast("OpenAI API key saved.", getAssetIDByName("ic_success"));
  };

  // Function to clear the API key
  const clearApiKey = () => {
    storage.openai_api_key = "";
    showToast("OpenAI API key cleared.", getAssetIDByName("ic_success"));
  };

  // Handle text changes by updating the storage directly
  const onChangeText = (text) => {
    storage.openai_api_key = text;
  };

  return (
    <ReactNative.ScrollView style={{ padding: 16 }}>
      <FormTextRow
        label="OpenAI API Key"
        placeholder="Enter your OpenAI API key"
        value={apiKey}
        onChangeText={onChangeText}
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
