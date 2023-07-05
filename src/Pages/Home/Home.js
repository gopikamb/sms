import React,{useState,useEffect, useContext} from 'react';
import './Home.css';
import {Form,Button, Alert} from 'react-bootstrap';
import {useNavigate} from 'react-router-dom';
import Hometable from '../../Components/HomeTable/Hometable';
import LoadingSpinner from '../../Components/Spinners/LoadingSpinner';
import { addData, updateData,deleteData } from '../../Components/contexts/ContextShare';
import { deleteuser, getallusers } from '../../Services/allApi';

function Home() {
     //state to hold search key
     const[search,setSearch]=useState("")
      //use useContext
      const {editdata,seteditdata} = useContext(updateData)
   const{deletedata,setdeletedata} = useContext(deleteData)

  //to hold all users
  const [userdata,setUserdata]=useState([])

  const navigate = useNavigate()
  //get datafrom register page
  const {useradd,setUserAdd}=useContext(addData)
 // console.log(useradd);
  //spinner state
  const [showSpin,setShowSpin] =useState(true)
  const adduser = ()=>{
    //navigate to register page
    navigate('/register')
  }

   //api call to get all users
   const getalluserData = async()=>{
    const response = await getallusers(search)
    if(response.status===200){
      setUserdata(response.data)
    }
    else{
      console.log('Cannot fetch data!!!');
    }
   }

//delete user
const deleteUser = async(id)=>{
  //make an api call 
  const response = await deleteuser(id)
  
  if(response.status===200){
     getalluserData()
     setdeletedata(response.data)
  }
  
}
   //console.log(userdata);
  useEffect(()=>{
    getalluserData()
    setTimeout(()=>{
      setShowSpin(false)
    },2000);
    },[search])
  
  return (
   <>
   {
    useradd&&<Alert variant="success" onClose={() => setUserAdd("")} dismissible >  
    {useradd.fname.toUpperCase()} Successfully Registered....
    </Alert>
   }
   {
       editdata?<Alert variant="success" onClose={() => seteditdata("")} dismissible >  
       {editdata.fname.toUpperCase()} Successfully Updated....
       </Alert>:""
   }
   {
       deletedata?<Alert variant="danger" onClose={() => setdeletedata("")} dismissible >  
       {deletedata.fname.toUpperCase()} Successfully Deleted....
       </Alert>:""
   }

   <div className='container mt-5'>
    <div className="main_div">
 {/*search btn , add employee*/}
 <div className="search_Add d-flex justify-content-between">
  <div className="search col-md-4">
  <Form className="d-flex">
        <Form.Control type="text" placeholder="Search" className="me-2"
        onChange={e=>setSearch(e.target.value)}
        />
  <Button variant='primary'>Search</Button>
    </Form>
  </div>
<div className="add_btn">
<Button onClick={adduser} variant='success'><i className="fa-solid fa-user-plus"></i>Add</Button>
</div>
  </div>
  </div>
<div className="second_div">
  {/*table*/}
  {
    showSpin? <div className='d-flex justify-content-center mt-5'><LoadingSpinner/></div>:<Hometable  
    displayData={userdata}
    deleteUser={deleteUser}
    />
  }
</div>

  </div>
   </>
  )
}

export default Home