import { Box } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';
import onboardingWallpaper from '../../assets/onboardingWallpaper.png';

const OnboardingLayout = () => {
	return (
		<Box
			width="100vw"
			height="100vh"
			backgroundImage={`url(${onboardingWallpaper})`}
			backgroundSize="cover"
			backgroundPosition="center"
			position="relative"
		>
			{/* Opacity Layer */}
			<Box
				position="absolute"
				top="0"
				left="0"
				right="0"
				bottom="0"
				bg="rgba(0, 0, 0, 0.6)" // This is the grayish overlay with 60% opacity
			/>

			{/* Centered Card */}
			<Box
				position="absolute"
				top="50%"
				left="50%"
				transform="translate(-50%, -50%)"
				bg="white"
				minWidth="450px"
				width={{ base: '90%', md: '60%', lg: '43%', xl: '25%' }}
				aspectRatio={4 / 4.2}
				p={8}
				borderRadius="35"
				boxShadow="2xl"
				sx={{
					'@media (max-width: 766px) and (min-width: 550px)': {
						width: '70%',
					},
				}}
			>
				{/* Outlet renders the current onboarding step */}
				<Outlet />
			</Box>
		</Box>
	);
};

export default OnboardingLayout;
