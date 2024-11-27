import { useEffect } from 'react';
import { Box, Text, IconButton } from '@chakra-ui/react';
import { redirectToOnboardingIfNeeded } from '../../../background/onboarding.ts';
import WalletButton from '../../atoms/WalletButton.tsx';
import { useNavigate } from 'react-router-dom';
import { PopupRoutes } from '../../../router/routes.ts';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { initializeFromStorageAndSetup } from '../../../background/state.ts';

function WalletDetails() {
  const navigate = useNavigate();
  const balance = useSelector((state: RootState) => state.wallet.balance);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      try {
        // Check onboarding status
        await redirectToOnboardingIfNeeded();

        // Initialize data from storage
        await initializeFromStorageAndSetup(dispatch);

        console.log("Initialization and setup complete");
      } catch (error) {
        console.error("Error during initialization:", error);
      }
    })();
  }, [dispatch]);

  return (
    <Box
      p={3}
      mt={4}
      display="flex"
      flexDirection="column"
      alignItems="center"
      flex="1"
    >
      {/* Header IconButton */}
      <IconButton
        aria-label="=nil;"
        icon={<Text color="white" fontWeight="bold" fontSize="sm">=nil;</Text>}
        size="lg"
        bg="wallet.darkGray"
        _hover={{ bg: 'wallet.darkGray' }}
        mb={3}
      />

      {/* Wallet Balance */}
      <Text fontSize="lg" color="gray.600">Wallet Balance</Text>

      {/* Balance Value */}
      <Text fontSize="lg" fontWeight="medium" color="black" mb={6}>
        {balance} <span>NIL</span>
      </Text>

      {/* Action Buttons */}
      <Box display="flex" gap={2} width="100%">
        <WalletButton
          text="Send"
          color="wallet.darkGray"
          iconSrc="/icons/send.svg"
          onClick={() => navigate(PopupRoutes.SEND_TOKENS)}
        />
        <WalletButton
          text="Use Faucet"
          color="wallet.lightBlue"
          iconSrc="/icons/drop.svg"
          onClick={() => navigate(PopupRoutes.TOP_UP)}
        />
      </Box>
    </Box>
  );
}

export default WalletDetails;
