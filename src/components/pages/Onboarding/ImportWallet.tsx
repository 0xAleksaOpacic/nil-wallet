import {VStack } from "@chakra-ui/react";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {setPrivateKey, setWalletAddress} from "../../../store/onboardingSlice.ts";
import OnboardingStepHeader from "../../organisms/OnboardingStepHeader.tsx";
import OnboardingButton from "../../atoms/OnboardingButton.tsx";
import OnboardingTextInput from "../../atoms/OnboardingTextInput.tsx";
import importWalletIcon from '/icons/importWallet.svg';
import { RootState } from '../../../store';
import { useState } from 'react';
import { validatePrivateKey, validateWalletAddress, ValidationResult } from '../../../utils/onboardingValidation.ts';
import { OnboardingRoutes } from '../../../router/routes.ts';

const ImportWallet = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const onboardingState = useSelector((state: RootState) => state.onboarding);
	const [errors, setErrors] = useState({ walletAddress: '', privateKey: '' });

	const handleContinueClick = () => {
		let newErrors = { walletAddress: '', privateKey: '' };

		const walletValidation:ValidationResult = validateWalletAddress(onboardingState.walletAddress);
		if (!walletValidation.isValid) {
			newErrors.walletAddress = walletValidation.error;
		}

		const privateKeyValidation:ValidationResult = validatePrivateKey(onboardingState.privateKey);
		if (!privateKeyValidation.isValid) {
			newErrors.privateKey = privateKeyValidation.error;
		}

		setErrors(newErrors);

		if (!newErrors.walletAddress && !newErrors.privateKey) {
			navigate(`${OnboardingRoutes.BASE}/${OnboardingRoutes.SET_ENDPOINT}`);
		}
	};

	const handleWalletAddressChange = (value: string) => {
		setErrors({ ...errors, walletAddress: '' });
		dispatch(setWalletAddress(value));
	};

	const handlePrivateKeyChange = (value: string) => {
		setErrors({ ...errors, privateKey: '' });
		dispatch(setPrivateKey(value));
	};

	return (
		<VStack height={"100%"} justifyContent="space-between">
			{/* Top Section: Icon and Title/Subtitles */}
			<OnboardingStepHeader
				iconSrc={importWalletIcon}
				title="Import Wallet"
				subtitle={<span>Enter your wallet address and private key to import your existing wallet"</span>}
			/>

			{/* Middle Section: Input Fields */}
			<VStack spacing={4} align="center" width="90%" paddingY={4}>
				{/* Wallet Address Input */}
				<OnboardingTextInput
					placeholder="Wallet Address"
					onChange={(e) => handleWalletAddressChange(e.target.value)}
					error={errors.walletAddress}
				/>
				<OnboardingTextInput
					placeholder="Private Key"
					onChange={(e) => handlePrivateKeyChange(e.target.value)}
					error={errors.privateKey}
				/>
			</VStack>

			{/* Bottom Section: Continue Button */}
			<OnboardingButton onClick={handleContinueClick}>
				Continue
			</OnboardingButton>
		</VStack>
	);
};

export default ImportWallet;
