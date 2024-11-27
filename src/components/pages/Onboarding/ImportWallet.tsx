import {VStack } from "@chakra-ui/react";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import { setPrivateKey, setShardId, setWalletAddress } from '../../../store/userSlice.ts';
import OnboardingStepHeader from "../../organisms/OnboardingStepHeader.tsx";
import PrimaryButton from "../../atoms/PrimaryButton.tsx";
import TextInput from "../../atoms/TextInput.tsx";
import importWalletIcon from '/icons/importWallet.svg';
import { RootState } from '../../../store';
import { useState } from 'react';
import {
	extractShardIdFromAddress,
	validatePrivateKey,
	validateWalletAddress,
	ValidationResult
} from '../../../utils/userValidation.ts';
import { OnboardingRoutes } from '../../../router/routes.ts';

const ImportWallet = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const userState = useSelector((state: RootState) => state.user);
	const [errors, setErrors] = useState({ walletAddress: '', privateKey: '' });

	const handleContinueClick = () => {
		let newErrors = { walletAddress: '', privateKey: '' };

		const walletValidation:ValidationResult = validateWalletAddress(userState.walletAddress);
		if (!walletValidation.isValid) {
			newErrors.walletAddress = walletValidation.error;
		}else{
			// Extract Shard ID from Wallet Address
			const shardId = extractShardIdFromAddress(userState.walletAddress);

			// Handle Invalid Shard ID
			if (typeof shardId === "string") {
				newErrors.walletAddress = shardId; // Add the error message from extractShardIdFromAddress
			} else {
				// Dispatch Shard ID to State
				dispatch(setShardId(shardId));
			}
		}

		const privateKeyValidation:ValidationResult = validatePrivateKey(userState.privateKey);
		if (!privateKeyValidation.isValid) {
			newErrors.privateKey = privateKeyValidation.error;
		}

		setErrors(newErrors);

		console.log("State: ", userState)

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
				<TextInput
					placeholder="Wallet Address"
					onChange={(e) => handleWalletAddressChange(e.target.value)}
					error={errors.walletAddress}
				/>
				<TextInput
					placeholder="Private Key"
					onChange={(e) => handlePrivateKeyChange(e.target.value)}
					error={errors.privateKey}
				/>
			</VStack>

			{/* Bottom Section: Continue Button */}
			<PrimaryButton onClick={handleContinueClick}>
				Continue
			</PrimaryButton>
		</VStack>
	);
};

export default ImportWallet;
