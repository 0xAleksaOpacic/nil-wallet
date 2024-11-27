import React, { useState } from "react";
import { Box, Image, VStack, Text } from "@chakra-ui/react";
import BackButton from "../../atoms/BackButton";
import TextInput from "../../atoms/TextInput";
import PrimaryButton from "../../atoms/PrimaryButton.tsx";
import OnboardingCardLoader from "../../atoms/OnboardingCardLoader.tsx";
import { PopupRoutes } from '../../../router/routes.ts';
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store";
import { topUp, getBalance } from "../../../services/wallet.ts";
import { useNavigate } from "react-router-dom";

const TopUp: React.FC = () => {
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Get required data from the blockchain store
  const { client, wallet, faucet } = useSelector((state: RootState) => state.blockchain);

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(e.target.value);
    setError("");
  };

  const handleTopUp = async () => {
    // Validate amount input
    if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) {
      setError("Please enter a valid amount");
      return;
    }

    if (!client || !wallet || !faucet) {
      setError("Blockchain resources are not initialized.");
      return;
    }

    setLoading(true);
    try {
      // Perform top-up
      await topUp(client, faucet, wallet.address, Number(amount));

      // Fetch the updated balance
      await getBalance(client, wallet.address, dispatch);

      // Navigate back to the main page
      navigate(PopupRoutes.BASE);
    } catch (err) {
      console.error("Top-up failed:", err);
      setError("Failed to top up. Please try again.");
    } finally {
      setLoading(false);
      setAmount("")
    }
  };

  return (
    <Box p={4} position="relative">
      {/* Back Button */}
      <BackButton to={PopupRoutes.BASE} />

      {/* Loader */}
      {loading && <OnboardingCardLoader borderRadius="0"/>} {/* Show loader when processing */}

      {/* Icon */}
      <Box display="flex" justifyContent="center" mt={4} mb={6}>
        <Image src="/icons/takeMoney.svg" alt="Take Money" boxSize="100px" />
      </Box>

      {/* Amount Input */}
      <VStack spacing={4} align="center" width="100%">
        <TextInput
          placeholder="Enter Amount"
          value={amount}
          onChange={handleAmountChange}
          error={error} // Display error below the input
        />

        {/* Error Message */}
        {error && (
          <Text fontSize="sm" color="red.500" textAlign="center">
            {error}
          </Text>
        )}

        {/* Top Up Button */}
        <PrimaryButton onClick={handleTopUp}>Top Up</PrimaryButton>
      </VStack>
    </Box>
  );
};

export default TopUp;
