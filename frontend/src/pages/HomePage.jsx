import React from 'react';
import { Container, VStack, Text } from '@chakra-ui/react';

const HomePage = () => {
  return (
    <Container maxW="container.xl" py={12}>
      <VStack spacing={8}>
        <Text
          fontSize={'30'}
          fontWeight={'bold'}
          textAlign={'center'}
          bgGradient={'linear(to-r, cyan.400, blue.500)'}
        >
          Current Products
        </Text>
      </VStack>
    </Container>
  );
};

export default HomePage;
