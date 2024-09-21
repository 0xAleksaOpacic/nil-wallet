import { Box, Button, VStack, Text, Image, Input, Spinner } from "@chakra-ui/react";
import lockIcon from '/icons/lock.svg'; // Ensure this path is correct
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import OnboardingStepHeader from "../../organisms/OnboardingStepHeader.tsx";

const SetPassword = () => {
	const navigate = useNavigate();

	const [loading, setLoading] = useState(false);

	const handleStart = () => {
		setLoading(true);
		setTimeout(() => {
			navigate('/onboarding/all-set');
		}, 2000);
	};

	return (
		<VStack height={"100%"} justifyContent="space-between">
			{/* Overlay */}
			{loading && (
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
			)}

			{/* Top Section: Icon and Title/Subtitles */}
			<OnboardingStepHeader
				iconSrc={lockIcon}
				title="Create Password"
				subtitle={<><span>This password will be used to</span><br /><span>secure and unlock your wallet</span></>}
			/>

			{/* Middle Section: Input Fields */}
			<VStack spacing={4} align="center" width="90%" paddingY={4}>
				{/* Password Input */}
				<Input
					placeholder="Enter Password"
					bg="wallet.lightGray"
					width="100%"
					py={7}
					type="password"
					_focus={{ borderColor: "wallet.lightBlue", boxShadow: "0 0 0 1px wallet.lightBlue" }}
				/>

				{/* Confirm Password Input */}
				<Input
					placeholder="Confirm Password"
					bg="wallet.lightGray"
					width="100%"
					py={7}
					type="password"
					_focus={{ borderColor: "wallet.lightBlue", boxShadow: "0 0 0 1px wallet.lightBlue" }}
				/>
			</VStack>

			{/* Bottom Section: Start Button */}
			<Box width="90%">
				<Button
					colorScheme="blue"
					bg="wallet.lightBlue"
					width="100%"
					py={7}
					onClick={handleStart}
				>
					Start
				</Button>
			</Box>
		</VStack>
	);
};

export default SetPassword;
