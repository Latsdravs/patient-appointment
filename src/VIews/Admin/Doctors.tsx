import { Button, Input, Modal, Select, Table, message } from 'antd'
import React, { useEffect, useState } from 'react'
import type { TableProps } from 'antd';
import type { DatePickerProps } from 'antd';
import { DatePicker, Space } from 'antd';
import api from '../../ApiManager';
import { Tabs, TabsProps } from 'antd'
import AppointmentTable from './AppoinmentTable';
import DocAppointments from './DocAppointments';

const Doctors = () => {

    const [patient,setPatient] = useState<any>({
        userInfo: {
            username: 'username',
            password: 'password'
        },
        firstName: 'firstName',
        lastName: 'lastName',
        id: -1,
       clinic: {
        speciality: 'clinic',
        hospital: 'hospital'
       }
    });
    const [tableData,setTableData] = useState<any>();
    const [infoModal,setInfoModal] = useState<boolean>(false);
    const [createModal,setCreateModal] =useState<boolean>(false);
    const [username,setUsername] = useState<string>('');
    const [password,setPassword] = useState<string>('');
    const [firstName,setFirstName] = useState<string>('');
    const [lastName,setLastName] = useState<string>('');
    const [hospital,setHospital] = useState<any>();
    const [clinic,setClinic] = useState<any>();
    const [personId,setPersonId] = useState<any>('');
    
    const items: TabsProps['items'] = [
        {
          key: '1',
          label: 'Hastanin Bilgileri',
          children: <>
               <p>Isim Soyisim: {patient.firstName + " " + patient.lastName}</p>
            <p>
                Klinik: {patient.clinic.speciality}
            </p>
            <p>
                Hastane: {patient.clinic.hospital}
            </p>
          </>,
        },
        {
          key: '2',
          label: 'Randevular',
          children: <DocAppointments personId={personId} />,
        }
      ];
    
    
    const token = localStorage.getItem('token');

    const getPatients = () => {
        api.get('Admin/GetDoctor',{headers:{ Authorization: `Bearer ${token}`} })
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
           clinic: {
            speciality: clinic,
            hospital: hospital
           }
        }

        api.post('Register/Doctor',data)
        .then(res => {
            console.log(res);
            if(res.data.statusCode == 200)
                message.success("Doktor Basariyla Olusturuldu.");
            getPatients();
            setCreateModal(false);
        })


    }

    const deletePatient = (id: string) => {
        api.delete('Admin/DeleteDoctor/'+id,{headers: {Authorization: `Bearer ${token}`}})
        .then(res => {
            console.log(res);
            if(res.data.statusCode == 200)
                message.success("Doktor basariyla silindi.");
            else message.error('Randevusu olduğu için bu doktoru silemezsiniz.');
            getPatients();
            
        })
    }

    const columns : TableProps<any>['columns'] = [
        {
            title: 'Doktor Adı Soyadı',
            dataIndex: 'name',
            key: 'name'
        },
        {
            title: () => <Button onClick={e => {setCreateModal(true)}} >Doktor Ekle</Button>,
            dataIndex: 'user',
            key: 'user',
            render: (user) => <>
                <Button onClick={e => {setPatient(user); setPersonId(user.id)}}type='primary'>
                    Doktoru Goruntule
                </Button>
                <Button onClick={e => {deletePatient(user.id)}} type='primary' danger > Doktoru Sil</Button>
            </>
        }
    ]

    useEffect(() => {if(patient.firstName != 'firstName')setInfoModal(true) },[patient])
    

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
            <Select
                defaultValue='Hastane'
                onChange={(value) => {setHospital(value)}}
                options={[{value:'Kocaeli Devlet Hastanesi', label:'Kocaeli Devlet Hastanesi'},{value:"Hacettepe Hastanesi", label:"Hacettepe Hastanesi"},{value:"Umuttepe Hastanesi", label:"Umuttepe Hastanesi"},{value:"TepeTepe Hastanesi", label:"TepeTepe Hastanesi"},{value:"Şıkır Şıkır Hastanesi", label:"Şıkır Şıkır Hastanesi"}]}
                
                />
                <Select
                defaultValue='Klinik'
                onChange={(value) => {setClinic(value)}}
                options={[{value:"Kardiyoloji", label:"Kardiyoloji"},{value:"Kulak, Burun ve Boğaz", label:"Kulak, Burun ve Boğaz"},{value:"Dahiliye", label:"Dahiliye"},{value:"Genel Cerrahi", label:"Genel Cerrahi"},{value:"Nöroloji", label:"Nöroloji"},{value:"Radyoloji", label:"Radyoloji"}]}
                
                />
        </Modal>
        <Modal
        className='flex flex-row p-5 gap-4'
        title="Doktor Bilgileri"
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

export default Doctors