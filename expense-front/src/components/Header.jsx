import {React, useEffect} from 'react'
import { useSelector, useDispatch} from 'react-redux'
import {Navbar, Nav, Container} from 'react-bootstrap'
import {FaRupeeSign} from 'react-icons/fa'
import { NavLink } from 'react-router-dom'
import { useLogoutMutation } from '../slices/usersApiSlice'
import {logout} from '../slices/authSlice'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const Header = () => {

    const {userInfo} = useSelector((state) => state.auth)

    const [logoutApiCall] = useLogoutMutation()

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(()=>{

    },[userInfo])
    
    const logoutHandler = async () => {
        try {
            await logoutApiCall().unwrap()
            dispatch(logout());
            toast.dark('Logged Out')
            navigate('/expense-login')
        } catch (err) {
            toast.error(err?.data?.message || err.error)
        }
    }

  return (
    <header>
        <Navbar bg="dark" variant="dark" expand="sm" collapseOnSelect>
            <Container>
                    <Navbar.Brand as={NavLink} to='/'>
                        <FaRupeeSign/> Expense Tracker
                    </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    {userInfo ? (<Nav className="ms-auto">
                            <Nav.Link as={NavLink} to='/expense-history'>
                                 Expense History
                            </Nav.Link>
                            <Nav.Link as={NavLink} to='/expense-profile'>
                                Profile
                            </Nav.Link>
                            <Nav.Link as={NavLink} onClick={logoutHandler}>
                                Logout
                            </Nav.Link>
                    </Nav>) : (
                        <Nav className='ms-auto'>
                            <Nav.Link as={NavLink} to='/expense-login'>
                                Login
                            </Nav.Link>
                        </Nav>
                            )}
                </Navbar.Collapse>
            </Container>
        </Navbar>
    </header>
  )
}

export default Header