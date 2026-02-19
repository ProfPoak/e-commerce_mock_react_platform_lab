import { render, screen, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { ProductProvider } from '../context/ProductContext'
import App from '../components/App'
import { mockProducts, mockApiFetch } from './mockData'

describe('Routing should', () => {
    beforeEach(() => {
        mockApiFetch()
    })
    
    test('route to home', async () => {
        render(
            <MemoryRouter initialEntries={['/']}>
                <ProductProvider>
                    <App />
                </ProductProvider>
            </MemoryRouter>
        )

        await waitFor(() => {
            expect(screen.getByText('Home')).toBeInTheDocument()
        })
    })

    test('route to shop', async () => {
        render(
            <MemoryRouter initialEntries={['/shop']}>
                <ProductProvider>
                    <App />
                </ProductProvider>
            </MemoryRouter>
        )

        await waitFor(() => {
            expect(screen.getByText('Shop')).toBeInTheDocument()
        })
    })

    test('route to admin', async () => {
        render(
            <MemoryRouter initialEntries={['/admin']}>
                <ProductProvider>
                    <App />
                </ProductProvider>
            </MemoryRouter>
        )

        await waitFor(() => {
            expect(screen.getByText('Admin')).toBeInTheDocument()
        })
    })

    test('route to edit', async () => {
        render(
            <MemoryRouter initialEntries={['/edit/1']}>
                <ProductProvider>
                    <App />
                </ProductProvider>
            </MemoryRouter>
        )

        await waitFor(() => {
            expect(screen.getByText('Edit')).toBeInTheDocument()
        })
    })
})