import React, { useState } from "react";
import { Box, Image, VStack } from "@chakra-ui/react";
import BackButton from "../../atoms/BackButton";
import TextInput from "../../atoms/TextInput";
import PrimaryButton from "../../atoms/PrimaryButton.tsx";
import { PopupRoutes } from "../../../router/routes.ts";

const Network: React.FC = () => {
  const [rpcEndpoint, setRpcEndpoint] = useState("");

  const handleEndpointChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRpcEndpoint(e.target.value);
  };

  const handleSetEndpoint = () => {
    console.log("RPC Endpoint set to:", rpcEndpoint);
  };

  return (
    <Box p={4}>
      {/* Back Button */}
      <BackButton to={PopupRoutes.BASE} />

      {/* Icon */}
      <Box display="flex" justifyContent="center" mt={4} mb={6}>
        <Image src="/icons/networkBlue.svg" alt="Network" boxSize="100px" />
      </Box>

      {/* RPC Endpoint Input */}
      <VStack spacing={4} align="center" width="100%">
        <TextInput
          placeholder="RPC Endpoint"
          onChange={handleEndpointChange}
        />

        {/* Set Button */}
        <PrimaryButton onClick={handleSetEndpoint}>Set</PrimaryButton>
      </VStack>
    </Box>
  );
};

export default Network;
