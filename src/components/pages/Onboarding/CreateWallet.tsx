import { VStack, Select, FormErrorMessage, FormControl } from '@chakra-ui/react';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import {setPrivateKey, setShardId} from '../../../store/userSlice.ts';
import OnboardingStepHeader from "../../organisms/OnboardingStepHeader.tsx";
import PrimaryButton from "../../atoms/PrimaryButton.tsx";
import TextInput from "../../atoms/TextInput.tsx";
import newWalletIcon from '/icons/newWallet.svg';
import { RootState } from '../../../store';
import { validatePrivateKey, validateShardId, ValidationResult } from '../../../utils/userValidation.ts';
import { useState } from 'react';
import { OnboardingRoutes } from '../../../router/routes.ts';
import { DEFAULT_SHARDS } from '../../../config.ts';

const CreateWallet = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const userState = useSelector((state: RootState) => state.user);
	const [errors, setErrors] = useState({ shardId: "", privateKey: '' });


	const handlePrivateKeyChange = (event) => {
		setErrors({ ...errors, privateKey: '' });
		dispatch(setPrivateKey(event.target.value));
	};

	const handleShardChange = (event) => {
		setErrors({ ...errors, shardId: '' });
		dispatch(setShardId(Number(event.target.value)));
	};

	const handleContinue = () => {
		let newErrors = { shardId: "", privateKey: '' }

		const privateKeyValidation:ValidationResult = validatePrivateKey(userState.privateKey);
		if (!privateKeyValidation.isValid) {
			newErrors.privateKey = privateKeyValidation.error;
		}

		if (userState.shardId !== null) {
			const shardValidation: ValidationResult = validateShardId(userState.shardId);
			if (!shardValidation.isValid) {
				newErrors.shardId = shardValidation.error;
			}
		} else {
			newErrors.shardId = "Shard ID cannot be null.";
		}

		setErrors(newErrors);

		if(!newErrors.shardId && !newErrors.privateKey){
			navigate(`${OnboardingRoutes.BASE}/${OnboardingRoutes.SET_ENDPOINT}`)
		}
	};

	return (
		<VStack height={"100%"} justifyContent="space-between">
			{/* Top Section: Icon and Title/Subtitles */}
			<OnboardingStepHeader
				iconSrc={newWalletIcon}
				title="New Wallet"
				subtitle={<><span>Enter your private key and select a</span><br /><span>shard ID to deploy a new wallet</span></>}
			/>

			{/* Middle Section: Input Fields */}
			<VStack spacing={4} align="center" width="90%" paddingY={4}>
				{/* Private Key Input */}
				<TextInput
					placeholder="Private Key"
					onChange={handlePrivateKeyChange}
					error={errors.privateKey}
				/>

				{/* Shard ID Dropdown */}
				<FormControl isInvalid={!!errors.shardId}>
					<Select
						placeholder="Shard ID"
						bg="wallet.lightGray"
						width="100%"
						py={2}
						_focus={{ borderColor: "wallet.lightBlue", boxShadow: "0 0 0 1px wallet.lightBlue" }}
						onChange={handleShardChange}
					>
						{Array.from({ length: DEFAULT_SHARDS }, (_, i) => (
							<option key={i + 1} value={i + 1}>
								{i + 1}
							</option>
						))}
					</Select>
					<FormErrorMessage>{errors.shardId}</FormErrorMessage>
				</FormControl>
			</VStack>

			{/* Bottom Section: Continue Button */}
			<PrimaryButton onClick={handleContinue}>
				Continue
			</PrimaryButton>
		</VStack>
	);
};

export default CreateWallet;
