import { Box } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';

const PopUpLayout = () => {
  return (
    <Box
      width="300px" // Fixed width
      height="480px" // Fixed height
      bg="white"
      boxShadow="2xl"
      p={4}
      display="flex"
      flexDirection="column"
    >
      <Outlet />
    </Box>
  );
};

export default PopUpLayout;
