c

export async function redirectToOnboardingIfNeeded(): Promise<void> {
  const onboarded = await isOnboarded();

  if (!onboarded) {
    // Redirect to onboarding tab
    const onboardingUrl = chrome.runtime.getURL("onboarding.html");
    await chrome.tabs.create({ url: onboardingUrl });

    // Close the popup
    window.close();
  }
}


export async function isOnboarded(): Promise<boolean> {
  const data = await chrome.storage.local.get("onboardingComplete");
  return data.onboardingComplete === true;
}

export async function setOnboardingComplete(): Promise<void> {
  console.log("setOnboardingComplete")
  await chrome.storage.local.set({ onboardingComplete: true });
}