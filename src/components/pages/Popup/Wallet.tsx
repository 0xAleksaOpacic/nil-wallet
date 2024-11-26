import { useEffect } from 'react';
import { redirectToOnboardingIfNeeded } from '../../../utils/util.ts';

function Wallet() {
  useEffect(() => {
    (async () => {
      await redirectToOnboardingIfNeeded();
    })();
  }, []);

  return (
    <div>
      <h1>test popup</h1>
  </div>
);
}


export default Wallet;