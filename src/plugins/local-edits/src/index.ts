import { storage } from '@vendetta/plugin'
import settings from './components/Settings'
import patcher from './stuff/patcher'

export interface EditInfo {
  newContent: string;
  originalContent?: string;
}

export const vstorage = storage as {
  edits: Record<string, Record<string, EditInfo>>,
  saveEditsOnUnload?: boolean
}

export function setEdit(channel: string, id: string, newContent: string, originalContent?: string) {
  vstorage.edits[channel] ??= {};
  vstorage.edits[channel][id] = { newContent, originalContent };
}

export function getEdit(channel: string, id: string): EditInfo | undefined {
  return vstorage.edits[channel]?.[id];
}


let unpatch: () => void
export default {
  onLoad: () => {
    // Initialize default values if they don't exist
    vstorage.edits ??= {}
    if (vstorage.saveEditsOnUnload === undefined) {
      vstorage.saveEditsOnUnload = true
    }
    if (!vstorage.saveEditsOnUnload ) {
      vstorage.edits = {}
    }
    unpatch = patcher()
  },
  onUnload: () => {
    // Clear edits if saving on unload is disabled
    if (!vstorage.saveEditsOnUnload) {
      vstorage.edits = {}
    }
    unpatch()
  },
  settings,
}
