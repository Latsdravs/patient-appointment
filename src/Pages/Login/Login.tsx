import React, { useState } from 'react'
import ApiManager from '../../ApiManager'
import { UserOutlined } from '@ant-design/icons';
import type { FormProps } from 'antd';
import { Button, Input, Space, Form, message  } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone,LockOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

interface props {
  redirect: number;
}

type FieldType = {
  username?: string;
  password?: string;
}



const Login = (props: props) => { // 0 == patient , 1 == doctor , 2 == admin
  const [passwordVisible, setPasswordVisible] = React.useState(false);
  const navigate = useNavigate();

  const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
    console.log(values);
    
    switch(props.redirect){
      case 0:
        ApiManager.post('Login/Patient',values,{})
        .then(res => {
          //console.log(res);
          if(res.data.statusCode == 200){
          localStorage.setItem('token',res.data.token);
          localStorage.setItem('userInfo',JSON.stringify(res.data.data));
          //console.log(res.data.data);
          navigate('/patient/dashboard')
        }else {
          message.error('Kullanıcı adı veya şifreniz yanlıştır.');
        }
          
        })
        
        break;
      case 1:
        ApiManager.post('Login/Doctor',values,{})
        .then(res => {
          //console.log(res);
          if(res.data.statusCode == 200){
          localStorage.setItem('token',res.data.token);
          localStorage.setItem('userInfo',JSON.stringify(res.data.data));
          //console.log(res.data.data);
          navigate('/doctor/dashboard')
        }else {
          message.error('Kullanıcı adı veya şifreniz yanlıştır.');
        }
          
        })
        break;
        case 2:
          ApiManager.post('Login/Admin',values,{})
        .then(res => {
          console.log(res);
          if(res.data.statusCode == 200){
          localStorage.setItem('token',res.data.token);
          localStorage.setItem('userInfo',JSON.stringify(res.data.data));
          //console.log(res.data.data);
          navigate('/admin/dashboard')
        }else {
          message.error('Kullanıcı adı veya şifreniz yanlıştır.');
        }
          
        })
        break;
          
    }
    
  
  }
  
  const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (info) => {
    console.log(info);
    
  }

  return (
    <div className=' w-screen h-screen  h-screen flex align-middle justify-center'>
        <div className="flex flex-col m-auto gap-4 py-16 px-4 w-1/4 bg-indigo-300 border-b-indigo-500 border-spacing-2 rounded-md shadow-md ">
         <Form
         name='giris'
         onFinish={onFinish}
         onFinishFailed={onFinishFailed}
         >
          <Form.Item<FieldType>
            name="username"
            rules={[{required:true, message:'Kullanıcı Adınızı Giriniz' }]}>
        <Input size="large" placeholder="Kullanıcı Adı" prefix={<UserOutlined />} />
        </Form.Item>
        <Form.Item<FieldType>
          name='password'
          rules={[{required:true, message:"Sifrenizi giriniz."}]}
          >
        <Input.Password
        size='large'
        placeholder="Şifre"
        prefix={<LockOutlined />}
        iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
      />
      </Form.Item>
      <Space />
      <Form.Item>
      <Button type="primary" htmlType='submit'>Giriş yap</Button>
      </Form.Item>
      </Form>
        </div>
    </div>
  )
}

export default Login