import React from 'react';
import { Button, Container, Flex, HStack, Text } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { CiSquarePlus } from 'react-icons/ci';
import { useColorMode } from './ui/color-mode';
import { IoMdMoon } from 'react-icons/io';
import { IoMdSunny } from 'react-icons/io';

const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Container maxWidth={'1140px'} px={4}>
      <Flex
        h={16}
        alignItems={'center'}
        justifyContent={'space-between'}
        flexDirection={{
          base: 'column',
          sm: 'row',
        }}
      >
        <Text
          bgGradient="to-r"
          gradientFrom="blue.200"
          gradientTo="blue.500"
          bgClip="text"
          textAlign={'Center'}
          fontSize="3xl"
          fontWeight="bold"
        >
          <Link to={'/'}>GameHut 🛒</Link>
        </Text>
        <HStack>
          <Link to={'/create'}>
            <Button>
              <CiSquarePlus />
            </Button>
          </Link>
          <Button onClick={toggleColorMode}>
            {colorMode === 'light' ? <IoMdMoon /> : <IoMdSunny />}
          </Button>
        </HStack>
      </Flex>
    </Container>
  );
};

export default Navbar;
