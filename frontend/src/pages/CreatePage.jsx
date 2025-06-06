import React from 'react';
import { useState } from 'react';
import {
  Container,
  VStack,
  Heading,
  Box,
  Input,
  Button,
} from '@chakra-ui/react';
import { useColorModeValue } from '../components/ui/color-mode';
import { useProductStore } from '../store/product.js';
import { toaster } from '../components/ui/toaster.jsx';

const CreatePage = () => {
  const [newProduct, setNewProduct] = useState({
    name: '',
    price: '',
    image: '',
  });

  const { createProduct } = useProductStore();
  const handleAddProduct = async () => {
    const { success, message } = await createProduct(newProduct);
    toaster.create({
      title: success ? 'Success' : 'Error',
      description: message,
      type: success ? 'success' : 'error',
      duration: 5000,
      isClosable: true,
    });
    console.log('Success: ', success);
    console.log('Message', message);

    setNewProduct({
      name: '',
      price: '',
      image: '',
    });
  };
  return (
    <Container maxW={'container.sm'}>
      <VStack spacing={8}>
        <Heading as={'h1'} size={'2xl'} textAlign={'center'} mb={8}>
          Add new Game
        </Heading>
        <Box
          width="50%"
          bg={useColorModeValue('white', 'gray.800')}
          padding="6"
          rounded="lg"
          shadow="md"
        >
          <VStack spacing={4}>
            <Input
              placeholder="Game Name"
              name="name"
              value={newProduct.name}
              onChange={(e) =>
                setNewProduct({ ...newProduct, name: e.target.value })
              }
            />
            <Input
              placeholder="Price"
              name="price"
              value={newProduct.price}
              onChange={(e) =>
                setNewProduct({ ...newProduct, price: e.target.value })
              }
            />
            <Input
              placeholder="Image URL"
              name="image"
              value={newProduct.image}
              onChange={(e) =>
                setNewProduct({ ...newProduct, image: e.target.value })
              }
            />
            <Button colorScheme={'blue'} onClick={handleAddProduct} w="full">
              Add Game
            </Button>
          </VStack>
        </Box>
      </VStack>
    </Container>
  );
};

export default CreatePage;
