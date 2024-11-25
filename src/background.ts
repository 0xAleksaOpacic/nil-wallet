import { focusOrCreateOnboardingTab } from './utils/util.ts';

chrome.runtime.onInstalled.addListener(async ({ reason }) => {
  if (reason === "install") {
    await focusOrCreateOnboardingTab(); // Open onboarding when the extension is first installed
  }
});

// Example for using it in response to events
chrome.runtime.onMessage.addListener(async (message, _, sendResponse) => {
  if (message.action === "openOnboarding") {
    await focusOrCreateOnboardingTab(message.page); // Open specific onboarding page if needed
  }
  sendResponse({ success: true });
});