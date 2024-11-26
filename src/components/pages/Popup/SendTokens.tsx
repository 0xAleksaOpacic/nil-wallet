import React, { useState } from "react";
import { Box, Image, VStack } from "@chakra-ui/react";
import BackButton from "../../atoms/BackButton.tsx";
import TextInput from "../../atoms/TextInput.tsx";
import PrimaryButton from "../../atoms/PrimaryButton.tsx";
import { PopupRoutes } from '../../../router/routes.ts';

const SendTokens: React.FC = () => {
  const [toAddress, setToAddress] = useState("");
  const [amount, setAmount] = useState("");

  const handleSend = () => {
    console.log("Send Tokens:", { toAddress, amount });
  };

  return (
    <Box p={4}>
      {/* Back Button */}
      <BackButton to={PopupRoutes.BASE} />

      {/* Icon */}
      <Box display="flex" justifyContent="center" mt={0} mb={3}>
        <Image src="/icons/sendMoney.svg" alt="Send Money" boxSize="73px" />
      </Box>

      {/* Input Fields */}
      <VStack spacing={4} align="center" width="100%">
        {/* To Address Field */}
        <TextInput
          placeholder="To"
          onChange={(e) => setToAddress(e.target.value)}
        />

        {/* Amount Field */}
        <TextInput
          placeholder="Amount"
          onChange={(e) => setAmount(e.target.value)}
        />

        {/* Send Button */}
        <PrimaryButton onClick={handleSend}>Send</PrimaryButton>
      </VStack>
    </Box>
  );
};

export default SendTokens;
