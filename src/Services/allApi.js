import { BASE_URL } from "./base_url"
import { commonRequest } from "./commonRequest"

//register api
export const empRegister = async(body,header)=>{
   return await  commonRequest('POST',`${BASE_URL}/employee/register`,body,header)
}

//getallusers api
export const getallusers = async(search)=>{
   return await commonRequest("GET",`${BASE_URL}/get-all-employees?search=${search}`,"")
}

//get a particular user api
export const viewUser = async(id) =>{
   return await commonRequest("GET",`${BASE_URL}/employee/view/${id}`,"")
}

//edituser
export const editUser= async(id,body,header)=>{
   return await commonRequest("PUT",`${BASE_URL}/employee/edit/${id}`,body,header)
}

//deleteuser
export const deleteuser = async(id)=>{
   return await commonRequest("DELETE",`${BASE_URL}/employee/delete/${id}`,{})

}