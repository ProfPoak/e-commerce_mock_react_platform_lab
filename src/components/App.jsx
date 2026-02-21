import { Routes, Route } from 'react-router-dom'
import NavBar from './NavBar.jsx'
import Home from './Home.jsx'
import ProductContainer from './ProductContainer.jsx'
import AdminPanel from './AdminPanel.jsx'
import AddProductForm from './AddProductForm.jsx'
import EditProduct from './EditProduct.jsx'

function App() {

  return (
    <Routes>
      <Route element={<NavBar />}>
        <Route path='/' element={<Home />} />
        <Route path='/shop' element={<ProductContainer />} />
        <Route path='/admin' element={<AdminPanel />} />
        <Route path='/edit/:id' element={<EditProduct />} />
      </Route>
    </Routes>
  )
}

export default App
