import React from 'react';
import { createRoot } from 'react-dom/client';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { Provider } from 'react-redux';
import store from './stores';
import App from './App';

const config = {
  useSystemColorMode: false,
};

const theme = extendTheme({
  config,
});

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(
  <Provider store={store}>
    <ChakraProvider theme={theme}>
          <App />
      </ChakraProvider>
  </Provider>
);
