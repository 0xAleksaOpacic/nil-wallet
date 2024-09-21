import {VStack } from "@chakra-ui/react";
import {useNavigate} from "react-router-dom";
import OnboardingStepHeader from "../../organisms/OnboardingStepHeader.tsx";
import OnboardingButton from "../../atoms/OnboardingButton.tsx";
import OnboardingTextInput from "../../atoms/OnboardingTextInput.tsx";
import importWalletIcon from '/icons/importWallet.svg';

const ImportWallet = () => {
	const navigate = useNavigate();

	return (
		<VStack height={"100%"} justifyContent="space-between">
			{/* Top Section: Icon and Title/Subtitles */}
			<OnboardingStepHeader
				iconSrc={importWalletIcon}
				title="Import Wallet"
				subtitle={<span>Enter your wallet address and private key to import your existing wallet"</span>}
			/>

			{/* Middle Section: Input Fields */}
			<VStack spacing={4} align="center" width="90%" paddingY={4}>
				{/* Wallet Address Input */}
				<OnboardingTextInput placeholder="Wallet Address" />
				<OnboardingTextInput placeholder="Private Key" />
			</VStack>

			{/* Bottom Section: Continue Button */}
			<OnboardingButton onClick={() => navigate('/onboarding/set-endpoint')}>
				Continue
			</OnboardingButton>
		</VStack>
	);
};

export default ImportWallet;
