import React,{useState,useEffect, useContext} from 'react';
import './Register.css';
import { Card,Form,Row,Button} from 'react-bootstrap';
import Select from 'react-select';
import { ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoadingSpinner from '../../Components/Spinners/LoadingSpinner';
import { empRegister } from '../../Services/allApi';
import { useNavigate } from 'react-router-dom';
import { addData } from '../../Components/contexts/ContextShare';


function Register() {
 

  //use navigate
  const navigate = useNavigate()

  //state to share data from register to all contacts
  const{useradd,setUserAdd} = useContext(addData)

  // const headerConfig = {
  //    "Content-Type":"multipart/form-data"
  // }
  //spinner state
    const [showSpin,setShowSpin] =useState(true)

  const option=[
    {value:'Active',label:'Active'},
    {value:'InActive',label:'InActive'}
  ]

  //state to hold normal inputs
  const [inputData,setInputData] = useState({
    fname:"",
    lname:"",
    email:"",
    mobile:"",
    gender:"",
    location:""
  })

  //status state
  const [status,setStatus]=useState("Active")
  //image state
  const [image,setImage] = useState("")
 //preview state
 const [preview,setPreview] = useState("")
  //to update inputData state
   const setInputValue = (e)=>{
    const {name,value} = e.target
    setInputData({...inputData,[name]:value})
   }
//console.log(inputData);

//to update status
const setStatusvalue = (e)=>{
  setStatus(e.value)
}
console.log(status);

// to update profile
const setProfile = (e)=>{
 // console.log(e);
  setImage(e.target.files[0])
}
console.log(image);

 useEffect(()=>{
      setTimeout(()=>{
        setShowSpin(false)
      },2000);
      if(image){
        setPreview(URL.createObjectURL(image))
  }
 },[image])
 
//handle submit
const handleSubmit = async(e)=>{
  e.preventDefault()
  const {fname,lname,email,mobile,gender,location} = inputData;
  if(fname===""){
   toast.error("First name required!!!")
  }else if(lname===""){
    toast.error("Last name required!!!")
  }else if(email===""){
    toast.error("email  required!!!")
  }else if(mobile===""){
    toast.error("mobile required!!!")
}else if(gender===""){
  toast.error("gender required!!!")
}else if(location===""){
  toast.error("Location required!!!")
}else if(status===""){
  toast.error("Status required!!!")
}else if(image===""){
  toast.error("Profile Image required!!!")
}else{
  //toast.success("Registration Success")
  //api call
  const data = new FormData()
  data.append("fname",fname)
  data.append("lname",lname)
  data.append("email",email)
  data.append("mobile",mobile)
  data.append("location",location)
  data.append("gender",gender)
  data.append("status",status)
  data.append("user_profile",image)
//console.log(data);
  const headerConfig = {
    "Content-Type":"multipart/form-data"

  }
  const response = await empRegister(data,headerConfig)
  console.log(response);
  if(response.status===200){
    //register success - all state reset
    setInputData({
      ...inputData,
      fname:"",
      lname:"",
      email:"",
      mobile:"",
      gender:"",
      location:""
    })
    setStatus("")
    setImage("")
    //share data to all contact page via use context
      setUserAdd(response.data)
    //navigate to all contacts
    navigate('/')
  }
}
}
  return (
    <>
    {
       
        showSpin? 
        <div className='d-flex justify-content-center mt-5'><LoadingSpinner/></div>:
         <div className="container mt-5">
          <h2 className="text-center mt-3">Register Student Details</h2>
          <Card className='shadow mt-3 p-3'>
            <div className="text-center">
            <img className="border p-1 rounded-circle" width={'50px'} height={'50px'} src={preview?preview:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQcCXNh9OsJ5FQZPljU_-rLiND2_9XogYnyxQ&usqp=CAU"} alt="profile picture" />
            </div>
            <Form>
           <Row>
           <Form.Group className="mb-3 col-lg-6" controlId="formBasicfname">
        <Form.Label> Name</Form.Label>
        <Form.Control type="text" name="fname" placeholder="Name" value={inputData.fname} onChange={setInputValue}/>
      </Form.Group>
      <Form.Group className="mb-3 col-lg-6" controlId="formBasiclname" >
        <Form.Label>Class</Form.Label>
        <Form.Control type="text" name="lname" placeholder="Class" value={inputData.lname} onChange={setInputValue}/>
      </Form.Group>
      <Form.Group className="mb-3 col-lg-6" controlId="formBasicmail">
        <Form.Label>Email Address</Form.Label>
        <Form.Control type="email" name="email" placeholder="Email Address" value={inputData.email} onChange={setInputValue} />
      </Form.Group>
      <Form.Group className="mb-3 col-lg-6" controlId="formBasicmobile">
        <Form.Label>Mobile</Form.Label>
        <Form.Control type="text" name="mobile"  placeholder="Mobile" value={inputData.mobile} onChange={setInputValue}/>
      </Form.Group>
      <Form.Group className="mb-3 col-lg-6" controlId="formBasicgender">
        <Form.Label>Select Gender</Form.Label>
        <Form.Check
            type={"radio"}
            label={"Male"}
            name='gender'
            value={"Male"}
           onChange={setInputValue}
          />
           <Form.Check
            type={"radio"}
            label={"Female"}
            name='gender'
            value={"Female"}
            onChange={setInputValue}

          />
      </Form.Group>
      <Form.Group className="mb-3 col-lg-6" controlId="formBasicstatus">
        <Form.Label>Select Student Status</Form.Label>
        <Select options={option} onChange={setStatusvalue}></Select>
      </Form.Group>
      <Form.Group className="mb-3 col-lg-6" controlId="formBasicpic">
        <Form.Label>Choose Profile Picture</Form.Label>
        <Form.Control type="file" name="user_profile" onChange={setProfile}/>
      </Form.Group>
      <Form.Group className="mb-3 col-lg-6" controlId="formBasicloc">
        <Form.Label>Enter Student Location</Form.Label>
        <Form.Control type="text" name="location" placeholder="Enter Employee Location" value={inputData.location} onChange={setInputValue}/>
      </Form.Group>
      <Button onClick={handleSubmit} className="mt-3" variant='primary' type='submit'>Submit</Button>
           </Row>
            </Form>
          </Card>
         </div>
}
       {  /* toast */}
       <ToastContainer position='top-center'/>
    </>
  )
}

export default Register