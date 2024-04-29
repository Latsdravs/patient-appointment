import { Button, Input, InputNumber, Space } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import React, { useState } from 'react'
import {EditOutlined } from '@ant-design/icons'
export interface PersonInfo {
    name: string;
    surname: string;
    birth: string;
    gender: string;
    phone: string;
    email: string;
    adress: string;
    password: string;
}
interface props{
    person: PersonInfo;
}


  

const PersonalInfo = (props: props) => {
    const {person} = props;
    const [adress,setAdress] = useState('');
    const [phone,setPhone] = useState('');
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');

    const [edit1,setEdit1] = useState(true);
    const [edit2,setEdit2] = useState(true);
    const [edit3,setEdit3] = useState(true);

    const handle1 = () => {
        if(edit1){
            setEdit1(false);
        }else{
            
        }
    }
    const handle2 = () => {
        if(edit1){
            setEdit2(false);
        }else{
            
        }
    }
    const handle3 = () => {
        if(edit1){
            setEdit3(false);
        }else{
            
        }
    }

  return (
    <div className='grid grid-cols-2 w-full gap-2'>
        <div className="col-span-1 flex gap-3 flex-col">
            <p>
               {`Isim Soyisim: ${person.name} ${person.surname} `} 
            </p>
            <p>
                {`Dogum Tarihi: ${person.birth}`}
            </p>
            <p>
                {`Cinsiyet: ${person.gender}`}
            </p>
            <div className='grid grid-cols-2 gap-2 justify-self-end mt-auto'>
            <Button type='primary' className='col-span-1'>
                Şifre Değiştir
            </Button>
            <Button type='primary'>
                Degisiklikleri Kaydet
            </Button>
            </div>
            <Button type='primary' danger>
                Hesabimi Sil
            </Button>
        </div>
        <div className="col-span-1 flex gap-3 flex-col">
            <p>
                Adres:
            </p>
            <Space.Compact>
                
                <TextArea onChange={(e) => setAdress(e.target.value)} rows={3} maxLength={5} defaultValue={person.adress} disabled={edit1} />
                <Button type='primary' icon={<EditOutlined />} className='h-full w-10' onClick={handle1}></Button>
            </Space.Compact>
            <p>
                Telefon Numarası:
            </p>
            <Space.Compact>
                
                <InputNumber className='w-full' onChange={(e) => setPhone(e.target.value)}  defaultValue={person.phone} disabled={edit2} />
                <Button type='primary' icon={<EditOutlined />} className='h-full w-10' onClick={handle2}></Button>
            </Space.Compact>
            <p>
                E-posta:
            </p>
            <Space.Compact>
                
                <Input className='w-full' onChange={(e) => setEmail(e.target.value)}  defaultValue={person.email} disabled={edit3} />
                <Button type='primary' icon={<EditOutlined />} className='h-full w-10' onClick={handle3}></Button>
            </Space.Compact>
        </div>
    </div>
  )
}

export default PersonalInfo