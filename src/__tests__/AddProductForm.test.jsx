import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ProductContext } from '../context/ProductContext'
import AddProductForm from '../components/AddProductForm'
import { mockProducts, mockApiFetch } from './mockData'

describe('AddProductForm should', () => {
    beforeEach(() => {
        mockApiFetch()
    })

    test('render form fields', () => {
        render(
            <ProductContext.Provider value={{ products: mockProducts, setProducts: vi.fn(), loading: false }}>
                <AddProductForm />
            </ProductContext.Provider>
        )

        expect(screen.getByLabelText('Name:')).toBeInTheDocument()
        expect(screen.getByLabelText('Description:')).toBeInTheDocument()
        expect(screen.getByLabelText('Price:')).toBeInTheDocument()
        expect(screen.getByText('Submit')).toBeInTheDocument()
    })

    test('submits a new product', async () => {
        const setProducts = vi.fn()

        render(
            <ProductContext.Provider value={{ products: mockProducts, setProducts, loading: false }}>
                <AddProductForm />
            </ProductContext.Provider>
        )

        await userEvent.type(screen.getByLabelText('Name:'), 'Dark Chocolate')
        await userEvent.type(screen.getByLabelText('Description:'), 'Rich and bold')
        await userEvent.type(screen.getByLabelText('Price:'), '15')
        await userEvent.click(screen.getByText('Submit'))

        await waitFor(() => {
            expect(setProducts).toHaveBeenCalled()
        })
    })

    test('shows success message after product is added', async () => {
        const setProducts = vi.fn()

        render(
            <ProductContext.Provider value={{ products: mockProducts, setProducts, loading: false }}>
                <AddProductForm />
            </ProductContext.Provider>
        )

        await userEvent.type(screen.getByLabelText('Name:'), 'Dark Chocolate')
        await userEvent.type(screen.getByLabelText('Description:'), 'Rich and bold')
        await userEvent.type(screen.getByLabelText('Price:'), '15')
        await userEvent.click(screen.getByText('Submit'))

        await waitFor(() => {
            expect(screen.getByText('Product successfully added!')).toBeInTheDocument()
        })
    })
})