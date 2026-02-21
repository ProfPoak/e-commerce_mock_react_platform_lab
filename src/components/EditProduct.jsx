import { useParams } from 'react-router-dom'
import { useContext, useState } from 'react'
import { ProductContext } from '../context/ProductContext'

function EditProduct() {
    const { products } = useContext(ProductContext)
    const { id } = useParams()
    const product = products.find(product => product.id === Number(id))
    const [name, setName] = useState(product.name)
    const [description, setDescription] = useState(product.description)
    const [price, setPrice] = useState(product.price)



    return (
        <div>
            <h1>Edit</h1>
        </div>
    )
}

export default EditProduct