import { focusOrCreateOnboardingTab  } from './onboarding.ts';

chrome.runtime.onInstalled.addListener(async ({ reason }) => {
  if (reason === "install") {
    // Open onboarding when the extension is first installed
    await focusOrCreateOnboardingTab();
  }
});
