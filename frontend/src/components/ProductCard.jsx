import {
  Box,
  Heading,
  Image,
  HStack,
  IconButton,
  Text,
} from '@chakra-ui/react';
import { useColorModeValue } from '../components/ui/color-mode';
import { MdEdit, MdDelete } from 'react-icons/md';
import React from 'react';
import { useProductStore } from '../store/product.js';
import { toaster } from '../components/ui/toaster.jsx';

const ProductCard = ({ product }) => {
  const textColor = useColorModeValue('gray.600', 'gray.200');
  const bg = useColorModeValue('white', 'gray.800');

  const { deleteProduct } = useProductStore();
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
          <IconButton colorPalette="blue">
            <MdEdit />
          </IconButton>
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
