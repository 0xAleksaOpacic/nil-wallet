import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import store from './store';
import { ChakraProvider } from '@chakra-ui/react';
import theme from './theme/theme.ts';
import OnboardingRouter from './router/OnboardingRouter.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <Provider store={store}>
        <ChakraProvider theme={theme}>
          <OnboardingRouter />
        </ChakraProvider>
      </Provider>
    </React.StrictMode>
);