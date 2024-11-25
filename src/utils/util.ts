export async function focusOrCreateOnboardingTab(): Promise<void> {
  const extension = await chrome.management.getSelf();

  const tabs = await chrome.tabs.query({
    url: `chrome-extension://${extension.id}/onboarding.html*`,
  });
  const tab = tabs[0];

  const url = `onboarding.html#`;

  if (!tab?.id) {
    await chrome.tabs.create({ url });
    return;
  }

  // Focus the existing tab if it's already open
  await chrome.tabs.update(tab.id, { active: true });
}

export async function isOnboarded(): Promise<boolean> {
  const data = await chrome.storage.local.get("onboardingComplete");
  return data.onboardingComplete === true;
}

export async function setOnboardingComplete(): Promise<void> {
  console.log("setOnboardingComplete")
  await chrome.storage.local.set({ onboardingComplete: true });
}