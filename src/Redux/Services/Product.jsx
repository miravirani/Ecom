export const fetchAllProductsAPI = async () => {
  const response = await fetch('https://fakestoreapi.com/products');
  if (!response.ok) throw new Error('Failed to fetch products');
  return await response.json();
};

export const fetchProductByIdAPI = async (id) => {
  const response = await fetch(`https://fakestoreapi.com/products/${id}`);
  if (!response.ok) throw new Error('Failed to fetch product');
  return await response.json();
};
