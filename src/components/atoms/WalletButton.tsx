import React from 'react';
import { Button, Image, HStack, Text } from '@chakra-ui/react';

interface WalletButtonProps {
  text: string;
  color: string;
  iconSrc: string;
  onClick?: () => void; // Optional click handler
}

const WalletButton: React.FC<WalletButtonProps> = ({ text, color, iconSrc, onClick }) => {
  return (
    <Button
      bg={color}
      color={'white'}
      _hover={{ bg: color === 'wallet.darkGray' ? 'wallet.darkGrayHover' : 'blue.400' }}
      borderRadius="20px"
      px={4}
      py={2}
      onClick={onClick}
      display="flex"
      alignItems="center"
      justifyContent="center"
      flex="1"
      minWidth="20%"
    >
      <HStack spacing={2}>
        <Image src={iconSrc} alt={`${text} Icon`} boxSize="16px" />
        <Text fontSize="sm" fontWeight="medium">{text}</Text>
      </HStack>
    </Button>
  );
};

export default WalletButton;
