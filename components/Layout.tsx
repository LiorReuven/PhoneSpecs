import Head from 'next/head';
import Navbar from './Navbar';

type Props = {
  children?: React.ReactNode;
};

const Layout = ({ children }: Props): JSX.Element => {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <main>{children}</main>
    </>
  );
};

export default Layout;