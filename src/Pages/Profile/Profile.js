import React,{useState,useEffect} from 'react';
import './Profile.css';
import { Card,Row} from 'react-bootstrap';
import LoadingSpinner from '../../Components/Spinners/LoadingSpinner';
import{useParams} from 'react-router-dom';
import{viewUser} from '../../Services/allApi'
import { BASE_URL } from '../../Services/base_url';


function Profile() {

   //spinner state
   const [showSpin,setShowSpin] =useState(true)

   //get path parameter from associated route
   const {id} = useParams()
   //console.log(id);

   //state to hold user details
   const [userDetail,setUserDetail] = useState({})

   //get a particular userdetail api
   const userDetails = async()=>{
    const {data}= await viewUser(id)
    setUserDetail(data);
   }
  console.log(userDetail);

   useEffect(()=>{
    userDetails()
    setTimeout(()=>{
      setShowSpin(false)
    },2000);
    },[])
  
  return (
    <>
    {
      showSpin ?  <div className='d-flex justify-content-center mt-5'><LoadingSpinner/></div>:
    <div className="container" style={{height:'70vh'}}>
   <Card className="shadow col-lg-6 mx-auto mt-5">
  <Card.Body>
<Row>
  <div className="col">
    <div className="profile_img d-flex justify-content-center">
    <img className="border p-1 rounded-circle" width={'300px'} height={'300px'} src={`${BASE_URL}/uploads/${userDetail.profile}`} alt="profile picture" />

    </div>
  </div>
</Row>
<div className="text-center mt-3">
  <h3>${userDetail.fname} </h3>
  <h3>${userDetail.lname}</h3>
  <h5><i className="fa-solid fa-envelope text-primary"></i>:- <span>{userDetail.email}</span></h5>
  <h5><i className="fa-solid fa-mobile text-warning"></i>:- <span>{userDetail.mobile}</span></h5>
  <h5><i className="fa-solid fa-venus-mars text-info"></i>:- <span>{userDetail.gender}</span></h5>
  <h5><i className="fa-solid fa-location-dot text-danger"></i>:- <span>{userDetail.location}</span></h5>
  <h5><i className="fa-solid fa-chart-line text-success"></i>:- <span>{userDetail.status}</span></h5>

</div>
  </Card.Body>
   </Card>
    </div>

      }
        </>
  )
}

export default Profile