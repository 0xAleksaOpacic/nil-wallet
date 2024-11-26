import { Box, Button } from "@chakra-ui/react";
import React from 'react';

interface IOnboardingButtonProps {
	colorScheme?: string;
	bg?: string;
	onClick: () => void;
	children: React.ReactNode;
}

const PrimaryButton: React.FC<IOnboardingButtonProps> = ({ colorScheme = "blue", bg = "wallet.lightBlue", onClick, children }) => {
	return (
		<Box width="100%">
			<Button
				colorScheme={colorScheme}
				bg={bg}
				width="100%"
				py={7}
				onClick={onClick}
			>
				{children}
			</Button>
		</Box>
	);
};

export default PrimaryButton;
