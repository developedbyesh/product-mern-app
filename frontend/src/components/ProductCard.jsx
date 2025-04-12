import {
  Box,
  Heading,
  Image,
  HStack,
  IconButton,
  Text,
  Button,
  CloseButton,
  Dialog,
  Portal,
  Input,
  VStack,
} from '@chakra-ui/react';
import { useColorModeValue } from '../components/ui/color-mode';
import { MdEdit, MdDelete } from 'react-icons/md';
import React from 'react';
import { useProductStore } from '../store/product.js';
import { toaster } from '../components/ui/toaster.jsx';
import { useState } from 'react';

const ProductCard = ({ product }) => {
  const [updatedProduct, setUpdatedProduct] = useState(product);
  const textColor = useColorModeValue('gray.600', 'gray.200');
  const bg = useColorModeValue('white', 'gray.800');

  const { deleteProduct, updateProduct } = useProductStore();
  const handleDeleteProduct = async (id) => {
    const { success, message } = await deleteProduct(id);
    toaster.create({
      title: success ? 'Success' : 'Error',
      description: message,
      type: success ? 'success' : 'error',
      duration: 5000,
      isClosable: true,
    });
  };

  const handleUpdateProduct = async (id, updatedProduct) => {
    const { success, message } = await updateProduct(id, updatedProduct);
    toaster.create({
      title: success ? 'Success' : 'Error',
      description: message,
      type: success ? 'success' : 'error',
      duration: 5000,
      isClosable: true,
    });
  };
  return (
    <Box
      shadow={'lg'}
      rounded={'lg'}
      overflow={'hidden'}
      transition={'all 0.3s ease'}
      _hover={{ transform: 'translateY(-5px)', shadow: 'xl' }}
      bg={bg}
    >
      <Image
        src={product.image}
        alt={product.name}
        h={48}
        w="full"
        objectFit="cover"
      />
      <Box p={4}>
        <Heading as={'h3'} size="md" mb={2}>
          {product.name}
        </Heading>
        <Text fontWeight={'bold'} fontSize="xl" color={textColor} mb={4}>
          ${product.price}
        </Text>
        <HStack spacing={2}>
          <Dialog.Root>
            <Dialog.Trigger asChild>
              <IconButton colorPalette="blue">
                <MdEdit />
              </IconButton>
            </Dialog.Trigger>
            <Portal>
              <Dialog.Backdrop />
              <Dialog.Positioner>
                <Dialog.Content>
                  <Dialog.Header>
                    <Dialog.Title>Update Product</Dialog.Title>
                  </Dialog.Header>
                  <Dialog.Body>
                    <VStack spacing={4}>
                      <Input
                        placeholder="Product Name"
                        name="name"
                        value={updatedProduct.name}
                        onChange={(e) =>
                          setUpdatedProduct({
                            ...updatedProduct,
                            name: e.target.value,
                          })
                        }
                      />
                      <Input
                        placeholder="Price"
                        name="price"
                        value={updatedProduct.price}
                        onChange={(e) =>
                          setUpdatedProduct({
                            ...updatedProduct,
                            price: e.target.value,
                          })
                        }
                      />
                      <Input
                        placeholder="Image URL"
                        name="image"
                        value={updatedProduct.image}
                        onChange={(e) =>
                          setUpdatedProduct({
                            ...updatedProduct,
                            image: e.target.value,
                          })
                        }
                      />
                    </VStack>
                  </Dialog.Body>
                  <Dialog.Footer>
                    <Dialog.ActionTrigger asChild>
                      <Button variant="outline">Cancel</Button>
                    </Dialog.ActionTrigger>
                    <Dialog.ActionTrigger asChild>
                      <Button
                        colorPalette="blue"
                        onClick={() =>
                          handleUpdateProduct(product._id, updatedProduct)
                        }
                      >
                        Update
                      </Button>
                    </Dialog.ActionTrigger>
                  </Dialog.Footer>
                  <Dialog.CloseTrigger asChild>
                    <CloseButton size="sm" />
                  </Dialog.CloseTrigger>
                </Dialog.Content>
              </Dialog.Positioner>
            </Portal>
          </Dialog.Root>
          <IconButton
            colorPalette="red"
            onClick={() => handleDeleteProduct(product._id)}
          >
            <MdDelete />
          </IconButton>
        </HStack>
      </Box>
    </Box>
  );
};

export default ProductCard;
