import { Box, Button, VStack, Text, Image } from "@chakra-ui/react";
import iceShardsIcon from '/icons/iceShards.svg';
import OnboardingButton from "../../atoms/OnboardingButton.tsx"; // Ensure this path is correct

const AllSet = () => {
	return (
		<VStack height={"100%"} justifyContent="space-between" align="center">
			{/* Top Section: Icon and Title/Subtitles */}
			<VStack spacing={2} align="center" paddingTop={8}>
				{/* Icon */}
				<Box display="flex" justifyContent="center" p={0} m={0}>
					<Image src={iceShardsIcon} alt="Ice Shards Icon" boxSize="150px" p={0} m={0} /> {/* Increased size */}
				</Box>

				{/* Title and Subtitle */}
				<VStack align="center">
					<Text fontSize="3xl" fontWeight="bold" textAlign="center"> {/* Increased size */}
						You're All Set
					</Text>
					<Text fontSize="md" color="gray.500" textAlign="center">
						Your wallet is ready to send and <br /> receive crypto on =nil;
					</Text>
				</VStack>
			</VStack>

			{/* Bottom Section: Open Extension Button */}
			<OnboardingButton onClick={() => { /* Handle open extension */ }}>
				Open Extension
			</OnboardingButton>
		</VStack>
	);
};

export default AllSet;
