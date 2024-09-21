import { Box, Button, VStack, Text, Image, Input } from "@chakra-ui/react";
import lockIcon from '/icons/lock.svg'; // Ensure this path is correct

const SetPassword = () => {
	return (
		<VStack height={"100%"} justifyContent="space-between">
			{/* Top Section: Icon and Title/Subtitles */}
			<VStack spacing={2} align="center" paddingTop={8}>
				{/* Icon */}
				<Box display="flex" justifyContent="center" p={0} m={0}>
					<Image src={lockIcon} alt="Lock Icon" boxSize="70px" p={0} m={0} />
				</Box>

				{/* Title and Subtitle */}
				<VStack align="center">
					<Text fontSize="2xl" fontWeight="bold" textAlign="center">
						Create Password
					</Text>
					<Text fontSize="md" color="gray.500" textAlign="center">
						This password will be used to <br /> secure and unlock your wallet
					</Text>
				</VStack>
			</VStack>

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
					onClick={() => { /* Handle password set */ }}
				>
					Start
				</Button>
			</Box>
		</VStack>
	);
};

export default SetPassword;
