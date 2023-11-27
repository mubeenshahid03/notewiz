import React,{ useContext } from 'react';
import { Form, Input, Button, Card, Row, Col ,Divider,message } from 'antd';
import { Link } from 'react-router-dom';
import noteContext from '../context/notes/noteContext';
import {useNavigate} from 'react-router-dom'
import host from '../config';


function Registeration(props) {
    const context =useContext(noteContext);
    const navigate=useNavigate()    
    // const {registerationUser}=context;

    const onFinish = async (values) => {
        console.log('Submitted values:', values);
        // console.log(values.username)
        // registerationUser(values.username,values.email,values.password)
        try {
            const response = await fetch(`${host}api/auth/createuser`, {
                method: "POST", 
                headers: {
                  "Content-Type": "application/json"    
                },
                body: JSON.stringify({name:values.username,email:values.email,password:values.password}),
              });
              const json= await response.json();
              console.log(json)
              //now we write a logic if user registered successsfully he is redirect to home page('/')
            if(json.Success){
                // save the auth token and set token in localstorage
                props.showalert("Registered successfully","success")
                localStorage.setItem("token",json.authtoken)
                navigate('/')
                message.success("Login Successfully")
            }
            else{
              props.showalert("Invalid Credentials","error")
              message.error("Invalid Credentials")

            }
            
            } catch (error) {
                console.log("error in frontend api requesto Register user"+error)
            }

      };
  
  return (
    <>
    <Row justify="center" align="middle" style={{ height: '100vh' }}>
      <Col xs={24} sm={20} md={16} lg={12} xl={8}>
        <Card bordered={false} style={{ width: '100%',marginLeft:'10px',backgroundColor:"#83C5BE" }}>
          <h1 style={{textAlign:"center",paddingBottom:"30px",color:"#006D77"}}>Register </h1>
          <Form
            name="professional-login-form"
            onFinish={onFinish}
            layout="vertical"
          >
            <Form.Item
              label="Username"
              name="username"
              rules={[
                { required: true, message: 'Please enter your username' },
                { min: 4, message: 'Username must be at least 4 characters' },
              ]}
            >
              <Input size="large" placeholder="Enter your username" />
            </Form.Item>

            <Form.Item
              label="Email"
              name="email"
              rules={[
                { required: true, message: 'Please enter your email' },
                { min: 6, message: 'email must be at least 6 characters' },
              ]}
            >
              <Input size="large" placeholder="Enter your email" />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                { required: true, message: 'Please enter your password' },
                { min: 6, message: 'Password must be at least 6 characters' },
              ]}
            >
              <Input.Password size="large" placeholder="Enter your password" />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" size="large" style={{ width: '100%',backgroundColor:"#006D77" }}>
                Get Registered
              </Button>
            </Form.Item>
            {/* Divider and Register Link */}
            <Divider>or</Divider>
            <div className="register-link">
              Already have an account? <Link to="/login" style={{color:"#006D77"}} >Login now!</Link>
            </div>
          </Form>
        </Card>
      </Col>
    </Row>
    </>
  )
}

export default Registeration