import React, { useState } from "react";
import { Box, Image, VStack } from "@chakra-ui/react";
import BackButton from "../../atoms/BackButton";
import TextInput from "../../atoms/TextInput";
import PrimaryButton from "../../atoms/PrimaryButton.tsx";
import { PopupRoutes } from '../../../router/routes.ts';

const TopUp: React.FC = () => {
  const [amount, setAmount] = useState("");

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(e.target.value);
  };

  const handleTopUp = () => {
    console.log("Top up amount:", amount);
  };

  return (
    <Box p={4}>
      {/* Back Button */}
      <BackButton to={PopupRoutes.BASE} />

      {/* Icon */}
      <Box display="flex" justifyContent="center" mt={4} mb={6}>
        <Image src="/icons/takeMoney.svg" alt="Take Money" boxSize="100px" />
      </Box>

      {/* Amount Input */}
      <VStack spacing={4} align="center" width="100%">
        <TextInput
          placeholder="Enter Amount"
          onChange={handleAmountChange}
        />

        {/* Top Up Button */}
        <PrimaryButton onClick={handleTopUp}>Top Up</PrimaryButton>
      </VStack>
    </Box>
  );
};

export default TopUp;
