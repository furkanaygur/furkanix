import { NavLink, Outlet } from 'react-router-dom'
import { Container, Navbar, Nav } from 'react-bootstrap';
import { IconButton} from "@chakra-ui/react";
import { FaSun, FaMoon } from 'react-icons/fa';

const Header = () => {
    return (
        <div>
            <Navbar collapseOnSelect expand="lg" style={{ backgroundColor: "#04046b", height:'60px' }} variant="dark" fixed='top'>
                <Container>
                    <Navbar.Brand><NavLink to="/" className='Logo' style={{textDecoration: "none", color: "#fff", display:'flex', justifyContent:'center', alignItems:'center'}} > <img style={{ height:50, width:50 }} src='/logo.png'></img> Furkanix </NavLink></Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="ms-auto">
                            <NavLink style={({ isActive }) => ({ color: isActive ? "#fb3173" : "#fff" })}
                                to="/" className='nav-link'> Home </NavLink>
                            <NavLink style={({ isActive }) => ({ color: isActive ? "#fb3173" : "#fff" })}
                                to="search" className='nav-link'> Search </NavLink>
                            <NavLink style={({ isActive }) => ({ color: isActive ? "#fb3173" : "#fff" })}
                                to="favorites" className='nav-link'> Favorites </NavLink>
                            <IconButton
                            icon={<FaMoon />}
                            isRound={true} 
                            size='md'
                            alignSelf='flex-end'
                            marginLeft={'3'}
                            />
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <Outlet />
        </div>
    )
}

export default Header


