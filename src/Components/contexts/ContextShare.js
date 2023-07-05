import React,{ createContext,useState } from "react";
export const addData = createContext()
export const updateData =createContext()
export const deleteData = createContext()
function ContextShare({children}) {
    //register data
    const[useradd,setUserAdd] = useState("")
    //update data
    const[editdata,seteditdata] = useState("")
    //delete data
    const[deletedata,setdeletedata] = useState("")

  return (
    <>
    <addData.Provider value={{useradd,setUserAdd}}>
      <updateData.Provider value={{editdata,seteditdata}}>
        <deleteData.Provider value={{deletedata,setdeletedata}}>
        {children}
        </deleteData.Provider>
</updateData.Provider>
    </addData.Provider>
    </>
  )
}

export default ContextShare

