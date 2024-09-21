import { Box, Button, VStack, Text, Image, Input } from "@chakra-ui/react";
import importWalletIcon from '/icons/importWallet.svg';
import {useNavigate} from "react-router-dom";
import OnboardingStepHeader from "../../organisms/OnboardingStepHeader.tsx"; // Ensure this path is correct

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
				<Input
					placeholder="Wallet Address"
					bg="wallet.lightGray"
					width="100%"
					py={7}
					_focus={{ borderColor: "wallet.lightBlue", boxShadow: "0 0 0 1px wallet.lightBlue" }}
				/>

				{/* Private Key Input */}
				<Input
					placeholder="Private Key"
					bg="wallet.lightGray"
					width="100%"
					py={7}
					_focus={{ borderColor: "wallet.lightBlue", boxShadow: "0 0 0 1px wallet.lightBlue" }}
				/>
			</VStack>

			{/* Bottom Section: Continue Button */}
			<Box width="90%">
				<Button
					colorScheme="blue"
					bg="wallet.lightBlue"
					width="100%"
					py={7}
					onClick={() => navigate('/onboarding/set-password')}
				>
					Continue
				</Button>
			</Box>
		</VStack>
	);
};

export default ImportWallet;
