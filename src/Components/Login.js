import React,{ useContext } from 'react';
import { Form, Input, Button, Card, Row, Col ,Divider,message } from 'antd';
import { Link } from 'react-router-dom';
import noteContext from '../context/notes/noteContext';
import { useNavigate } from "react-router-dom";
import host from '../config';


const ProfessionalLoginForm = (props) => {
     const navigate=useNavigate()
    const context =useContext(noteContext);
    // const {loginUser}=context;

    const onFinish = async (values) => {
    console.log('Submitted values in login:', values);
    // loginUser(values.email,values.password)
    //API request for userLogin
  
        console.log("console from loginUser to check function")
        try {
            const response = await fetch(`${host}api/auth/login`, {
                method: "POST", 
                headers: {
                  "Content-Type": "application/json",    
                },
                body: JSON.stringify({email:values.email,password:values.password}),
              });
              const json= await response.json();
              console.log( json)
              if(json.Success){
                //save token in local storage and redirect to home page
                // alert("User Registered Successfully")
                props.showalert("login successfully","success")
               
                localStorage.setItem("token",json.authtoken)
                navigate('/')
                message.success("Login Successfully")
              }
              else{
                // alert("Invalid Credential")
                message.error("Invalid Credentials")
                props.showalert("Invalid Credentials","error")
              }
            } catch (error) {
                console.log("error in frontend api requesto Login user"+error)
            }
    
  };

  return (
    <>
    {/* we use second method of validation instead of yup */}
    <Row justify="center" align="middle" style={{ height: '100vh' }}>
      <Col xs={24} sm={20} md={16} lg={12} xl={8}>
        <Card bordered={false} style={{ width: '100%',marginLeft:'10px',backgroundColor:"#83C5BE" }}>
          <h1 style={{textAlign:"center",paddingBottom:"30px",color:"#006D77"}}>Login </h1>
          <Form
            name="professional-login-form"
            onFinish={onFinish}
            layout="vertical"
            
          >
            <Form.Item
              label="Email"
              name="email"
              rules={[
                { required: true, message: 'Please enter your email' },
                { min: 6, message: 'email must be at least 6 characters' },
              ]}
            >
              <Input size="large" placeholder="Enter your username" />
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
              <Button type="primary" htmlType="submit" size="large" style={{ width: '100%', backgroundColor:"#006D77" }}>
                Login
              </Button>
            </Form.Item>
             {/* Divider and Register Link */}
             <Divider>or</Divider>
            <div className="register-link" >
              Don't have an account? <Link to="/register" style={{color:"#006D77"}}>Register now!</Link>
            </div>
          </Form>
        </Card>
      </Col>
    </Row>
    </>
  );
};

export default ProfessionalLoginForm;
