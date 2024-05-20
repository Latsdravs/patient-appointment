import { Button, Input, Modal, Select, Table, message } from 'antd'
import React, { useEffect, useState } from 'react'
import type { TableProps } from 'antd';
import type { DatePickerProps } from 'antd';
import { DatePicker, Space } from 'antd';
import api from '../../ApiManager';
import { Tabs, TabsProps } from 'antd'
import AppointmentTable from './AppoinmentTable';

const Patients = () => {

    const [patient,setPatient] = useState<any>({
        userInfo: {
            username: '',
            password: ''
        },
        firstName: '',
        lastName: '',
        id: -1,
        gender: '',
        birthDay: '',
        info: {
            address: '',
            phone: '',
        }
    });
    const [tableData,setTableData] = useState<any>();
    const [infoModal,setInfoModal] = useState<boolean>(false);
    const [createModal,setCreateModal] =useState<boolean>(false);
    const [username,setUsername] = useState<string>('');
    const [password,setPassword] = useState<string>('');
    const [firstName,setFirstName] = useState<string>('');
    const [lastName,setLastName] = useState<string>('');
    const [gender,setGender] = useState<string>('');
    const [birthDay,setBirthDay] = useState<string>('');
    const [address,setAddress] = useState<string>('');
    const [phone,setPhone] = useState<string>('');
    const [personId,setPersonId] = useState<any>('');

    const items: TabsProps['items'] = [
        {
          key: '1',
          label: 'Hastanin Bilgileri',
          children: <>
              <p>Isim Soyisim: {patient.firstName + " " + patient.lastName}</p>
              <p>Cinsiyet: {patient.gender}</p>
              <p>Adres: {patient.info.address}</p>
              <p>Telefon Numarasi: {patient.info.phone}</p>
          </>,
        },
        {
          key: '2',
          label: 'Randevular',
          children: <AppointmentTable type={0} personId={personId} />,
        }
      ];
    

    const onChange: DatePickerProps['onChange'] = (date, dateString) => {
        setBirthDay(date.toJSON());
      };

    const token = localStorage.getItem('token');

    const getPatients = () => {
        api.get('Admin/GetPatient',{headers:{ Authorization: `Bearer ${token}`} })
        .then(res => {
            console.log(res);
            const arr:any = [];
            res.data.data.forEach((patient) => {
                const ob = {
                    name: patient.firstName + " " + patient.lastName,
                    user: patient
                }
                arr.push(ob);
            })

            setTableData(arr);
        })
    }

    useEffect(() => {
        getPatients();
    },[])

    const createPatient = () => {
        
        const data:any = {
            userInfo: {
                username: username,
                password: password
            },
            firstName: firstName,
            lastName: lastName,
            id: -1,
            gender: gender,
            birthDay: birthDay,
            info: {
                address: address,
                phone: phone,
            }
        }

        api.post('Register/Patient',data)
        .then(res => {
            console.log(res);
            if(res.data.statusCode == 200)
                message.success("Hasta Basariyla Olusturuldu.");
            setCreateModal(false);
        })


    }

    const deletePatient = (id: string) => {
        api.delete('Admin/DeletePatient/'+id,{headers: {Authorization: `Bearer ${token}`}})
        .then(res => {
            console.log(res);
            if(res.data.statusCode == 200)
                message.success("Hasta basariyla silindi.");
            getPatients();
            
        })
    }

    const columns : TableProps<any>['columns'] = [
        {
            title: 'Hasta Adı Soyadı',
            dataIndex: 'name',
            key: 'name'
        },
        {
            title: () => <Button onClick={e => {setCreateModal(true)}} >Hasta Ekle</Button>,
            dataIndex: 'user',
            key: 'user',
            render: (user) => <>
                <Button onClick={e => { setPatient(user); setPersonId(user.id)}}type='primary'>
                    Hastayi Goruntule
                </Button>
                <Button onClick={e => {deletePatient(user.id)}} type='primary' danger > Hastayi Sil</Button>
            </>
        }
    ]

    useEffect(() => {
        if(patient.firstName !== ''){setInfoModal(true);}
        
    },[patient])

    

  return (
    <div>
        <Table columns={columns} dataSource={tableData}/>
        <Modal
        className='flex flex-row p-5 gap-4'
        title="Hasta Olustur"
        open={createModal}
        onOk={createPatient}
        cancelText="Iptal"
        okText="Olustur"
        onCancel={() => setCreateModal(false)}
        >
             <Input placeholder='Kullanici Adi' onChange={(e) => setUsername(e.target.value)} />
             <Input placeholder='Sifre' onChange={(e) => setPassword(e.target.value)} />
            <Input placeholder='Isim' onChange={(e) => setFirstName(e.target.value)} />
            <Input placeholder='Soyisim' onChange={(e) => setLastName(e.target.value)} />
            <DatePicker onChange={onChange} />
            <Select options={[{label:'Erkek', value:'0'},{label:"Kadin", value:"1"}]} onChange={(value) => setGender(value)} />
            <Input placeholder='Adres' onChange={(e) => setAddress(e.target.value)} />
            <Input placeholder='Telefon Numarasi' onChange={(e) => setPhone(e.target.value)} />

        </Modal>
        <Modal
className='flex flex-row p-5 gap-4'
title="Hasta Bilgileri"
open={infoModal}
onOk={() => setInfoModal(false)}
onCancel={() => setInfoModal(false)}
okText="Tamam"
cancelText="Iptal"

        >
            <Tabs items={items} defaultActiveKey='1' />
        </Modal>
        
    </div>
  )
}

export default Patients