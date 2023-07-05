import React from 'react'
// import './Hometable.css'
import { Row,Card,Table,Dropdown } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { BASE_URL } from '../../Services/base_url';

function Hometable({displayData,deleteUser}) {
  console.log(displayData);
  return (
        <>
        <div className="container mt-5">
            <Row>
                <div className="col">
                    <Card className='shadow'>
                      <Table className='align-items-center' responsive='sm'>
                      <thead className='thead-dark'>
              <tr className='table-dark'>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Mobile</th>
            <th>Status</th>
            <th>Profile</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {
            displayData.length>0? displayData.map((item,index)=>(
              <tr>
              <td>{index+1}</td>
              <td>{item.fname} &nbsp; {item.lname}</td>
              <td>{item.email}</td>
              <td>{item.mobile}</td>
              <td>
              <Dropdown >
                    <Dropdown.Toggle variant={item.status==='Active'?'primary':'danger'} id="dropdown-basic">
                    {item.status}
                    </Dropdown.Toggle>
                  </Dropdown>
              </td>
              <td>
                  <img className="rounded" width={'50px'} height={'50px'} src={`${BASE_URL}/uploads/${item.profile}`} alt="profile picture" />
              </td>
              <td>
              <Dropdown>
                    <Dropdown.Toggle  variant="light"  id="dropdown-basic1">
                    <i class="fa-solid fa-ellipsis-vertical  fs-4"></i>
                    </Dropdown.Toggle>
              
                    <Dropdown.Menu>
                          <Dropdown.Item>
                          <Link to={`/profile/${item._id}`} className="text-decoration-none">
                          <i className="fa-solid fa-eye text-success me-2 fs-5"></i>
                          <span className="fs-5 text-dark">View</span>
                          </Link>
                          </Dropdown.Item>
                          <Dropdown.Item>
                          <Link to={`/edit/${item._id}`} className="text-decoration-none">
                          <i className="fa-solid fa-pen text-primary me-2 fs-5"></i>
                          <span className="fs-5 text-dark">Edit</span>
                          </Link>
                          </Dropdown.Item>
                          <Dropdown.Item>
                              <div onClick={()=>deleteUser(item._id)}>
                              <i className="fa-solid fa-trash text-danger me-2 fs-5"></i>
                          <span className="fs-5 text-dark">Delete</span> 
                              </div>
                          </Dropdown.Item>
              
                    </Dropdown.Menu>
                  </Dropdown>
              </td>
                          </tr>
            )):
            <tr className="d-flex justify-content-center mt-5 w-100 align-items-center text-danger">Sorry!! Nothing to display</tr>
            }
            </tbody>
                      </Table>
                    </Card>
                </div>
                </Row>
            </div>
     </>
  )
}

export default Hometable