import { FormControl, FormErrorMessage, Input } from '@chakra-ui/react';
import React from 'react';

interface IOnboardingTextInputProps {
	placeholder: string;
	isPassword?: boolean;
	onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
	error?: string;
}

const TextInput: React.FC<IOnboardingTextInputProps> = ({ placeholder, isPassword, onChange, error }) => {
	return (
		<FormControl isInvalid={!!error}>
		<Input
			placeholder={placeholder}
			bg="wallet.lightGray"
			width="100%"
			py={7}
			type={isPassword ? "password" : "text"}
			_focus={{ borderColor: "wallet.lightBlue", boxShadow: "0 0 0 1px wallet.lightBlue" }}
			onChange={onChange}
		/>
			<FormErrorMessage>{error}</FormErrorMessage> {/* Show error message */}
		</FormControl>
	);
};

export default TextInput;
