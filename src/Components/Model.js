import React, { useState,useContext } from 'react';
import { Button, Modal, Space,Form, Input,message } from 'antd';
import noteContext from '../context/notes/noteContext';

const Model = (props) => {
//using context in which i have stored state to open modal
const context =useContext(noteContext);
    const {open,setOpen,editNote}=context;


//   const [open, setOpen] = useState(false);
//   const showModal = () => {
//     setOpen(true);
//   };
  const handleOk = () => {
    setOpen(false);
  };
  const handleCancel = () => {
    setOpen(false);
  }; 
  // handle values of inputs that fill in the model 
  const onFinish = (values) => {
    console.log('Submitted values in modal:', values);
    editNote(values.title,values.description,values.tag);
    props.showalert("Note Editted","success" )
    message.success("Note edited successfully!")
  };

  return (
    <>
      <Space>
        {/* <Button type="primary" onClick={showModal}>
          Open Modal
        </Button> */}
      </Space>
      <Modal
        
        open={open}
        title={<h3 style={{ textAlign: 'center',backgroundColor:"#83C5BE",color:"#006D77" }}>Note Customization</h3>}
        onOk={handleOk}
        onCancel={handleCancel}
        className="custom-modal" 
        
       
      >
        <Form
            name="professional-login-form"
            onFinish={onFinish}
            layout="vertical"
            
          >
            <Form.Item
              label="Title"
              name="title"
              rules={[
                { required: true, message: 'Please enter title' },
                { min: 3, message: 'title must be at least 3 characters' },
              ]}
            >
              <Input size="large" placeholder="Enter title" />
            </Form.Item>

            <Form.Item
              label="Description"
              name="description"
              rules={[
                { required: true, message: 'Please enter Description' },
                { min: 6, message: 'Description must be at least 6 characters' },
              ]}
            >
              <Input size="large" placeholder="Enter description" />
            </Form.Item>

            <Form.Item
              label="Tag"
              name="tag"
              rules={[
                { required: true, message: 'Please enter Tag' },
                { min: 3, message: 'Tag must be at least 3 characters' },
              ]}
            >
              <Input size="large" placeholder="Enter tag" />
            </Form.Item>
            <Form.Item>
              <Button type="primary"  htmlType="submit" size="large" style={{ width: '100%',backgroundColor:"#006D77" }}>
                Change
              </Button>
            </Form.Item>
             
          </Form>
      </Modal>
    </>
  );
};
export default Model;