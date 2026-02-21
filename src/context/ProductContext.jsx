import { createContext, useState, useEffect } from "react"

export const ProductContext = createContext()

export function ProductProvider({ children }) {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(false)
    const [isAdmin, setIsAdmin] = useState(false)
    const serverUrl = 'http://localhost:3001/products'

    useEffect(() => {
        setLoading(true)
        
        fetch(serverUrl)
            .then(r => {
                if(r.ok) {
                    return r.json()
                }
                else {
                    throw new Error('unable to retrieve products')
                }
            })
            .then(data => {
                setProducts(data)
                setLoading(false)
            })
            .catch(error => {
                console.log(error)
                setLoading(false)
            })

    }, [])

    return (
        <ProductContext.Provider value={{ products, setProducts, loading, serverUrl, isAdmin, setIsAdmin }}>
            {children}
        </ProductContext.Provider>
    )
}