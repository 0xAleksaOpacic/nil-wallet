import {Text , VStack} from "@chakra-ui/react";
import PrimaryButton from "../../atoms/PrimaryButton.tsx";
import ExtensionIcon from "../../atoms/ExtensionIcon.tsx";
import { setOnboardingComplete } from '../../../utils/util.ts';
import { useCallback } from 'react';


const AllSet = () => {
	const handleOpenPopup = useCallback(async () => {
		try {
			await setOnboardingComplete();
		} catch (error) {
			console.error("Failed to open popup:", error);
		}
	}, []);
	return (
		<VStack height={"100%"} justifyContent="space-between" align="center">
			{/* Top Section: Icon and Title/Subtitles */}
			<VStack spacing={2} align="center" paddingTop={8}>
				{/* Icon */}
				<ExtensionIcon size="150px" />

				{/* Title and Subtitle */}
				<VStack align="center">
					<Text fontSize="3xl" fontWeight="bold" textAlign="center">
						You're All Set
					</Text>
					<Text fontSize="md" color="gray.500" textAlign="center">
						Your wallet is ready to send and <br /> receive crypto on =nil;
					</Text>
				</VStack>
			</VStack>

			{/* Bottom Section: Open Extension Button */}
			<PrimaryButton onClick={handleOpenPopup}>
				Open Wallet
			</PrimaryButton>
		</VStack>
	);
};

export default AllSet;
