import { Box, Spinner } from "@chakra-ui/react";
import React from "react";

interface OnboardingCardLoaderProps {
	borderRadius?: string; // Optional borderRadius prop
}

const OnboardingCardLoader: React.FC<OnboardingCardLoaderProps> = ({ borderRadius = "0" }) => {
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
			borderRadius={borderRadius}
		>
			<Spinner size="xl" color="white" />
		</Box>
	);
};

export default OnboardingCardLoader;
