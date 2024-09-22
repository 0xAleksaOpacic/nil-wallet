import { ChakraProvider } from '@chakra-ui/react';
import theme from './theme/theme.ts';
import AppRouter from './router/AppRouter.tsx';
import { Provider } from 'react-redux';
import store from './store/index.ts';

function App() {
  return (
      <Provider store={store}>
          <ChakraProvider theme={theme}>
              <AppRouter />
          </ChakraProvider>
      </Provider>
  );
}

export default App;
