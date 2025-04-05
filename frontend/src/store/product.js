import { create } from 'zustand';

export const useProductStore = create((set) => ({
  products: [],
  setProducts: (products) => set({ products }),
  createProduct: async (newProduct) => {
    if (!newProduct.name || !newProduct.price || !newProduct.image) {
      return { success: false, message: 'Please fill in all fields.' };
    }

    try {
      const res = await fetch('/api/products/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newProduct),
      });

      // Ensure response is valid JSON before parsing
      if (!res.ok) {
        const errorData = await res.json();
        return {
          success: false,
          message: errorData.message || 'Failed to create product.',
        };
      }

      const data = await res.json();
      set((state) => ({ products: [...state.products, data.data] }));
      return { success: true, message: 'Product created successfully.' };
    } catch (error) {
      console.error('Error in createProduct:', error);
      return {
        success: false,
        message: 'Something went wrong. Please try again.',
      };
    }
  },
  fetchProducts: async () => {
    try {
      const res = await fetch('/api/products/');
      if (!res.ok) {
        throw new Error('Failed to fetch products');
      }
      const data = await res.json();
      set({ products: data.data });
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  },
}));
