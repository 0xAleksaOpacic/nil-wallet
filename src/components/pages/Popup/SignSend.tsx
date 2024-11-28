import React, { useEffect, useState } from 'react';
import { Box, Image, VStack, Text } from "@chakra-ui/react";
import PrimaryButton from "../../atoms/PrimaryButton.tsx";
import OnboardingCardLoader from "../../atoms/OnboardingCardLoader.tsx";
import { useDispatch } from "react-redux";
import { getBalance } from "../../../services/wallet.ts";
import { RootState } from "../../../store";
import { useSelector } from "react-redux";
import { PublicClient, WalletV1, Hex, waitTillCompleted } from "@nilfoundation/niljs";
import { initializeFromStorageAndSetup } from '../../../background/state.ts';
import { useNavigate } from 'react-router-dom';
import { PopupRoutes } from '../../../router/routes.ts';

const SignAndSend: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const client = useSelector((state: RootState) => state.blockchain.client) as PublicClient;
  const wallet = useSelector((state: RootState) => state.blockchain.wallet) as WalletV1;

  useEffect(() => {
    (async () => {
      try {
        // Initialize data from storage
        await initializeFromStorageAndSetup(dispatch);

      } catch (error) {
        console.error("Error during initialization:", error);
      }
    })();
  }, []);

  const handleSignAndSend = async () => {
    if (!client || !wallet) {
      setError("Blockchain resources are not initialized");
      return;
    }

    setError(null);
    setLoading(true);

    try {
      // Retrieve transaction data from Chrome storage
      const { transactionData } = await chrome.storage.local.get("transactionData");

      if (!transactionData) {
        throw new Error("No transaction data found");
      }

      console.log(transactionData)

      const { to, value, data } = transactionData;

      console.log("Signing and sending transaction...");
      const hash = await wallet.sendMessage({
        to: to as Hex,
        value: BigInt(value),
        data: data,
        feeCredit: 10_000_000n,
      });

      await waitTillCompleted(client, hash);

      console.log(hash)

      // Fetch updated balance and update Redux
      await getBalance(client, wallet.address, dispatch);

      console.log("Transaction sent successfully!");
      // Respond back to the sender (frontend via port or messaging)
      //const port = chrome.runtime.connect({ name: "signAndSend" });
      //port.postMessage({ status: "success", transactionHash: hash });

      const port = chrome.runtime.connect({ name: "signAndSend" });
      port.postMessage({ status: "success", transactionHash: hash });
      setLoading(false);
      navigate(PopupRoutes.BASE);
    } catch (err) {
      console.error("Error sending transaction:", err);
      setError("Failed to sign and send the transaction. Please try again.");
      setLoading(false);
    }
  };

  return (
    <Box p={4} position="relative">
      {/* Loader */}
      {loading && <OnboardingCardLoader borderRadius="0" />} {/* Show loader when processing */}

      {/* Icon */}
      <Box display="flex" justifyContent="center" mt={4} mb={6}>
        <Image src="/icons/sendSign.svg" alt="Sign and Send" boxSize="100px" />
      </Box>

      {/* Error Message */}
      {error && (
        <Text fontSize="sm" color="red.500" textAlign="center" mb={4}>
          {error}
        </Text>
      )}

      {/* Sign And Send Button */}
      <VStack spacing={4} align="center" width="100%">
        <PrimaryButton onClick={handleSignAndSend}>Sign and Send</PrimaryButton>
      </VStack>
    </Box>
  );
};

export default SignAndSend;
