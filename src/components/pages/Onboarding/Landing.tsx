import { Box, VStack, Text, Image } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import OnboardingButton from "../../atoms/OnboardingButton.tsx";
import iceShardsIcon from '/icons/iceShards.svg';
import ExtensionIcon from "../../atoms/ExtensionIcon.tsx";

const Landing = () => {
	const navigate = useNavigate();

	return (
		<VStack height={"100%"} justifyContent="space-between" align="center">
			{/* Top Section: Icon */}
			<ExtensionIcon size="200px" />

			{/* Middle Section: Titles */}
			<Text fontSize="4xl" fontWeight="bold" textAlign="center">
				<Text as="span" color="wallet.black">=nil;</Text>{' '}
				<Text as="span" color="wallet.lightBlue">Extension</Text>
			</Text>

			{/* Bottom Section: Buttons */}
			<VStack spacing={4} width={"100%"}>
				<OnboardingButton onClick={() => navigate('create-wallet')}>
					Create a wallet
				</OnboardingButton>

				<OnboardingButton colorScheme="gray" bg="wallet.lightGray" onClick={() => navigate('import-wallet')}>
					I already have a wallet
				</OnboardingButton>
			</VStack>
		</VStack>
	);
};

export default Landing;
