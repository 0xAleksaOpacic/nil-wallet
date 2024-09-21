import { Box, Button } from "@chakra-ui/react";

interface IOnboardingButtonProps {
	colorScheme?: string;
	bg?: string;
	onClick: () => void;
	children: React.ReactNode;
}

const OnboardingButton: React.FC<IOnboardingButtonProps> = ({ colorScheme = "blue", bg = "wallet.lightBlue", onClick, children }) => {
	return (
		<Box width="90%">
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

export default OnboardingButton;
