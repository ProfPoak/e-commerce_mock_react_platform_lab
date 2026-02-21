import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { ProductContext } from '../context/ProductContext'
import EditProduct from '../components/EditProduct'
import { mockProducts, mockApiFetch } from './mockData'

describe('EditProduct should', () => {
    beforeEach(() => {
        mockApiFetch()
    })

    test('render form pre-filled with product data', async () => {
        render(
            <MemoryRouter initialEntries={['/edit/1']}>
                <Routes>
                    <Route path='/edit/:id' element={
                        <ProductContext.Provider value={{ products: mockProducts, setProducts: vi.fn(), loading: false }}>
                            <EditProduct />
                        </ProductContext.Provider>
                    } />
                </Routes>
            </MemoryRouter>
        )

        expect(screen.getByLabelText('Name:')).toHaveValue('Swiss Chocolate')
        expect(screen.getByLabelText('Description:')).toHaveValue('Delicious and creamy')
        expect(screen.getByLabelText('Price:')).toHaveValue('10')
    })

    test('submits updated product', async () => {
        const setProducts = vi.fn()

        render(
            <MemoryRouter initialEntries={['/edit/1']}>
                <Routes>
                    <Route path='/edit/:id' element={
                        <ProductContext.Provider value={{ products: mockProducts, setProducts, loading: false }}>
                            <EditProduct />
                        </ProductContext.Provider>
                    } />
                </Routes>
            </MemoryRouter>
        )

        await userEvent.clear(screen.getByLabelText('Price:'))
        await userEvent.type(screen.getByLabelText('Price:'), '20')
        await userEvent.click(screen.getByText('Update'))

        await waitFor(() => {
            expect(setProducts).toHaveBeenCalled()
        })
    })

    test('shows success message after product is updated', async () => {
    const setProducts = vi.fn()

    render(
        <MemoryRouter initialEntries={['/edit/1']}>
            <Routes>
                <Route path='/edit/:id' element={
                    <ProductContext.Provider value={{ products: mockProducts, setProducts, loading: false }}>
                        <EditProduct />
                    </ProductContext.Provider>
                } />
            </Routes>
        </MemoryRouter>
    )

    await userEvent.clear(screen.getByLabelText('Price:'))
    await userEvent.type(screen.getByLabelText('Price:'), '20')
    await userEvent.click(screen.getByText('Update'))

    await waitFor(() => {
        expect(screen.getByText('Product successfully updated!')).toBeInTheDocument()
    })
})
})