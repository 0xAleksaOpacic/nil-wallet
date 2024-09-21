import { Input } from "@chakra-ui/react";

interface IOnboardingTextInputProps {
	placeholder: string;
	isPassword?: boolean;
}

const OnboardingTextInput: React.FC<IOnboardingTextInputProps> = ({ placeholder, isPassword }) => {
	return (
		<Input
			placeholder={placeholder}
			bg="wallet.lightGray"
			width="100%"
			py={7}
			type={isPassword ? "password" : "text"} // Set type based on isPassword prop
			_focus={{ borderColor: "wallet.lightBlue", boxShadow: "0 0 0 1px wallet.lightBlue" }}
		/>
	);
};

export default OnboardingTextInput;
