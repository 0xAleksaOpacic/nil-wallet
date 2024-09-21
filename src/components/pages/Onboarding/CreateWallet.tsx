import { Box, Button, VStack, Text, Image, Input, Select } from "@chakra-ui/react";
import newWalletIcon from '/icons/newWallet.svg';
import { useNavigate } from "react-router-dom";

const CreateWallet = () => {
	const navigate = useNavigate();

	return (
		<VStack height={"100%"} justifyContent="space-between">
			{/* Top Section: Icon and Title/Subtitles */}
			<VStack spacing={2} align="center" paddingTop={8}>
				{/* Icon */}
				<Box display="flex" justifyContent="center" p={0} m={0}>
					<Image src={newWalletIcon} alt="New Wallet Icon" boxSize="70px" p={0} m={0} />
				</Box>

				{/* Title and Subtitle */}
				<VStack align="center">
					<Text fontSize="2xl" fontWeight="bold" textAlign="center">
						New Wallet
					</Text>
					<Text fontSize="md" color="gray.500" textAlign="center">
						Enter your private key and select a <br /> shard ID to deploy a new wallet
					</Text>
				</VStack>
			</VStack>

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

			<VStack spacing={4} width="90%">
			{/* Bottom Section: Continue Button */}
				<Button
					colorScheme="blue"
					bg="wallet.lightBlue"
					width="100%"
					py={7}
					onClick={() => navigate('/onboarding/set-password')}
				>
					Continue
				</Button>
			</VStack>
		</VStack>
	);
};

export default CreateWallet;
