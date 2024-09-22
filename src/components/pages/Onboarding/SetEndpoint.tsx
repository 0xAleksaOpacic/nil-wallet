import { VStack } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import {useDispatch, useSelector} from 'react-redux';
import {setRpcEndpoint} from "../../../store/onboardingSlice.ts";
import OnboardingStepHeader from "../../organisms/OnboardingStepHeader";
import OnboardingButton from "../../atoms/OnboardingButton";
import OnboardingTextInput from "../../atoms/OnboardingTextInput";
import rpcIcon from '/icons/rpcEndpoint.svg';
import { RootState } from '../../../store';
import { useState } from 'react';
import { validateRpcEndpoint, ValidationResult } from '../../../utils/onboardingValidation.ts';
import { OnboardingRoutes } from '../../../router/routes.ts';

const SetRpcEndpoint = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const onboardingState = useSelector((state: RootState) => state.onboarding);
	const [error, setError] = useState('');

	const handleEndpointChange = (event) => {
		setError("");
		dispatch(setRpcEndpoint(event.target.value));
	};
	const handleContinue = () => {
		const rpcValidation:ValidationResult = validateRpcEndpoint(onboardingState.rpcEndpoint);
		if (!rpcValidation.isValid) {
			setError(rpcValidation.error);
			return;
		}

		navigate(`${OnboardingRoutes.BASE}/${OnboardingRoutes.SET_PASSWORD}`)
	};

	return (
		<VStack height={"100%"} justifyContent="space-between">
			{/* Top Section: Icon and Title/Subtitles */}
			<OnboardingStepHeader
				iconSrc={rpcIcon}
				title="Set RPC Endpoint"
				subtitle={<span>Enter the RPC endpoint for your wallet connection.</span>}
			/>

			{/* Middle Section: Input Fields */}
			<VStack spacing={4} align="center" width="90%" paddingY={4}>
				{/* RPC Endpoint Input */}
				<OnboardingTextInput
					placeholder="RPC Endpoint"
					onChange={handleEndpointChange}
					error={error}
				/>
			</VStack>

			{/* Bottom Section: Continue Button */}
			<OnboardingButton onClick={handleContinue}>
				Continue
			</OnboardingButton>
		</VStack>
	);
};

export default SetRpcEndpoint;
