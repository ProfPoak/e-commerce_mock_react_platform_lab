import { useState, useContext, useId } from 'react'
import { ProductContext } from '../context/ProductContext'
import { useFetch } from '../hooks/useFetch'

function AddProductForm() {
    const { setProducts, serverUrl } = useContext(ProductContext)
    const { makeRequest } = useFetch()
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [price, setPrice] = useState("")
    const [success, setSuccess] = useState(false)

    const nameId = useId()
    const descriptionId = useId()
    const priceId = useId()

    function handleSubmit(e) {
        e.preventDefault()

        const newProduct = {
            name,
            description,
            price
        }

        makeRequest(serverUrl, {
            method: "POST",
            body: newProduct
        })
        .then(newData => {
            setProducts(prevProducts => [...prevProducts, newData])
            setSuccess(true)
        })
    }

    return (
        <div>
            <h1>Add Product</h1>
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
                <button>Submit</button>
                {success && <p>Product successfully added!</p>}
            </form>
        </div>
    )
}

export default AddProductForm