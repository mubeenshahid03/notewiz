import React from 'react';
import { Alert, Space } from 'antd';
const Alertbanner = (props) => (
  <Space
    direction="vertical"
    className='alert-banner'
  >
   {props.alert && <Alert message={props.alert.msg} type={props.alert.type} showIcon />
    }
    
    
  </Space>
);
export default Alertbanner;