import React, { useState } from "react";
import noteContext from "./noteContext";
import { message } from 'antd';

import host from "../../config";


const NoteState =(props)=>{
    // let host="https://notewiz-server-j.vercel.app/"
  
const [notes, setnotes] = useState([{
    "id":"12",
    "title":"english",
    "description":"i want to be a expert in an english",
    "tag":"personal"
},
{
    "id":"123",
    "title":"english",
    "description":"i want to be a expert in an english",
    "tag":"personal"
}])
    
const [snotes, setsnotes] = useState(notes)    

// this ID is the id of those note that user click and use for note customization
const [modifynote_id, setmodifynote_id] = useState(null)
const addmodify_Id=(props)=>{
setmodifynote_id(props)
console.log("okokok" +modifynote_id)
}

//functionality for modal 
const [open, setOpen] = useState(false);
const showModal = (props) => {
    setOpen(props);
    // console.log("testing "+props)
  };

//functionality for spinner 
const [isSpin, setisSpin] = useState(false)
// isspin and setisspin we change this values in component where we call add and fetch functions



  //edit note
  const editNote= async (title,description,tag)=>{
    //API CALL TO EDIT
    try{
        setisSpin(true)
        const response = await fetch(`${host}api/notes/updatenote/${modifynote_id}`, {
            method: "PUT", 
            headers: {
              "Content-Type": "application/json",
              "auth-token":localStorage.getItem("token")
              
            },
            body: JSON.stringify({title:title,description:description,tag:tag}),
          });
          const json= await response.json();
          console.log(json)
         
          for (let index = 0; index < snotes.length; index++) {
            const element = snotes[index];
            if(element._id===json._id)
            {
                console.log("for loop working")
                element.title=json.title;
                element.description=json.description;
                element.tag=json.tag;
            }
          

            
          }
       setisSpin(false)
        } 
        catch (error) {
            console.log("error in frontend api request to update note"+error)
        }

}

    // function that add a note in snotes array
    const addnote= async (titleC,descriptionC,tagC)=>{
      setisSpin(true)
        console.log("i am from notestate context,"+titleC,descriptionC,tagC)
        //API CALL TO addnote
        try {
        const response = await fetch(`${host}api/notes/addnote`, {
            method: "POST", 
            headers: {
              "Content-Type": "application/json",
              "auth-token":localStorage.getItem("token")
              
            },
            body: JSON.stringify({title:titleC,description:descriptionC,tag:tagC}),
          });
          const json= await response.json();
          console.log("add note response")
          console.log(json)
          //add note in frontend in snotes array that contain all notes of particular user
        //    const note={
        //     "id":json._id,
        //     "user":json.user,
        //     "title":json.title,
        //     "description":json.description,
        //     "tag":json.tag
        // }
        // setsnotes(snotes.concat(note))

          setisSpin(false)

        } catch (error) {
            console.log("error in frontend api requesto add note"+error)
            message.error("internal app error")
        }
    }

// api call to fetch all notes of that user that get login
    const fetchNotes= async()=>{
      setisSpin(true)  
      try{
        const response = await fetch(`${host}api/notes/fetchallnotes`, {
            method: "GET", 
            headers: {
              "Content-Type": "application/json",
              "auth-token":localStorage.getItem("token")
              
            },
          });
          const json= await response.json();
          console.log(json)
          setsnotes(json)
          setisSpin(false)
        } 

        catch (error) {
            console.log("error in frontend api request to fetch all notes"+error)
        }
    }
    // delete note 
    const deleteNote=async(_id)=>{
        //delete note in frontend
        //newnotes is a temporary array that hold notes after filteration
        // const newNotes=snotes.filter((note)=>{return note._id!==_id})
        // setsnotes(newNotes)
        //delete note from backend
        try{
            setisSpin(true)
            console.log("from delete")
            console.log(_id)
            const response = await fetch(`${host}api/notes/deletenote/${_id}`, {
                method: "DELETE", 
                headers: {
                  "Content-Type": "application/json",
                  "auth-token":localStorage.getItem("token")
                  
                },
              });
              const json= await response.json();
            //   console.log(json)
            setisSpin(false)
            } 
            catch (error) {
                console.log("error in frontend api request to delete note"+error)
            }
    }



    
    return(
        <noteContext.Provider value={{snotes,setsnotes,addnote,deleteNote,fetchNotes,showModal,open,setOpen,addmodify_Id,editNote,isSpin,setisSpin}}>
            {props.children}
        </noteContext.Provider>
    )
}


export default NoteState;