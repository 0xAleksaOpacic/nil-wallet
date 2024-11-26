import {Text , VStack, Image} from "@chakra-ui/react";
import ExtensionIcon from "../../atoms/ExtensionIcon.tsx";


const AllSet = () => {
	return (
		<VStack height={"100%"} justifyContent="space-between" align="center">
			{/* Top Section: Icon and Title/Subtitles */}
			<VStack spacing={2} align="center" paddingTop={8}>
				{/* Icon */}
				<ExtensionIcon size="150px" />

				{/* Title and Subtitle */}
				<VStack align="center">
					<Text fontSize="3xl" fontWeight="bold" textAlign="center">
						You're All Set
					</Text>
					<Text fontSize="md" color="gray.500" textAlign="center">
						Your wallet is ready to send and <br /> receive crypto on =nil;
					</Text>
				</VStack>
			</VStack>

			{/* Bottom Section: Open Extension Button */}
			<Image
				src="/images/openExtension.png"
				alt="Open Extension"
				width="100%"
			/>
		</VStack>
	);
};

export default AllSet;
