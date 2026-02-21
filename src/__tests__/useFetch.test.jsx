import { renderHook, waitFor, act } from '@testing-library/react'
import { useFetch } from '../hooks/useFetch'
import { mockApiFetch } from './mockData'

describe('useFetch should', () => {
    beforeEach(() => {
        mockApiFetch()
    })

    test('returns a makeRequest function', () => {
        const { result } = renderHook(() => useFetch())
        expect(typeof result.current.makeRequest).toBe('function')
    })

    test('makes a GET request and returns data', async () => {
        const { result } = renderHook(() => useFetch())

        await act(async () => {
            await result.current.makeRequest('http://localhost:3001/products', {
                method: 'GET'
            })
        })

        await waitFor(() => {
            expect(result.current.data).toBeDefined()
        })
    })

    test('handles errors gracefully', async () => {
        global.fetch = vi.fn(() => Promise.resolve({
            ok: false,
            status: 500
        }))

        const { result } = renderHook(() => useFetch())

        await act(async () => {
            await result.current.makeRequest('http://localhost:3001/products', {
                method: 'GET'
            })
        })

        await waitFor(() => {
            expect(result.current.error).toBeDefined()
        })
    })
})