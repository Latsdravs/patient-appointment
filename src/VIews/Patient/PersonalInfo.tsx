import { Button, Input, InputNumber, Modal, Popconfirm, Space, message } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import React, { useState } from 'react'
import {EditOutlined } from '@ant-design/icons'
import api from '../../ApiManager';

  

const PersonalInfo = () => {
    const person:any = JSON.parse(localStorage.getItem('userInfo'));
    const token = localStorage.getItem('token');

    const [adress,setAdress] = useState<string | undefined>(person.info.address);
    const [phone,setPhone] = useState<string | undefined>(person.info.phone);
    const [oldPassword,setOldPassword] = useState<string | undefined>('');
    const [password,setPassword] = useState<string>('');

    const [edit1,setEdit1] = useState(true);
    const [edit2,setEdit2] = useState(true);

    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);


    const [modalOpen,setModalOpen] = useState(false);
    const [changeLoading,setChangeLoading] = useState(false);


    const onOk = () => {
        setChangeLoading(true);
       
        api.patch('Patient/UpdatePassword',{username: oldPassword, password: password}, {headers: {
            Authorization: `Bearer ${token}`
        }})
        .then(res => {
            console.log(res);
            message.success("Şifreniz başarıyla değiştirildi.");

            
        })
        .finally(() => {
            setChangeLoading(false);
            setModalOpen(false);
            setPassword('');
            setOldPassword('');
        })
    }

    const handleOk = () => {
    setConfirmLoading(true);

    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
    }, 2000);
  };

  const handleCancel = () => {
    console.log('Clicked cancel button');
    setOpen(false);
  };

  
  
    

    const handle1 = () => {
        if(edit1){
            setEdit1(false);
        }else{
            
        }
    }
    const handle2 = () => {
        if(edit2){
            setEdit2(false);
            
        }else{
            
        }
    }

    const saveChanges = () => {

       console.log(adress,phone);
        


        api.patch('Patient/UpdateInfo',{
              address: adress,
              phone: phone
          }, {headers: {
            Authorization: `Bearer ${token}`
        }})
        .then(res => {
            console.log(res);
            message.success('Degisiklikler basariyla kaydedildi.');
             localStorage.setItem('userInfo',JSON.stringify({...JSON.parse(localStorage.getItem('userInfo')), info: {address: adress, phone: phone} }));
            
        })
    }
  

  return (
    <div className='grid grid-cols-2 w-full gap-2'>
        <div className="col-span-1 flex gap-3 flex-col">
            <p>
               {`Isim Soyisim: ${person.firstName} ${person.lastName} `} 
            </p>
            <p>
                {`Dogum Tarihi: ${new Date(person.birthDay).toLocaleDateString()}`}
            </p>
            <p>
                {`Cinsiyet: ${person.gender}`}
            </p>
            <div className='grid grid-cols-2 gap-2 justify-self-end mt-auto'>
            <Button type='primary' onClick={e => setModalOpen(true)} className='col-span-1'>
                Şifre Değiştir
            </Button>
            <Button type='primary' onClick={e => saveChanges()}>
                Degisiklikleri Kaydet
            </Button>
            </div>
            <Popconfirm
            title='Hesabımı Sil'
            description="Hesabınızı silmek istediğinize emin misiniz?"
            open={open}
            onConfirm={handleOk}
            okButtonProps={{loading: confirmLoading}}
            onCancel={handleCancel}
            >
            <Button type='primary' onClick={(e) => {setOpen(true)}} danger>
                Hesabimi Sil
            </Button>
            </Popconfirm>
        </div>
        <div className="col-span-1 flex gap-3 flex-col">
            <p>
                Adres:
            </p>
            <Space.Compact>
                
                <TextArea onChange={(e) => setAdress(e.target.value)}
                 rows={3}  defaultValue={person.info.address} disabled={edit1} />
                <Button type='primary' icon={<EditOutlined />} className='h-full w-10' onClick={handle1}></Button>
            </Space.Compact>
            <p>
                Telefon Numarası:
            </p>
            <Space.Compact>
                
                <InputNumber className='w-full' onChange={(e) => {setPhone(Number(e).toString());}}  defaultValue={person.info.phone} disabled={edit2} />
                <Button type='primary' icon={<EditOutlined />} className='h-full w-10' onClick={handle2}></Button>
            </Space.Compact>
           
        </div>
        <Modal
        centered
        open={modalOpen}
        onOk={onOk}
        okText="Kaydet"
        cancelText="Iptal"
        className=' max-w-96 flex flex-col gap-3 '
        onCancel={() => setModalOpen(false)}
        >
            <Input.Password size='small' placeholder='Eski şifreniz' onChange={value => setOldPassword(value.target.value)} />
            <Input.Password size='small' placeholder='Yeni şifreniz' onChange={value => setPassword(value.target.value)} />
        </Modal>
    </div>
  )
}

export default PersonalInfo