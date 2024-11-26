import { Box } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';
import PopUpFooter from '../organisms/PopUpFooter.tsx';
import PopUpHeader from '../organisms/PopUpHeader.tsx';

const PopUpLayout = () => {
  return (
    <Box
      width="300px" // Fixed width
      height="330px" // Fixed height
      bg="white"
      boxShadow="2xl"
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
    >
      {/* Header */}
      <PopUpHeader address={"0x00019c87785897cd395cf924c927ca114551c533"}/>

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
