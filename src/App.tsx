import { ChakraProvider } from '@chakra-ui/react';
import OnboardingRouter from './router/OnboardingRouter.tsx';
import { Provider } from 'react-redux';
import theme from './theme/theme.ts';
import store from './store/index.ts';

function App() {
  return (
      <Provider store={store}>
          <ChakraProvider theme={theme}>
              <OnboardingRouter />
          </ChakraProvider>
      </Provider>
  );
}

export default App;
