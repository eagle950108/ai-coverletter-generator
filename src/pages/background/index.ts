import reloadOnUpdate from 'virtual:reload-on-update-in-background-script';
import { apiPost } from '@root/src/shared/api/fetch';
import { CONTEXT_ITEM_LABEL, ROUTE, CONTEXT_ITEM_ID, CHAT_MODEL, PROMPT_SENTENCE } from '@root/src/shared/utils/constants';

reloadOnUpdate('pages/background');

reloadOnUpdate('pages/content/style.scss');

const showContextMenu = () => {
  removeContextMenu();
  chrome.contextMenus.create({
    id: CONTEXT_ITEM_ID,
    title: CONTEXT_ITEM_LABEL,
    contexts: ['selection']
  })
}

const removeContextMenu = () => {
  chrome.contextMenus.removeAll();
}

chrome.contextMenus.onClicked.addListener(async (info, tab) => {
  if (info.menuItemId === CONTEXT_ITEM_ID) {
    const jobDescription = info.selectionText;
    if (jobDescription) {
      const data = {
        "messages": [{ "role": "user", "content": PROMPT_SENTENCE + jobDescription }],
        "model": CHAT_MODEL,
        "temperature": 0.7,
        "n": 1
      }
      chrome.tabs.query({ active: true, currentWindow: true }, async (tabs) => {
        const activeTab = tabs[0];
        if (activeTab) {
          chrome.tabs.sendMessage(activeTab.id, { loading: true, data: null }, (response) => {
            if (chrome.runtime.lastError) {
            }
          });
          const response = await apiPost(ROUTE.API_URL, data);
          chrome.tabs.sendMessage(activeTab.id, { ...response, loading: false }, (response) => {
            if (chrome.runtime.lastError) {
            }
          });

        } else {
          // console.error("No active tab found.");
        }
      });
    }
  }
})

showContextMenu();