import { VStack } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setRpcEndpoint } from "../../../store/onboardingSlice.ts";
import OnboardingStepHeader from "../../organisms/OnboardingStepHeader";
import PrimaryButton from "../../atoms/PrimaryButton.tsx";
import TextInput from "../../atoms/TextInput.tsx";
import OnboardingCardLoader from "../../atoms/OnboardingCardLoader.tsx"; // Import the loader component
import rpcIcon from "/icons/rpcEndpoint.svg";
import { RootState } from "../../../store";
import { useState } from "react";
import { validateRpcEndpoint, ValidationResult } from "../../../utils/onboardingValidation.ts";
import { OnboardingRoutes } from "../../../router/routes.ts";
import { setupBlockchainResources } from '../../../services/config.ts';

const SetRpcEndpoint = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const onboardingState = useSelector((state: RootState) => state.onboarding);
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false); // Add loading state

	const handleEndpointChange = (event) => {
		setError("");
		dispatch(setRpcEndpoint(event.target.value));
	};

	const handleContinue = async () => {
		const rpcValidation: ValidationResult = validateRpcEndpoint(onboardingState.rpcEndpoint);
		if (!rpcValidation.isValid) {
			setError(rpcValidation.error);
			return;
		}

		setLoading(true); // Start the loading spinner
		try {
			// Initialize blockchain resources
			await setupBlockchainResources(dispatch, onboardingState);
			console.log("State initialized successfully");
			navigate(`${OnboardingRoutes.BASE}/${OnboardingRoutes.SET_PASSWORD}`);
		} catch (err) {
			console.error("Failed to initialize blockchain resources:", err);
			setError("Failed to initialize blockchain resources. Please check your inputs.");
		} finally {
			setLoading(false); // Stop the loading spinner
		}
	};

	return (
		<VStack height={"100%"} justifyContent="space-between">
			{/* Overlay */}
			{loading && <OnboardingCardLoader />} {/* Add loader */}

			{/* Top Section: Icon and Title/Subtitles */}
			<OnboardingStepHeader
				iconSrc={rpcIcon}
				title="Set RPC Endpoint"
				subtitle={<span>Enter the RPC endpoint for your wallet connection.</span>}
			/>

			{/* Middle Section: Input Fields */}
			<VStack spacing={4} align="center" width="90%" paddingY={4}>
				{/* RPC Endpoint Input */}
				<TextInput
					placeholder="RPC Endpoint"
					onChange={handleEndpointChange}
					error={error}
				/>
			</VStack>

			{/* Bottom Section: Continue Button */}
			<PrimaryButton onClick={handleContinue}>
				Continue
			</PrimaryButton>
		</VStack>
	);
};

export default SetRpcEndpoint;
