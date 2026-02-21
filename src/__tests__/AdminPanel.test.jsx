import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { ProductProvider } from '../context/ProductContext'
import AdminPanel from '../components/AdminPanel'
import { mockApiFetch } from './mockData'

describe('AdminPanel should', () => {
    beforeEach(() => {
        mockApiFetch()
        vi.stubGlobal('alert', vi.fn())
    })

    test('render password gate by default', () => {
        render(
            <MemoryRouter>
                <ProductProvider>
                    <AdminPanel />
                </ProductProvider>
            </MemoryRouter>
        )

        expect(screen.getByLabelText('Password:')).toBeInTheDocument()
        expect(screen.queryByText('Add Product')).not.toBeInTheDocument()
    })

    test('shows admin content after correct password', async () => {
        render(
            <MemoryRouter>
                <ProductProvider>
                    <AdminPanel />
                </ProductProvider>
            </MemoryRouter>
        )

        await userEvent.type(screen.getByLabelText('Password:'), 'admin')
        await userEvent.click(screen.getByText('Enter'))

        expect(screen.getByText('Add Product')).toBeInTheDocument()
    })

    test('rejects incorrect password', async () => {
        render(
            <MemoryRouter>
                <ProductProvider>
                    <AdminPanel />
                </ProductProvider>
            </MemoryRouter>
        )

        await userEvent.type(screen.getByLabelText('Password:'), 'wrongpassword')
        await userEvent.click(screen.getByText('Enter'))

        expect(screen.queryByText('Add Product')).not.toBeInTheDocument()
    })

    test('renders product table with edit and delete controls', async () => {
        render(
            <MemoryRouter>
                <ProductProvider>
                    <AdminPanel />
                </ProductProvider>
            </MemoryRouter>
        )

        await userEvent.type(screen.getByLabelText('Password:'), 'admin')
        await userEvent.click(screen.getByText('Enter'))

        await waitFor(() => {
            expect(screen.getByText('Swiss Chocolate')).toBeInTheDocument()
        })
        expect(screen.getAllByText('Edit').length).toBeGreaterThan(0)
        expect(screen.getAllByText('Delete').length).toBeGreaterThan(0)
    })

    test('deletes a product', async () => {
        render(
            <MemoryRouter>
                <ProductProvider>
                    <AdminPanel />
                </ProductProvider>
            </MemoryRouter>
        )

        await userEvent.type(screen.getByLabelText('Password:'), 'admin')
        await userEvent.click(screen.getByText('Enter'))

        await waitFor(() => {
            expect(screen.getByText('Swiss Chocolate')).toBeInTheDocument()
        })

        await userEvent.click(screen.getAllByText('Delete')[0])

        await waitFor(() => {
            expect(screen.queryByText('Swiss Chocolate')).not.toBeInTheDocument()
        })
    })
})