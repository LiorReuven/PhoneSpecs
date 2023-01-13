import type { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import { extendTheme } from '@chakra-ui/react';
import { mode, Styles } from '@chakra-ui/theme-tools';
import Layout from '../components/Layout';

const config = {
  initialColorMode: 'dark',
  useSystemColorMode: false,
};

const styles: Styles = {
  global: (props) => ({
    body: {
      bg: mode('#fafafa', '#121212')(props),
    },
  }),
};

const components = {
  Link: {
    baseStyle: {
      '&:hover': { textDecoration: 'none' },
    },
  },
  Button: {
    baseStyle: {
      '&:hover': { textDecoration: 'none' },
    },
  },
};

export const theme = extendTheme({ config, styles, components });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ChakraProvider>
  );
}
