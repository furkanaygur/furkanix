import React, {useEffect} from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import { Container, Navbar, Nav } from 'react-bootstrap';
import { IconButton } from "@chakra-ui/react";
import { FaSun, FaMoon } from 'react-icons/fa';
import { changeTheme, clearStatus  } from '../stores/eventSlice';
import { useDispatch, useSelector } from 'react-redux'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Header = () => {
    
    const dispatch = useDispatch()
    const { status, theme } = useSelector((state) => state.event);
    
    useEffect(() => {
        if(localStorage.getItem("theme") == "dark") {
            document.body.classList.add('dark-mode')
            dispatch(changeTheme('dark')) 
        } else {
            document.body.classList.remove('dark-mode');
            dispatch(changeTheme('light')) 
        }
    },[])

    useEffect(() => {
        toast(status, {
            position: "bottom-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: false,
            draggable: true,
            theme: "dark"
            });

        dispatch(clearStatus())   
    }, [status])

    const changeThemeHandler = () => {
        if(theme == "light") {
            document.body.classList.add('dark-mode')
            dispatch(changeTheme('dark')) 
            localStorage.setItem("theme", "dark")
        } else {
            document.body.classList.remove('dark-mode');
            dispatch(changeTheme('light')) 
            localStorage.setItem("theme", "light")
        }
    }

    return (
        <div>
            <ToastContainer/>
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
                                icon={ theme=='dark' ? <FaSun /> : <FaMoon />}
                                isRound={true} 
                                size='md'
                                alignSelf='flex-end'
                                marginLeft={'3'}
                                onClick={ () => changeThemeHandler() }
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


