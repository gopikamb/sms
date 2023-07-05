import React from 'react'
import { Spinner } from 'react-bootstrap'

function LoadingSpinner() {
  return (
<div className='d-flex justify-content-center align-items-center m-5'>
<Spinner animation="border" variant="danger"/><span className="ms-2">Loading...</span></div>
    )
}

export default LoadingSpinner