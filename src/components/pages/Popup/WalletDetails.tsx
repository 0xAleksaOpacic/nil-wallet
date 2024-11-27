import { useEffect, useState } from 'react';
import { Box, Text, IconButton } from '@chakra-ui/react';
import { redirectToOnboardingIfNeeded } from '../../../background/onboarding.ts';
import WalletButton from '../../atoms/WalletButton.tsx';
import { useNavigate } from 'react-router-dom';
import { PopupRoutes } from '../../../router/routes.ts';

function WalletDetails() {
  const [balance, _] = useState('123 987 19374'); // Initial state for balance
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      await redirectToOnboardingIfNeeded();
    })();
  }, []);

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
