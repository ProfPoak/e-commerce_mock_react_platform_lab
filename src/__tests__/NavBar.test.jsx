import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import NavBar from '../components/NavBar'

describe('NavBar should', () => {
    test('render navigation links', () => {
        render(
            <MemoryRouter>
                <NavBar />
            </MemoryRouter>
        )

        expect(screen.getByText('Home')).toBeInTheDocument()
        expect(screen.getByText('Shop')).toBeInTheDocument()
        expect(screen.getByText('Admin')).toBeInTheDocument()
    })

    test('home link points to correct route', () => {
        render(
            <MemoryRouter>
                <NavBar />
            </MemoryRouter>
        )

        expect(screen.getByText('Home').closest('a')).toHaveAttribute('href', '/')
    })

    test('shop link points to correct route', () => {
        render(
            <MemoryRouter>
                <NavBar />
            </MemoryRouter>
        )

        expect(screen.getByText('Shop').closest('a')).toHaveAttribute('href', '/shop')
    })

    test('admin link points to correct route', () => {
        render(
            <MemoryRouter>
                <NavBar />
            </MemoryRouter>
        )

        expect(screen.getByText('Admin').closest('a')).toHaveAttribute('href', '/admin')
    })
})