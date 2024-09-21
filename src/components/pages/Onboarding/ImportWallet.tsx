import { Box, Button, VStack, Text, Image, Input } from "@chakra-ui/react";
import importWalletIcon from '/icons/importWallet.svg';
import {useNavigate} from "react-router-dom"; // Ensure this path is correct

const ImportWallet = () => {
	const navigate = useNavigate();

	return (
		<VStack height={"100%"} justifyContent="space-between">
			{/* Top Section: Icon and Title/Subtitles */}
			<VStack spacing={2} align="center" paddingTop={8}>
				{/* Icon */}
				<Box display="flex" justifyContent="center" p={0} m={0}>
					<Image src={importWalletIcon} alt="Import Wallet Icon" boxSize="70px" p={0} m={0} />
				</Box>

				{/* Title and Subtitle */}
				<VStack align="center">
					<Text fontSize="2xl" fontWeight="bold" textAlign="center">
						Import Wallet
					</Text>
					<Text fontSize="md" color="gray.500" textAlign="center">
						Enter your wallet address and private key <br /> to import your existing wallet
					</Text>
				</VStack>
			</VStack>

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
