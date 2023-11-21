import reloadOnUpdate from 'virtual:reload-on-update-in-background-script';
import { apiGet, apiPost } from '@root/src/shared/api/fetch';
import { CONTEXT_ITEM_LABEL, ROUTE, KEY_ACCESS_TOKEN, CONTEXT_ITEM_ID } from '@root/src/shared/utils/constants';

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
      const response = await apiGet(ROUTE.GetCoverLetter + jobDescription);
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        const activeTab = tabs[0];
        if (activeTab) {
          chrome.tabs.sendMessage(activeTab.id, { data: response.data.data }, (response) => {
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