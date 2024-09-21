import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import theme from './theme/theme.ts';
import AppRouter from './router/AppRouter.tsx';

function App() {
  return (
      <ChakraProvider theme={theme}>
          <AppRouter />
      </ChakraProvider>
  );
}

export default App;
