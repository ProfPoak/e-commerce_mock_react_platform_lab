import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { ProductContext } from '../context/ProductContext'
import AdminPanel from '../components/AdminPanel'
import { mockProducts, mockApiFetch } from './mockData'

describe('AdminPanel should', () => {
    beforeEach(() => {
        mockApiFetch()
        vi.stubGlobal('alert', vi.fn())
    })

    test('render password gate by default', () => {
        render(
            <MemoryRouter>
                <ProductContext.Provider value={{ products: mockProducts, setProducts: vi.fn(), loading: false, serverUrl: 'http://localhost:3001/products' }}>
                    <AdminPanel />
                </ProductContext.Provider>
            </MemoryRouter>
        )

        expect(screen.getByLabelText('Password:')).toBeInTheDocument()
        expect(screen.queryByText('Add Product')).not.toBeInTheDocument()
    })

    test('shows admin content after correct password', async () => {
        render(
            <MemoryRouter>
                <ProductContext.Provider value={{ products: mockProducts, setProducts: vi.fn(), loading: false, serverUrl: 'http://localhost:3001/products' }}>
                    <AdminPanel />
                </ProductContext.Provider>
            </MemoryRouter>
        )

        await userEvent.type(screen.getByLabelText('Password:'), 'admin')
        await userEvent.click(screen.getByText('Enter'))

        expect(screen.getByText('Add Product')).toBeInTheDocument()
    })

    test('rejects incorrect password', async () => {
        render(
            <MemoryRouter>
                <ProductContext.Provider value={{ products: mockProducts, setProducts: vi.fn(), loading: false, serverUrl: 'http://localhost:3001/products' }}>
                    <AdminPanel />
                </ProductContext.Provider>
            </MemoryRouter>
        )

        await userEvent.type(screen.getByLabelText('Password:'), 'wrongpassword')
        await userEvent.click(screen.getByText('Enter'))

        expect(screen.queryByText('Add Product')).not.toBeInTheDocument()
    })

    test('renders product table with edit and delete controls', async () => {
        render(
            <MemoryRouter>
                <ProductContext.Provider value={{ products: mockProducts, setProducts: vi.fn(), loading: false, serverUrl: 'http://localhost:3001/products' }}>
                    <AdminPanel />
                </ProductContext.Provider>
            </MemoryRouter>
        )

        await userEvent.type(screen.getByLabelText('Password:'), 'admin')
        await userEvent.click(screen.getByText('Enter'))

        expect(screen.getByText('Swiss Chocolate')).toBeInTheDocument()
        expect(screen.getAllByText('Edit').length).toBeGreaterThan(0)
        expect(screen.getAllByText('Delete').length).toBeGreaterThan(0)
    })

    test('deletes a product', async () => {
        const setProducts = vi.fn()

        render(
            <MemoryRouter>
                <ProductContext.Provider value={{ products: mockProducts, setProducts, loading: false, serverUrl: 'http://localhost:3001/products' }}>
                    <AdminPanel />
                </ProductContext.Provider>
            </MemoryRouter>
        )

        await userEvent.type(screen.getByLabelText('Password:'), 'admin')
        await userEvent.click(screen.getByText('Enter'))
        await userEvent.click(screen.getAllByText('Delete')[0])

        await waitFor(() => {
            expect(setProducts).toHaveBeenCalled()
        })
    })
})