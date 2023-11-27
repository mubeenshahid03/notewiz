import React, {useState, useContext,useEffect } from 'react'
import noteContext from '../context/notes/noteContext'
import Noteitem from './Noteitem'
import { Col, Row } from 'antd'
import Spinner from './Spinner'
function Notes(props) {
const {showalert}=props


    const context=useContext(noteContext)
    const{snotes,setsnotes,fetchNotes,isSpin}=context
  // handle notes appear 1 time after fetch from server
    const [fetched, setFetched] = useState(false);
  //functionality to check snotes array empty .if it is empty show message
  const [isEmpty, setisEmpty] = useState(false)
 
  useEffect(() => {
    if (!fetched) {
      fetchNotes();
      setFetched(true);
    }

  }, [fetched]);

  useEffect(() => {
    // Set isEmpty based on whether snotes is empty or not
    setisEmpty(snotes.length === 0);
  }, [snotes]);

  
    return (

    <>
    <div>
        
    <h2 style={{textAlign:"center",color:"#006D77"}}>Notes</h2>
    {/* //functionality to check snotes array empty .if it is empty show message */}
    <div id='note-empty-message'>
    {isEmpty && <p style={{ color: 'grey',textAlign:"center",fontSize:"small" }}>No note to Display.Please add note! </p>}
    </div>
{/* functionality spinner show only when its value became tru ant it came from notestate */}
{isSpin?
    (<div style={{textAlign:"center",marginBottom:"60px"}}><Spinner  /></div>):(

        <div >
            <Row style={{backgroundColor:"#edf6f9",paddingLeft:"11%"}} >
      {
        snotes.map((note,index)=>{
         return <Col xs={24} sm={12} md={8} lg={8} xxl={8} style={{marginTop:"40px"}} >  <Noteitem showalert={showalert} note={note} key={index}/> </Col>

        })
      }
    </Row>
    <br>
    </br>
    <br>
    </br>
    <br>
    </br>
      </div>
    )
}
      
    </div>
    </>
  )
}

export default Notes