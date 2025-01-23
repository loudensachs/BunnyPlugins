import { registerCommand } from "@vendetta/commands";
import { storage } from '@vendetta/plugin';
import settings from './Settings';
import { logger } from "@vendetta";
import { showToast } from "@vendetta/ui/toasts";
import { getAssetIDByName } from "@vendetta/ui/assets";

export interface CStorage {
  openai_api_key: string;
  // Add any additional properties you need here
  // For example:
  // edits: Record<string, Record<string, EditInfo>>,
  // saveEditsOnUnload?: boolean
}

export const cstorage = storage as CStorage;
// Command variable for unregistration
let chatGPTCommand: () => void;


// Function to call OpenAI's ChatGPT API
async function callChatGPT(prompt: string, apiKey: string): Promise<string> {
  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-4o",
        messages: [{ role: "user", content: prompt }],
        max_tokens: 550,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error.message || "Failed to fetch from OpenAI API");
    }

    const data = await response.json();
    return data.choices[0].message.content.trim();
  } catch (error) {
    logger.error("ChatGPT API Error:", error);
    throw error;
  }
}

export const onLoad = () => {
  chatGPTCommand = registerCommand({
    name: "chatgpt",
    displayName: "ChatGPT",
    description: "Interact with ChatGPT-4o",
    displayDescription: "Ask ChatGPT-4o a question",
    type: 1, // CHAT_INPUT
    applicationId: "-1",
    inputType: 1, // String input
    options: [
      {
        name: "prompt",
        displayName: "Prompt",
        description: "Your message to ChatGPT",
        displayDescription: "The prompt to send to ChatGPT",
        type: 3, // STRING
        required: true,
      },
    ],
    execute: async ([prompt], ctx) => {
      const apiKey = cstorage.openai_api_key;
      if (!apiKey) {
        showToast("OpenAI API key not set. Please set it in the plugin settings.", getAssetIDByName("ic_error"));
        return { content: "" };
      }
    
      if (typeof prompt !== "string") {
        showToast("❌ Error: Prompt must be a string.", getAssetIDByName("ic_error"));
        return { content: "" };
      }
    
      try {
        const response = await callChatGPT(prompt, apiKey);
        return { content: response };
      } catch (error) {
        showToast(`❌ Error: ${(error as Error).message}`, getAssetIDByName("ic_error"));
        return { content: "" };
      }
    },    
  });
};

export const onUnload = () => {
  if (chatGPTCommand) chatGPTCommand();
};

export { default as settings } from "./Settings";

