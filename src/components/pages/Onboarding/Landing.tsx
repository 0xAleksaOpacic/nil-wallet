import {Box, Button, VStack, Text, Image} from "@chakra-ui/react";
import iceShardsIcon from '/icons/iceShards.svg';

const Landing = () => {
	return (
		<div>
			{/* Title */}
			<Text fontSize="4xl" fontWeight="bold" textAlign="center" mb={4}>
				<Text as="span" color="wallet.black">=nil;</Text>{' '}
				<Text as="span" color="wallet.lightBlue">Extension</Text>
			</Text>

			{/* Icon */}
			<Box display="flex" justifyContent="center" mb={8}>
				<Image src={iceShardsIcon} alt="Ice Shards Icon" boxSize="70%" />
			</Box>

			{/* Buttons */}
			<VStack spacing={4}>
				<Button
					colorScheme="blue"
					bg="wallet.lightBlue"
					width="90%"
					py={7}
					onClick={()=>{}}
				>
					Create a wallet
				</Button>

				<Button
					colorScheme="gray"
					bg="wallet.lightGray"
					width="90%"
					py={7}
					onClick={()=>{}}
				>
					I already have a wallet
				</Button>
			</VStack>
		</div>
	);
};

export default Landing;
