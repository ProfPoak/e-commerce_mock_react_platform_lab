import { useState, useContext, useId } from 'react'
import { ProductContext } from '../context/ProductContext'

function AddProductForm() {
    const { setProducts } = useContext(ProductContext)
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

        fetch('http://localhost:3001/products', {
            method: 'POST',
            headers: {
            'content-type': 'application/json'
            },
            body: JSON.stringify(newProduct) 
        })
        .then(r => {
            if(r.ok) {
                return r.json()
            }
            else {
                throw new Error('Unable to add new product. Please try again.')
            }
        })
        .then(newData => {
            setProducts(prevProducts => [...prevProducts, newData])
            setSuccess(true)
        })
        .catch(error => console.log(error))
    }

    return (
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
    )
}

export default AddProductForm