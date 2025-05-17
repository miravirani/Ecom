const BASE_URL = import.meta.env.VITE_API_BASE_URL;
console.log(BASE_URL);

export const fetchAllProductsAPI = async () => {
  const response = await fetch(`${BASE_URL}/products`);
  if (!response.ok) throw new Error('Failed to fetch products');
  return await response.json();
};

export const fetchProductByIdAPI = async (id) => {
  const response = await fetch(`${BASE_URL}/products/${id}`);
  if (!response.ok) throw new Error('Failed to fetch product');
  return await response.json();
};
