import React from 'react'
import { UserOutlined } from '@ant-design/icons';
import { Button, Input, Space  } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone,LockOutlined } from '@ant-design/icons';

interface props {
  redirect: number;
}

const Login = (props: props) => { // 0 == patient , 1 == doctor , 2 == admin
  const [passwordVisible, setPasswordVisible] = React.useState(false);
  
  
  return (
    <div className=' w-screen h-screen  h-screen flex align-middle justify-center'>
        <div className="flex flex-col m-auto gap-4 py-16 px-4 w-1/4 bg-indigo-300 border-b-indigo-500 border-spacing-2 rounded-md shadow-md ">
        <Input size="large" placeholder="T.C. Kimlik numarası" prefix={<UserOutlined />} />
        <Input.Password
        size='large'
        placeholder="Şifre"
        prefix={<LockOutlined />}
        iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
      />
      <Space />
      <Button type="primary">Giriş yap</Button>
        </div>
    </div>
  )
}

export default Login