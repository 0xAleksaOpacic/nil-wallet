import { Box } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';
import PopUpFooter from '../organisms/PopUpFooter.tsx';

const PopUpLayout = () => {
  return (
    <Box
      width="300px" // Fixed width
      height="480px" // Fixed height
      bg="white"
      boxShadow="2xl"
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
    >
      {/* Main Content */}
      <Box flex="1" overflow="auto">
        <Outlet />
      </Box>

      {/* Footer */}
      <PopUpFooter />
    </Box>
  );
};

export default PopUpLayout;
