import { focusOrCreateOnboardingTab } from './onboarding.ts';
import { ExtensionResponse } from '../contentScripts/types.ts';
import { ACTIONS } from './constants.ts';

chrome.runtime.onInstalled.addListener(async ({ reason }) => {
  if (reason === "install") {
    // Open onboarding when the extension is first installed
    await focusOrCreateOnboardingTab();
  }
});

async function openPopupWindow(requestId) {
  const popupWidth = 350;
  const popupHeight = 480;

  const [activeTab] = await chrome.tabs.query({ active: true, currentWindow: true });

  if (!activeTab) {
    console.error("No active tab found.");
    return;
  }

  const currentWindow = await chrome.windows.getCurrent();

  if (!currentWindow) {
    console.error("No current window found.");
    return;
  }

  const left = Math.round(currentWindow.left! + (currentWindow.width! - popupWidth) / 2);
  const top = Math.round(currentWindow.top! + (currentWindow.height! - popupHeight) / 2);

  // Pass `requestId` in the URL as a query parameter
  await chrome.windows.create({
    url: chrome.runtime.getURL(`popup.html#/sign-send?requestId=${requestId}`),
    type: "popup",
    width: popupWidth,
    height: popupHeight,
    left,
    top,
  });
}

// Function to save request data into Chrome's local storage
const saveRequestData = async (requestId, requestData) => {
  try{
  const storageKey = `window-${requestId}`;
  await chrome.storage.local.set({ [storageKey]: requestData });
  }catch(err){
    console.log(err)
  }
};

// Map to store requestId -> port mappings
const requestPortMap = new Map();

chrome.runtime.onConnect.addListener((port) => {
  console.log("Background: Port connected", port.name);

  if (port.name === "extension-handler") {
    port.onMessage.addListener(async (message) => {
      console.log("Background: Received message from content script:", message);

      const requestId = message.request.requestId;
      const { to, value, data } = message.request.params[0];

      // Prepare the data to be saved
      const requestData = { to, value, data };
      if (requestId) {
        // Associate requestId with the content script port
        requestPortMap.set(requestId, port);
      }

      // Process the request and open the popup
      await saveRequestData(requestId, requestData)
      await openPopupWindow(requestId)
    });

    port.onDisconnect.addListener(() => {
      console.log("Background: Content script port disconnected");
    });
  }

  if (port.name === "signAndSend") {
    port.onMessage.addListener((message) => {
      console.log("Background: Received message from popup:", message);

      const { requestId } = message;

      // Find the associated port using requestId
      const targetPort = requestPortMap.get(requestId);
      if (targetPort) {
        targetPort.postMessage(message); // Forward the message to the original content script
        requestPortMap.delete(requestId); // Clean up after forwarding
      } else {
        console.error(`No port found for requestId: ${requestId}`);
      }
    });

    port.onDisconnect.addListener(() => {
      console.log("Background: Popup port disconnected");
    });
  }
});
