import { Box, Spinner } from "@chakra-ui/react";

const OnboardingCardLoader: React.FC = () => {
	return (
		<Box
			position="absolute"
			top="0"
			left="0"
			width="100%"
			height="100%"
			bg="rgba(0, 0, 0, 0.5)"
			display="flex"
			alignItems="center"
			justifyContent="center"
			zIndex={1}
			borderRadius="35"
		>
			<Spinner size="xl" color="white" />
		</Box>
	);
};

export default OnboardingCardLoader;
