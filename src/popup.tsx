import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { isOnboarded } from './utils/util.ts';

// Popup component
function Popup() {
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

// Render the popup
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Popup />
  </React.StrictMode>
);