import { render, screen, waitFor } from '@testing-library/react'
import { ProductContext, ProductProvider } from '../context/ProductContext'
import { useContext } from 'react'
import { mockProducts, mockApiFetch } from './mockData'

describe('product context', () => {
    // A simple helper component that consumes the context so we can test it
    const TestComponent = () => {
    const { products, loading } = useContext(ProductContext)
    return (
        <div>
        {loading && <p>Loading...</p>}
        {products.map(p => <p key={p.id}>{p.name}</p>)}
        </div>
    )
    }

    // Before each test, mock fetch to return our fake data
    beforeEach(() => {
        mockApiFetch()
    })

    test('products load correctly from API', async () => {
    render(<ProductProvider><TestComponent /></ProductProvider>)
    
    // Wait for products to appear
    await waitFor(() => {
        expect(screen.getByText('Swiss Chocolate')).toBeInTheDocument()
        expect(screen.getByText('Belgian Dark Chocolate')).toBeInTheDocument()
    })
    })

    test('loading state is true then false after fetch', async () => {
    render(<ProductProvider><TestComponent /></ProductProvider>)
    
    // Loading should show initially
    expect(screen.getByText('Loading...')).toBeInTheDocument()
    
    // Loading should disappear after fetch completes
    await waitFor(() => {
        expect(screen.queryByText('Loading...')).not.toBeInTheDocument()
    })
    })
})