import NavBar from '../components/navBar';
import { Outlet } from 'react-router';
function Root() {
    return (
        <div>
            {/* navBar */}
            <NavBar />
            {/* Outlet for nested routes */}
            <Outlet />
        </div>
    )
}

export default Root;