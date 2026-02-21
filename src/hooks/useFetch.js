import { useState } from 'react'

export function useFetch() {
    const [data, setData] = useState(null)
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)

    function makeRequest(url, options = {}) {
        setLoading(true)
        setError(null)

        return fetch(url, {
            headers: {
                'content-type': 'application/json',
                ...options.headers
            },
            ...options,
            body: options.body ? JSON.stringify(options.body) : undefined
        })
        .then(r => {
            if(r.ok) {
                return r.json()
            } else {
                throw new Error('Request failed')
            }
        })
        .then(newData => {
            setData(newData)
            setLoading(false)
            return newData
        })
        .catch(err => {
            setError(err.message)
            setLoading(false)
        })
    }

    return { data, error, loading, makeRequest }
}