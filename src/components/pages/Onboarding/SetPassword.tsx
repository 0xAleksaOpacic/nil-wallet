import { VStack} from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import OnboardingStepHeader from "../../organisms/OnboardingStepHeader.tsx";
import OnboardingButton from "../../atoms/OnboardingButton.tsx";
import OnboardingTextInput from "../../atoms/OnboardingTextInput.tsx";
import OnboardingCardLoader from "../../atoms/OnboardingCardLoader.tsx";
import lockIcon from '/icons/lock.svg';

const SetPassword = () => {
	const navigate = useNavigate();

	const [loading, setLoading] = useState(false);

	const handleStart = () => {
		setLoading(true);
		setTimeout(() => {
			navigate('/onboarding/all-set');
		}, 2000);
	};

	return (
		<VStack height={"100%"} justifyContent="space-between">
			{/* Overlay */}
			{loading && <OnboardingCardLoader />}

			{/* Top Section: Icon and Title/Subtitles */}
			<OnboardingStepHeader
				iconSrc={lockIcon}
				title="Create Password"
				subtitle={<><span>This password will be used to</span><br /><span>secure and unlock your wallet</span></>}
			/>

			{/* Middle Section: Input Fields */}
			<VStack spacing={4} align="center" width="90%" paddingY={4}>
				{/* Password Input */}
				<OnboardingTextInput placeholder="Enter Password" isPassword={true} />
				<OnboardingTextInput placeholder="Confirm Password" isPassword={true} />
			</VStack>

			{/* Bottom Section: Start Button */}
			<OnboardingButton onClick={handleStart}>
				Start
			</OnboardingButton>
		</VStack>
	);
};

export default SetPassword;
