import { NavLink, Outlet } from 'react-router-dom'

function NavBar() {


    return (
        <div>
            <div className='navbar'>
                <NavLink to="/">Home</NavLink>
                <NavLink to="/shop">Shop</NavLink>
                <NavLink to="/admin">Admin</NavLink>
            </div>
            <Outlet />
        </div>
    )
}

export default NavBar