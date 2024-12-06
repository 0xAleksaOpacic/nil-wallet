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
import { z } from "zod";

// Define the schema for validation
const ExtensionResponseSchema = z.object({
  requestId: z.string(),
  result: z.any().optional(),
  error: z.any().optional(),
});

interface TransactionData {
  to: string;
  value: string;
  data: string;
}

const SignAndSend: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const client = useSelector((state: RootState) => state.blockchain.client) as PublicClient;
  const wallet = useSelector((state: RootState) => state.blockchain.wallet) as WalletV1;

  const [requestData, setRequestData] = useState<TransactionData | null>(null);
  const [requestId, setRequestId] = useState("");


  useEffect(() => {
    const fetchTransactionData = async () => {
      const hash = window.location.hash; // e.g., "#/sign-send?requestId=123"
      const queryString = hash.split("?")[1]; // Extract "requestId=123"
      const urlParams = new URLSearchParams(queryString); // Parse query string

      console.log("Parsed URL Params:", Array.from(urlParams.entries()));

      const requestId = urlParams.get("requestId");


      if (!requestId) {
        setError("No requestId provided in the URL.");
        return;
      }
      setRequestId(requestId)
      const storageKey = `window-${requestId}`;
      const data = await chrome.storage.local.get(storageKey);

      if (!data[storageKey]) {
        setError("No transaction data found for the provided requestId.");
        return;
      }
      console.log(data[storageKey])
      setRequestData(data[storageKey]);
    };

    fetchTransactionData();
  }, []);

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
      if (!requestData) {
        setError("Transaction data is missing.");
        return;
      }

      const { to, value, data } = requestData;

      console.log("Signing and sending transaction...");

      console.log(to)
      console.log(value)
      console.log(data)
      const hash = await wallet.sendMessage({
        to: to as Hex,
        value: BigInt(value),
        data: data as Hex,
        feeCredit: 10_000_000n,
      });

      console.log(hash)

      await waitTillCompleted(client, hash);

      console.log("Transaction sent successfully!");

      // Fetch updated balance and update Redux
      await getBalance(client, wallet.address, dispatch);

      // Construct the response object
      const response = {
        requestId: requestId, // Ensure requestId is available in your logic
        result: {
          status: "success",
          transactionHash: hash,
          timestamp: new Date().toISOString(),
        },
      };

      // Validate the response against the schema
      const validatedResponse = ExtensionResponseSchema.parse(response);

      // Send response back to the background script
      const port = chrome.runtime.connect({ name: "signAndSend" });
      port.postMessage(validatedResponse);

      setLoading(false);

      setTimeout(() => {
        window.close();
      }, 100);
      navigate(PopupRoutes.BASE);
    } catch (err) {
      console.error("Error sending transaction:", err);
      setError("Failed to sign and send the transaction. Please try again.");
      setLoading(false);

      const port = chrome.runtime.connect({ name: "signAndSend" });
      port.postMessage({ status: "error", message: err });
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
