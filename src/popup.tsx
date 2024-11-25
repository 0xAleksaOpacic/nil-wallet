import React from 'react';
import ReactDOM from 'react-dom/client';
import theme from './theme/theme.ts';
import { ChakraProvider } from '@chakra-ui/react';
import PopUpRouter from './router/PopupRouter.tsx';

// Render the popup
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <PopUpRouter/>
    </ChakraProvider>
  </React.StrictMode>
);