import { Box, Button, VStack, Text, Image } from "@chakra-ui/react";
import iceShardsIcon from '/icons/iceShards.svg';
import { useNavigate } from "react-router-dom";

const Landing = () => {
	const navigate = useNavigate();

	return (
		<VStack height={"100%"} justifyContent="space-between" align="center">
			{/* Title */}
			<Text fontSize="4xl" fontWeight="bold" textAlign="center">
				<Text as="span" color="wallet.black">=nil;</Text>{' '}
				<Text as="span" color="wallet.lightBlue">Extension</Text>
			</Text>

			{/* Icon */}
			<Box display="flex" justifyContent="center">
				<Image src={iceShardsIcon} alt="Ice Shards Icon" boxSize="200px" />
			</Box>

			{/* Buttons */}
			<VStack spacing={4} width="90%">
				<Button
					colorScheme="blue"
					bg="wallet.lightBlue"
					width="100%"
					py={7}
					onClick={() => navigate('create-wallet')}
				>
					Create a wallet
				</Button>

				<Button
					colorScheme="gray"
					bg="wallet.lightGray"
					width="100%"
					py={7}
					onClick={() => navigate('import-wallet')}
				>
					I already have a wallet
				</Button>
			</VStack>
		</VStack>
	);
};

export default Landing;
