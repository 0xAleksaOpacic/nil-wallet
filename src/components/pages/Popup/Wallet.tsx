import React, { useEffect } from 'react';
import { isOnboarded } from '../../../utils/util.ts';

function Wallet() {
  useEffect(() => {
    (async () => {
      const onboarded = await isOnboarded();

      if (!onboarded) {
        // Redirect to onboarding tab
        const onboardingUrl = chrome.runtime.getURL("onboarding.html");
        await chrome.tabs.create({ url: onboardingUrl });

        // Close the popup
        window.close();
      }
    })();
  }, []);

  return (
    <div>
      <h1>test popup</h1>
  </div>
);
}
