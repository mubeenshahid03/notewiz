import React, { useContext } from 'react'
import { EditOutlined, EllipsisOutlined, DeleteOutlined,UserOutlined } from '@ant-design/icons';
import { Avatar, Card, Col, Row ,message} from 'antd';
import noteContext from '../context/notes/noteContext';
const { Meta } = Card;

function Noteitem(props) {
    const context =useContext(noteContext);
    const {deleteNote,showModal,addmodify_Id,snotes,fetchNotes}=context;

    const deletetheNote= async()=>{
      console.log("main error")  
      console.log(props.note._id)
      console.log(snotes)
       await deleteNote(props.note._id)
       await fetchNotes();
       message.warning('Note has been deleted!');
        props.showalert("Note Deleted successfully","warning")
    }
    const handleeditclick=async(e)=>{
     
      showModal(true)
      console.log(props.note._id);
     await addmodify_Id(props.note._id);
     await fetchNotes();
     
      
      console.log("edited")
    }

  return (
    <>
    <div>
        
    <Card
    
    style={{width:300}}
    className='note-items'
    actions={[
      <DeleteOutlined key="delete" style={{color:"#006D77"}} onClick={deletetheNote}/>,
      <EditOutlined key="edit" style={{color:"#006D77"}} onClick={handleeditclick}/>,
      <EllipsisOutlined style={{color:"#006D77"}} key="ellipsis" />,
    ]}
  >
    
    <Meta
      avatar={
      <Avatar
        
        style={{
          backgroundColor: '#006d77',
        }}
        icon={<UserOutlined />}
      />
    }
      title={`${props.note.title} (${props.note.tag})`}
      description={props.note.description}
    />


  </Card>
  
  </div>
    </>
  )
}

export default Noteitem