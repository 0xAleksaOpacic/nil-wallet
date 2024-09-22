import { Box, Text, Image, VStack } from "@chakra-ui/react";

interface IOnboardingStepHeaderProps {
	iconSrc: string;
	title: string;
	subtitle: React.ReactNode;
}

const OnboardingStepHeader: React.FC<IOnboardingStepHeaderProps> = ({ iconSrc, title, subtitle }) => {
	return (
		<VStack spacing={2} align="center" paddingTop={0}>
			{/* Icon */}
			<Box display="flex" justifyContent="center" p={0} m={0}>
				<Image src={iconSrc} alt={`${title} Icon`} boxSize="70px" p={0} m={0} />
			</Box>

			{/* Title and Subtitle */}
			<VStack align="center">
				<Text fontSize="2xl" fontWeight="bold" textAlign="center">
					{title}
				</Text>
				<Text fontSize="md" color="gray.500" textAlign="center">
					{subtitle}
				</Text>
			</VStack>
		</VStack>
	);
};

export default OnboardingStepHeader;
