import React from 'react'
import {Navbar,Container} from 'react-bootstrap'
function Header() {
  return (
    <header>
            <Navbar  bg="dark" variant="dark"> 
          <Navbar.Brand href="/" >
            <i className='fa-solid fa-person fa-flip'></i>{' '}
            STUDENT MANAGEMENT SYSTEM 
          </Navbar.Brand>
      </Navbar>
    </header>
  )
}

export default Header