import { Box } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';
import PopUpFooter from '../organisms/PopUpFooter.tsx';
import PopUpHeader from '../organisms/PopUpHeader.tsx';

const PopUpLayout = () => {
  return (
    <Box
      width="350px" // Fixed width
      height="450px" // Fixed height
      bg="white"
      boxShadow="2xl"
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
    >
      {/* Header */}
      <PopUpHeader/>

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
