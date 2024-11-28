import { focusOrCreateOnboardingTab  } from './onboarding.ts';

chrome.runtime.onInstalled.addListener(async ({ reason }) => {
  if (reason === "install") {
    // Open onboarding when the extension is first installed
    await focusOrCreateOnboardingTab();
  }
});

// Listen for incoming messages from the frontend
chrome.runtime.onMessageExternal.addListener(async (message, _, sendResponse) => {
  console.log("Message received from frontend1111:", message);

  switch (message.action) {
    case "signAndSend":
      console.log("Sign and Send request received with payload:", message.payload);

      // Save the transaction data
      transactionData = message.payload;

      // Set transaction data
      await chrome.storage.local.set({ transactionData: transactionData });

      // Open the popup page for signing and sending
      // Dynamically set the popup page
      chrome.action.setPopup({ popup: "popup.html#/sign-send" });

      // Keep the connection open
      sendResponse({ status: "success", message: "Popup opened." });
      break;

    default:
      console.warn("Unknown action received:", message.action);
      sendResponse({ status: "error", message: "Unknown action!" });
      break;
  }

  // Return true to indicate asynchronous response
  return true;
});



// Store transaction data
let transactionData: { to: string; value: string; data: string } | null = null;
let activePort: chrome.runtime.Port | null = null;
// Handle port connections
chrome.runtime.onConnectExternal.addListener((port) => {
  if (port.name === "signAndSend") {
    console.log("Set Active port:", port.name);
    activePort = port;

    // Handle port disconnection
    port.onDisconnect.addListener(() => {
      console.log("External port disconnected");
      if (activePort === port) {
        activePort = null; // Clear activePort only if it matches the disconnected port
      }
    });
  }
});

chrome.runtime.onConnect.addListener((port) => {
  if (port.name === "signAndSend") {
    console.log("Internal port connected");

    // Send the transaction data to the internal frontend
    port.postMessage({
      action: "init",
      payload: transactionData,
    });

    // Forward messages from the internal port to the external port
    port.onMessage.addListener((msg) => {
      console.log("Message from internal frontend:", msg);

      if (activePort) {
        activePort.postMessage(msg);
        chrome.action.setPopup({ popup: "popup.html" });
      }
    });

    // Handle port disconnection
    port.onDisconnect.addListener(() => {
      console.log("Internal port disconnected");
    });
  }
});
