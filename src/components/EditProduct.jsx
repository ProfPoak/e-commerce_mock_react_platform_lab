import { useParams, useNavigate } from 'react-router-dom'
import { useContext, useState, useId, useEffect } from 'react'
import { ProductContext } from '../context/ProductContext'
import { useFetch } from '../hooks/useFetch'

function EditProduct() {
    //Implementing Hooks
    const { products, setProducts, serverUrl, loading } = useContext(ProductContext)
    const { id } = useParams()
    const { makeRequest } = useFetch()
    const navigate = useNavigate()
    
    //Defining the correct product
    const product = products.find(product => product.id === id)
    const [name, setName] = useState(product?.name)
    const [description, setDescription] = useState(product?.description)
    const [price, setPrice] = useState(product?.price)
    
    const [success, setSuccess] = useState(false)
    const [password, setPassword] = useState('')

    const nameId = useId()
    const descriptionId = useId()
    const priceId = useId()

    useEffect(() => {
    if (product) {
        setName(product.name)
        setDescription(product.description)
        setPrice(product.price)
    }
    }, [product])

    function handleSubmit(e) {
        e.preventDefault()
        
        const updatedProduct = {
            name,
            description,
            price
        }

        makeRequest(`${serverUrl}/${id}`, {
            method: "PATCH",
            body: updatedProduct
        })
        .then(data => {
            setProducts(prevProducts => 
                prevProducts.map(product => product.id === data.id ? data : product)
            )
            setSuccess(true)
        })
    }

    if (loading) return <p>Loading...</p>

    return (
        <div>
            <h1>Edit</h1> 
            <form onSubmit={handleSubmit}>
                <label htmlFor={nameId}>Name:</label>
                <input type="text" name='name' id={nameId} value={name} onChange={(e) => {
                    setName(e.target.value)
                    setSuccess(false)
                    }} />
                <label htmlFor={descriptionId}>Description:</label>
                <input type="text" name='description' id={descriptionId} value={description} onChange={(e) => {
                    setDescription(e.target.value)
                    setSuccess(false)
                    }} />
                <label htmlFor={priceId}>Price:</label>
                <input type="text" name='price' id={priceId} value={price} onChange={(e) => {
                    setPrice(e.target.value)
                    setSuccess(false)
                    }} />
                <button>Update</button>
                {success && <p>Product successfully updated!</p>}
            </form>
            <button onClick={() => navigate('/admin')}>Go Back</button>
        </div>
    )
}

export default EditProduct