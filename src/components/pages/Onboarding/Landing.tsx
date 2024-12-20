import { VStack, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import PrimaryButton from "../../atoms/PrimaryButton.tsx";
import ExtensionIcon from "../../atoms/ExtensionIcon.tsx";
import { OnboardingRoutes } from '../../../router/routes.ts';

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
				<PrimaryButton onClick={() => navigate(`${OnboardingRoutes.BASE}/${OnboardingRoutes.CREATE_WALLET}`)}>
					Create a wallet
				</PrimaryButton>

				<PrimaryButton colorScheme="gray" bg="wallet.lightGray" onClick={() => navigate(`${OnboardingRoutes.BASE}/${OnboardingRoutes.IMPORT_WALLET}`)}>
					I already have a wallet
				</PrimaryButton>
			</VStack>
		</VStack>
	);
};

export default Landing;
