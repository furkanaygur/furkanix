import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
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
  <StrictMode>
    <ChakraProvider theme={theme}>
          <App />
      </ChakraProvider>
  </StrictMode>
);
