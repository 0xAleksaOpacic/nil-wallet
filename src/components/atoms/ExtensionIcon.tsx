import { Box, Image } from "@chakra-ui/react";

interface IExtensionIconProps {
	size: string; // You can define a more specific type if needed
}

const ExtensionIcon: React.FC<IExtensionIconProps> = ({ size }) => {
	return (
		<Box display="flex" justifyContent="center">
			<Image src="/icons/iceShards.svg" alt="Ice Shards Icon" boxSize={size} />
		</Box>
	);
};

export default ExtensionIcon;
