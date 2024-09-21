import { Box, Button, VStack, Text, Image, Input, Select } from "@chakra-ui/react";
import newWalletIcon from '/icons/newWallet.svg';
import { useNavigate } from "react-router-dom";
import OnboardingStepHeader from "../../organisms/OnboardingStepHeader.tsx";
import OnboardingButton from "../../atoms/OnboardingButton.tsx";

const CreateWallet = () => {
	const navigate = useNavigate();

	return (
		<VStack height={"100%"} justifyContent="space-between">
			{/* Top Section: Icon and Title/Subtitles */}
			<OnboardingStepHeader
				iconSrc={newWalletIcon}
				title="New Wallet"
				subtitle={<><span>Enter your private key and select a</span><br /><span>shard ID to deploy a new wallet</span></>}
			/>

			{/* Middle Section: Input Fields */}
			<VStack spacing={4} align="center" width="90%" paddingY={4}>
				{/* Private Key Input */}
				<Input
					placeholder="Private Key"
					bg="wallet.lightGray"
					width="100%"
					py={7}
					_focus={{ borderColor: "wallet.lightBlue", boxShadow: "0 0 0 1px wallet.lightBlue" }}
				/>

				{/* Shard ID Dropdown */}
				<Select
					placeholder="Shard ID"
					bg="wallet.lightGray"
					width="100%"
					py={2}
					_focus={{ borderColor: "wallet.lightBlue", boxShadow: "0 0 0 1px wallet.lightBlue" }}
				>
					<option value="1">1</option>
					<option value="2">2</option>
					<option value="3">3</option>
					<option value="4">4</option>
					<option value="5">5</option>
				</Select>
			</VStack>

			<OnboardingButton onClick={() => navigate('/onboarding/set-password')}>
				Continue
			</OnboardingButton>
		</VStack>
	);
};

export default CreateWallet;
