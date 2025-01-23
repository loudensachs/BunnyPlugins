// Settings.tsx without useState
import React from "react";
import { ReactNative } from "@vendetta/metro/common";
import { Forms } from "@vendetta/ui/components";
import { showToast } from "@vendetta/ui/toasts";
import { getAssetIDByName } from "@vendetta/ui/assets";
import { useProxy } from "@vendetta/storage";
import { cstorage } from "."; // Adjust the import path as necessary

const { FormIcon, FormTextRow, FormButtonRow } = Forms;

export default () => {
  useProxy(cstorage);

  const saveApiKey = () => {
    if (!cstorage.openai_api_key.trim()) {
      showToast("API key cannot be empty.", getAssetIDByName("ic_error"));
      return;
    }
    showToast("OpenAI API key saved.", getAssetIDByName("ic_success"));
  };

  const clearApiKey = () => {
    cstorage.openai_api_key = "";
    showToast("OpenAI API key cleared.", getAssetIDByName("ic_success"));
  };

  return (
    <ReactNative.ScrollView style={{ padding: 16 }}>
      <FormTextRow
        label="OpenAI API Key"
        placeholder="Enter your OpenAI API key"
        value={cstorage.openai_api_key}
        onChangeText={(text) => {
          cstorage.openai_api_key = text;
        }}
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
