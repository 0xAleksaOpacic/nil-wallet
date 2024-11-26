import { Box, Text } from "@chakra-ui/react";
import React from "react";

const PopUpFooter: React.FC = () => {
  return (
    <Box
      width="100%"
      height="30px"
      display="flex"
      boxShadow="0px -2px 6px -1px rgba(0, 0, 0, 0.08)"
      justifyContent="center"
      alignItems="center"
      position="relative"
      p={1}
    >
      <Text fontSize="xs" color="gray.500" textAlign="center">
        Made with{" "}
        <span style={{ color: "red", fontWeight: "bold" }}>
          ❤
        </span>{" "}
        by 0xAleksaOpacic
      </Text>
    </Box>
  );
};

export default PopUpFooter;
