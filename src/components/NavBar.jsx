import { NavLink, Outlet } from 'react-router-dom'

function NavBar() {


    return (
        <div>
            <NavLink to="/">Home</NavLink>
            <NavLink to="/shop">Shop</NavLink>
            <NavLink to="/admin">Admin</NavLink>
            <Outlet />
        </div>
    )
}

export default NavBar