import { useContext } from "react"
import { ProductContext } from "../context/ProductContext"
import { useFetch } from "../hooks/useFetch"
import { useNavigate } from "react-router-dom"


function AdminProductTable() {
    const { products, setProducts, serverUrl } = useContext(ProductContext)
    const { makeRequest } = useFetch()
    const navigate = useNavigate()

    function handleEdit(id) {
        navigate(`/edit/${id}`)
    }
    
    function handleDelete(id) {

        makeRequest(`${serverUrl}/${id}`, {
            method: "DELETE"
        })
        .then(() => {
            setProducts(products.filter(product => product.id !== id))
        })
    }

    return(
        <table>
            <thead>
                <tr>
                    <th>Product</th>
                </tr>
            </thead>
            <tbody>
                {products.map(({ id, name}) => (
                    <tr key={id}>
                        <td>{name}</td>
                        <td>
                            <button onClick={() => handleEdit(id)}>Edit</button>
                        </td>
                        <td>
                            <button onClick={() => handleDelete(id)}>Delete</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

export default AdminProductTable