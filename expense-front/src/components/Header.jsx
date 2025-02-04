import React from 'react'
import {Navbar, Nav, Container} from 'react-bootstrap'
import {FaRupeeSign} from 'react-icons/fa'
import { NavLink } from 'react-router-dom'

const Header = () => {
  return (
    <header>
        <Navbar bg="dark" variant="dark" expand="sm" collapseOnSelect>
            <Container>
                    <Navbar.Brand as={NavLink} to='/'>
                        <img src='' alt="Logo"/> Expense Tracker
                    </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                            <Nav.Link as={NavLink} to='/expense-history'>
                                <FaRupeeSign /> Expense History
                            </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    </header>
  )
}

export default Header