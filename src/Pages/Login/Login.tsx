import React, { useState } from 'react'
import { UserOutlined } from '@ant-design/icons';
import type { FormProps } from 'antd';
import { Button, Input, Space, Form, message  } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone,LockOutlined } from '@ant-design/icons';

interface props {
  redirect: number;
}

type FieldType = {
  tcno?: string;
  password?: string;
}

const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
  console.log(values);
  
}

const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (info) => {
  console.log(info);
  
}

const Login = (props: props) => { // 0 == patient , 1 == doctor , 2 == admin
  const [passwordVisible, setPasswordVisible] = React.useState(false);


  return (
    <div className=' w-screen h-screen  h-screen flex align-middle justify-center'>
        <div className="flex flex-col m-auto gap-4 py-16 px-4 w-1/4 bg-indigo-300 border-b-indigo-500 border-spacing-2 rounded-md shadow-md ">
         <Form
         name='giris'
         onFinish={onFinish}
         onFinishFailed={onFinishFailed}
         >
          <Form.Item<FieldType>
            name="tcno"
            rules={[{required:true, message:'T.C kimlik numaranızı giriniz.' }]}>
        <Input size="large" placeholder="T.C. Kimlik numarası" prefix={<UserOutlined />} />
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