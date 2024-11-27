import React, { useState } from "react";
import { Box, Image, VStack, Text } from "@chakra-ui/react";
import BackButton from "../../atoms/BackButton.tsx";
import TextInput from "../../atoms/TextInput.tsx";
import PrimaryButton from "../../atoms/PrimaryButton.tsx";
import { PopupRoutes } from "../../../router/routes.ts";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import { sendTokens } from "../../../services/wallet.ts";
import OnboardingCardLoader from "../../atoms/OnboardingCardLoader.tsx";
import { useNavigate } from "react-router-dom";

const SendTokens: React.FC = () => {
  const [toAddress, setToAddress] = useState("");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Access blockchain resources from Redux
  const { wallet, client} = useSelector(
    (state: RootState) => state.blockchain
  );

  const handleSend = async () => {
    if (!wallet || !client) {
      setError("Blockchain resources are not initialized.");
      return;
    }

    if (!toAddress || !amount) {
      setError("Both address and amount are required.");
      return;
    }

    setError("");
    setLoading(true);
    try {
      await sendTokens({
        wallet,
        client,
        toAddress,
        amount,
      });

      navigate(PopupRoutes.BASE); // Return to main page
    } catch (err) {
      setError("Failed to send tokens. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box p={4} position="relative">
      {/* Loader */}
      {loading && <OnboardingCardLoader borderRadius="0" />}

      {/* Back Button */}
      <BackButton to={PopupRoutes.BASE} />

      {/* Icon */}
      <Box display="flex" justifyContent="center" mt={0} mb={3}>
        <Image src="/icons/sendMoney.svg" alt="Send Money" boxSize="73px" />
      </Box>

      {/* Input Fields */}
      <VStack spacing={4} align="center" width="100%">
        {/* Error Message */}
        {error && (
          <Text fontSize="sm" color="red.500">
            {error}
          </Text>
        )}

        {/* To Address Field */}
        <TextInput
          placeholder="To"
          value={toAddress}
          onChange={(e) => setToAddress(e.target.value)}
        />

        {/* Amount Field */}
        <TextInput
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        {/* Send Button */}
        <PrimaryButton onClick={handleSend}>Send</PrimaryButton>
      </VStack>
    </Box>
  );
};

export default SendTokens;