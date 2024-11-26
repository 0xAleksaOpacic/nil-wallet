import { Box, Image } from "@chakra-ui/react";
import React from "react";

interface ClickableImageProps {
  src: string;
  alt: string;
  boxSize?: string;
  onClick: () => void;
}

const ClickableImage: React.FC<ClickableImageProps> = ({ src, alt, boxSize = "20px", onClick }) => {
  return (
    <Box
      as="button"
      onClick={onClick}
      _hover={{ transform: "scale(1.1)", cursor: "pointer" }} // Hover effect
      _active={{ transform: "scale(0.95)" }} // Active (press) effect
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Image src={src} alt={alt} boxSize={boxSize} />
    </Box>
  );
};

export default ClickableImage;
