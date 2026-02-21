import { useState, useId } from 'react'
import AddProductForm from './AddProductForm'

function AdminPanel() {
    const [isAdmin, setIsAdmin] = useState(false)
    const [password, setPassword] =useState('')

    const passwordId = useId()

    function handlePasswordSubmit(e) {
        e.preventDefault()

        password === 'admin' ? setIsAdmin(true) : alert('Incorrect Password please try again')
    }

    if(!isAdmin) {
        return (
            <div>
                <form onSubmit={handlePasswordSubmit}>
                    <label htmlFor={passwordId}>Password:</label>
                    <input type="text" name='password' id={passwordId} value={password} onChange={(e) => setPassword(e.target.value)} />
                    <button>Enter</button>
                </form>
            </div>
        )
    }

    return (
        <div>
            <AddProductForm />
        </div>
    )
}

export default AdminPanel