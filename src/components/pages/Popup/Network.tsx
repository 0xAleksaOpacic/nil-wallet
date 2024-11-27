import React, { useState } from "react";
import { Box, Image, VStack } from "@chakra-ui/react";
import BackButton from "../../atoms/BackButton";
import TextInput from "../../atoms/TextInput";
import PrimaryButton from "../../atoms/PrimaryButton.tsx";
import { PopupRoutes } from "../../../router/routes.ts";
import { validateRpcEndpoint, ValidationResult } from "../../../utils/userValidation.ts";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store";
import { setRpcEndpoint } from "../../../store/userSlice.ts";
import { setupBlockchainResources } from "../../../services/config.ts";

const Network: React.FC = () => {
  const dispatch = useDispatch();
  const userState = useSelector((state: RootState) => state.user);
  const [rpcEndpoint, setRpcEndpointState] = useState(userState.rpcEndpoint || "")
  const [error, setError] = useState<string>("");

  const handleEndpointChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(""); // Clear any previous error
    setRpcEndpointState(e.target.value);
  };

  const handleSetEndpoint = async () => {
    // Validate the input
    const validation: ValidationResult = validateRpcEndpoint(rpcEndpoint);
    if (!validation.isValid) {
      setError(validation.error);
      return;
    }

    try {
      // Update RPC Endpoint in Redux
      dispatch(setRpcEndpoint(rpcEndpoint));

      // Reinitialize blockchain resources
      await setupBlockchainResources(dispatch, { ...userState, rpcEndpoint });
      console.log("RPC Endpoint set and blockchain resources reinitialized:", rpcEndpoint);
    } catch (err) {
      console.error("Failed to set RPC Endpoint:", err);
      setError("Failed to update RPC Endpoint. Please check your input");
    }
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
          value={rpcEndpoint}
          onChange={handleEndpointChange}
          error={error}
        />

        {/* Set Button */}
        <PrimaryButton onClick={handleSetEndpoint}>Set</PrimaryButton>
      </VStack>
    </Box>
  );
};

export default Network;
