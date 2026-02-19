import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { ProductProvider } from './context/ProductContext.jsx'
import App from './components/App.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <ProductProvider>
      <App />
    </ProductProvider>
  </BrowserRouter>,
)
