import { BrowserRouter, Routes, Route } from 'react-router-dom'
import MainLayout from './Layout/MainLayout/MainLayout'
import Home from './Components/Home/Home'
import Products from './Components/Products/Products'
import ProductDetails from './Components/Products/ProductDetails'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="products" element={<Products />} />
          <Route path="products/:id" element={<ProductDetails />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
