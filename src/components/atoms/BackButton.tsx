import { HStack, Text, Image } from "@chakra-ui/react";
import React from "react";
import { useNavigate } from "react-router-dom";

interface BackButtonProps {
  to: string;
}

const BackButton: React.FC<BackButtonProps> = ({ to }) => {
  const navigate = useNavigate();

  return (
    <HStack
      as="button"
      onClick={() => navigate(to)}
      _hover={{ cursor: "pointer", transform: "scale(1.05)" }}
      _active={{ transform: "scale(0.95)" }}
      spacing={2}
      p={2}
    >
      <Image src="/icons/backArrow.svg" alt="Back Arrow" boxSize="20px" />
      <Text fontSize="sm" fontWeight="medium" color="gray.600">
        Back
      </Text>
    </HStack>
  );
};

export default BackButton;
