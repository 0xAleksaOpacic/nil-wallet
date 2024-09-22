import { VStack } from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { setPassword, setConfirmPassword } from '../../../store/onboardingSlice.ts';
import OnboardingStepHeader from "../../organisms/OnboardingStepHeader.tsx";
import OnboardingButton from "../../atoms/OnboardingButton.tsx";
import OnboardingTextInput from "../../atoms/OnboardingTextInput.tsx";
import OnboardingCardLoader from "../../atoms/OnboardingCardLoader.tsx";
import lockIcon from '/icons/lock.svg';
import { RootState } from '../../../store';
import { validatePasswordsMatch, ValidationResult } from '../../../utils/onboardingValidation.ts';
import { OnboardingRoutes } from '../../../router/routes.ts';

const SetPassword = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const onboardingState = useSelector((state: RootState) => state.onboarding);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState('');

	const handlePasswordChange = (event) => {
		setError("");
		dispatch(setPassword(event.target.value));
	};

	const handleConfirmPasswordChange = (event) => {
		dispatch(setConfirmPassword(event.target.value));
	};

	const handleStart = () => {
		const passwordValidation:ValidationResult = validatePasswordsMatch(onboardingState.password, onboardingState.confirmPassword);
		if (!passwordValidation.isValid) {
			setError(passwordValidation.error);
			return;
		}

		setLoading(true);
		setTimeout(() => {
			console.log(onboardingState);
			navigate(`${OnboardingRoutes.BASE}/${OnboardingRoutes.ALL_SET}`)
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
				<OnboardingTextInput
					placeholder="Enter Password"
					isPassword={true}
					onChange={handlePasswordChange}
					error={error}
				/>
				{/* Confirm Password Input */}
				<OnboardingTextInput
					placeholder="Confirm Password"
					isPassword={true}
					onChange={handleConfirmPasswordChange}
					error={error}
				/>
			</VStack>

			{/* Bottom Section: Start Button */}
			<OnboardingButton onClick={handleStart}>
				Start
			</OnboardingButton>
		</VStack>
	);
};

export default SetPassword;
