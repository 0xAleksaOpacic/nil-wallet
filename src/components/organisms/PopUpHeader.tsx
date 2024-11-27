import { Box, Text, Image, HStack } from "@chakra-ui/react";
import { truncateAddress } from "../../utils/address.ts";
import ClickableImage from '../atoms/ClickableImage.tsx';
import { focusOrCreateOnboardingTab } from '../../background/onboarding.ts';
import { useNavigate } from 'react-router-dom';
import { PopupRoutes } from '../../router/routes.ts';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

const PopUpHeader = () => {
  const navigate = useNavigate();
  const wallet = useSelector((state: RootState) => state.blockchain.wallet);

  const handleCopy = async () => {
    if (wallet?.address) {
      try {
        await navigator.clipboard.writeText(wallet.address);
        console.log("Address copied to clipboard:", wallet.address);
      } catch (error) {
        console.error("Failed to copy address:", error);
      }
    }
  };

  return (
    <Box
      width="100%"
      height="60px"
      bg="white" // Background set to white
      boxShadow="0px 4px 6px -1px rgba(0, 0, 0, 0.1)" // Subtle bottom shadow
      display="flex"
      alignItems="center"
      paddingX={4}
    >
      {/* Left Icon (Ice Shards) */}
      <ClickableImage
        src="/icons/network.svg"
        alt="Network Icon"
        boxSize="20px"
        onClick={() => navigate(PopupRoutes.NETWORK)}
      />

      {/* Center Text + Copy Icon */}
      <HStack spacing={2} flex="1" justifyContent="center">
        <Text fontSize="sm" color="gray.600">
          {wallet?.address ? truncateAddress(wallet.address) : "No Address"}
        </Text>
        {/* Copy Icon */}
        <Box
          as="button"
          onClick={handleCopy}
          _hover={{ transform: "scale(1.1)", cursor: "pointer" }}
          _active={{ transform: "scale(0.95)" }}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Image src="/icons/copy.svg" alt="Copy" boxSize="13px" />
        </Box>
      </HStack>

      {/* Right Icon (Exit) */}
      <Box
        as="button"
        _hover={{ transform: "scale(1.1)", cursor: "pointer" }}
        _active={{ transform: "scale(0.95)" }}
        display="flex"
        alignItems="center"
        justifyContent="center"
        onClick={focusOrCreateOnboardingTab}
      >
        <Image src="/icons/exit.svg" alt="Exit" boxSize="20px" />
      </Box>
    </Box>
  );
};

export default PopUpHeader;
