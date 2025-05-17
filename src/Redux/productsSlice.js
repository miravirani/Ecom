import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async () => {
    const response = await fetch('https://fakestoreapi.com/products');
    return await response.json();
  }
);

export const fetchProductById = createAsyncThunk(
  'products/fetchProductById',
  async (id) => {
    const response = await fetch(`https://fakestoreapi.com/products/${id}`);
    if (!response.ok) throw new Error('Failed to fetch product');
    return await response.json();
  }
);

const getInitialLikes = () => {
  const stored = localStorage.getItem('likedProducts');
  return stored ? JSON.parse(stored) : [];
};

const productsSlice = createSlice({
  name: 'products',
  initialState: {
    items: [],
    status: 'idle',
    error: null,
    single: null,
    singleStatus: 'idle',
    singleError: null,
    liked: getInitialLikes(),
  },
  reducers: {
    toggleLike: (state, action) => {
      const id = action.payload;
      if (state.liked.includes(id)) {
        state.liked = state.liked.filter((pid) => pid !== id);
      } else {
        state.liked.push(id);
      }
      localStorage.setItem('likedProducts', JSON.stringify(state.liked));
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(fetchProductById.pending, (state) => {
        state.singleStatus = 'loading';
        state.singleError = null;
        state.single = null;
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.singleStatus = 'succeeded';
        state.single = action.payload;
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.singleStatus = 'failed';
        state.singleError = action.error.message;
      });
  },
});

export const { toggleLike } = productsSlice.actions;
export default productsSlice.reducer;
// export { fetchProducts, fetchProductById }; 