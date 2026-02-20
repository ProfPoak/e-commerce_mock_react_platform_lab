import { render, screen } from '@testing-library/react'
import { ProductContext } from '../context/ProductContext'
import ProductList from '../components/ProductList'
import { mockProducts } from './mockData'

describe('ProductList should', () => {
    test('render a list of products', () => {
        render(
            <ProductContext.Provider value={{ products: mockProducts, loading: false }}>
                <ProductList />
            </ProductContext.Provider>
        )

        expect(screen.getByText('Swiss Chocolate')).toBeInTheDocument()
        expect(screen.getByText('Belgian Dark Chocolate')).toBeInTheDocument()
    })

    test('show loading message when loading', () => {
        render(
            <ProductContext.Provider value={{ products: [], loading: true }}>
                <ProductList />
            </ProductContext.Provider>
        )

        expect(screen.getByText('Loading...')).toBeInTheDocument()
    })
})