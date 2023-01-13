import {
  Button,
  Flex,
  HStack,
  useColorMode,
  IconButton,
  VStack,
  useColorModeValue,
  Slide,
  Heading,
  Text,
  ButtonProps,
} from '@chakra-ui/react';
import { BsSun, BsMoonStarsFill } from 'react-icons/bs';
import React, { useState } from 'react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import Link from 'next/link';

const NavBar = (): JSX.Element => {
  return (
    <>
      <Flex
        display={['none', 'none', 'flex', 'flex']}
        as={'nav'}
        mx={'auto'}
        pt={'3rem'}
        w={'80%'}
        justifyContent="space-between"
        alignItems={'center'}
      >
        <Link href={'/'}>
          <Heading>
            Phone
            <Text color={'blue.400'} as={'span'}>
              Specs
            </Text>
          </Heading>
        </Link>

        <HStack spacing={'12px'}>
          <Button as={Link} variant={'ghost'} href="/">
            Search
          </Button>
          <Button as={Link} variant={'ghost'} href="/Latest">
            Latest
          </Button>
          <Button as={Link} variant={'ghost'} href="/brands">
            Brands
          </Button>
          <ColorModeToggle></ColorModeToggle>
        </HStack>
      </Flex>
      <MobileNav />
    </>
  );
};

function ColorModeToggle(props: ButtonProps) {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Button
      aria-label="Toggle Color Mode"
      onClick={toggleColorMode}
      _focus={{ boxShadow: 'none' }}
      w="fit-content"
      {...props}
    >
      {colorMode === 'light' ? <BsMoonStarsFill /> : <BsSun />}
    </Button>
  );
}

function MobileNav({}) {
  const [isOpen, setIsOpen] = useState(false);
  const buttonBackground = useColorModeValue('gray.300', 'whiteAlpha.200');
  const mainColors = useColorModeValue('gray.50', 'blackAlpha.700');

  return (
    <>
      <Flex display={['flex', 'flex', 'none', 'none']} direction={'column'}>
        <Flex
          w={'93%'}
          pt={'2rem'}
          justifyContent={'flex-end'}
          alignItems={'center'}
          as={'header'}
          zIndex={21}
        >
          <HStack spacing={'1rem'}>
            <ColorModeToggle></ColorModeToggle>
            <IconButton
              onClick={() => {
                setIsOpen((prev) => !prev);
              }}
              aria-label="open menu"
              size="lg"
              icon={isOpen ? <CloseIcon /> : <HamburgerIcon boxSize={'2rem'} />}
            />
          </HStack>
        </Flex>

        <Slide
          style={{ zIndex: 20 }}
          direction="right"
          in={isOpen}
          unmountOnExit={true}
        >
          <Flex
            overflowY={'auto'}
            left={'0'}
            position={'fixed'}
            zIndex={'20'}
            w="100vw"
            h="100vh"
            backgroundColor={mainColors}
            opacity={'0.9'}
            justifyContent={'center'}
            pt={'7rem'}
          >
            <VStack spacing={'70px'}>
              <Button
                backgroundColor={buttonBackground}
                w={'150px'}
                onClick={() => {
                  setIsOpen(false);
                }}
                as={Link}
                variant={'ghost'}
                href="/"
              >
                Search
              </Button>
              <Button
                backgroundColor={buttonBackground}
                w={'150px'}
                onClick={() => {
                  setIsOpen(false);
                }}
                as={Link}
                variant={'ghost'}
                href="/Latest"
              >
                Latest
              </Button>
              <Button
                backgroundColor={buttonBackground}
                w={'150px'}
                onClick={() => {
                  setIsOpen(false);
                }}
                as={Link}
                variant={'ghost'}
                href="/brands"
              >
                Brands
              </Button>
            </VStack>
          </Flex>
        </Slide>
      </Flex>
    </>
  );
}

export default NavBar;
