import { VStack } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import OnboardingStepHeader from "../../organisms/OnboardingStepHeader";
import OnboardingButton from "../../atoms/OnboardingButton";
import OnboardingTextInput from "../../atoms/OnboardingTextInput";
import rpcIcon from '/icons/rpcEndpoint.svg'; // Adjust the path as necessary

const SetRpcEndpoint = () => {
	const navigate = useNavigate();

	return (
		<VStack height={"100%"} justifyContent="space-between">
			{/* Top Section: Icon and Title/Subtitles */}
			<OnboardingStepHeader
				iconSrc={rpcIcon}
				title="Set RPC Endpoint"
				subtitle={<span>Enter the RPC endpoint for your wallet connection.</span>}
			/>

			{/* Middle Section: Input Fields */}
			<VStack spacing={4} align="center" width="90%" paddingY={4}>
				{/* RPC Endpoint Input */}
				<OnboardingTextInput placeholder="RPC Endpoint" />
			</VStack>

			{/* Bottom Section: Continue Button */}
			<OnboardingButton onClick={() => navigate('/onboarding/set-password')}>
				Continue
			</OnboardingButton>
		</VStack>
	);
};

export default SetRpcEndpoint;
