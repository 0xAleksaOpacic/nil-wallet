export async function focusOrCreateOnboardingTab(page?: string): Promise<void> {
  const extension = await chrome.management.getSelf();

  const tabs = await chrome.tabs.query({
    url: `chrome-extension://${extension.id}/onboarding.html*`,
  });
  const tab = tabs[0];

  const url = `onboarding.html#/${page || ""}`; // Adjust as needed for your routes

  if (!tab?.id) {
    await chrome.tabs.create({ url });
    return;
  }

  // Focus the existing tab if it's already open
  await chrome.tabs.update(tab.id, { active: true });
}

export async function openPopup(): Promise<void> {
  try {
    await chrome.action.openPopup();
  } catch (error) {
    console.error("Error opening popup:", error);
  }
}