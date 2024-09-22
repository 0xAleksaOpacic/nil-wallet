import { Box, Image } from "@chakra-ui/react";
import React from 'react';

interface IExtensionIconProps {
	size: string;
}

const ExtensionIcon: React.FC<IExtensionIconProps> = ({ size }) => {
	return (
		<Box display="flex" justifyContent="center">
			<Image src="/icons/iceShards.svg" alt="Ice Shards Icon" boxSize={size} />
		</Box>
	);
};

export default ExtensionIcon;
