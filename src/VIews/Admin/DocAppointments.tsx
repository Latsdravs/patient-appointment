import { Button, Modal, Table, TableProps, message } from 'antd'
import React, { useEffect, useState } from 'react'
import api from '../../ApiManager';


interface props {
    personId: any
}

const DocAppointments = (props: props) => {

    const [tableData,setTableData] = useState<any>([]);
    
    const token = localStorage.getItem('token');
    const [id,setId] = useState<any>();
    const [open,setOpen] = useState<boolean>(false);

    const getAppointments = () => {
        
        api.get('Admin/DoctorAppointments/'+props.personId,{headers: {Authorization: `Bearer ${token}`}})
        .then(res => {
            // console.log(res.data.data);
            let arr:Array<any> = [];
            res.data.data.forEach((appo) => {
                if(appo.state == 'Unavailable') {arr.push(appo);  console.log('ekledim');
                }
            })
            
            pushTableData(arr);
            
            
        })
       // console.log(arr);
        
      

    }

    const pushTableData = (arr: any) => {

        const data: any = [];

        arr.forEach((appo) => {
            const ob = {
                patient: appo.patient.firstName + " " + appo.patient.lastName,
                date: appo.appointmentDateTime.split('T')[0],
                time: appo.appointmentDateTime.split('T')[1].split(':').slice(0, 2).join(':'),
                patientId: appo.id
            }
            data.push(ob);
        })

        console.log(data);
        
        setTableData(data);


    }

    useEffect(() => {
        
        getAppointments();
        
        
        
    },[])


    const handleClick = (appoId) => {

        console.log(appoId);
        
        api.patch('Admin/CancelAppointment/'+appoId,{},{headers: {Authorization: `Bearer ${token}`}})
        .then(res => {
            console.log(res);
            if(res.data.statusCode == 200) message.success('Randevu basariyla silinmistir.');
            getAppointments();
        })
        
        
        
    }
  
    const columns: TableProps<any>['columns'] = [
        {
            title:'Hasta Adı Soyadı',
            dataIndex:'patient',
            key:'patient'
        },
        {
            title:'Tarih',
            dataIndex:'date',
            key:'date',
        },
        {
            title:'Saat',
            dataIndex:'time',
            key:'time',
        },
        {
            title:'İşlemler',
            dataIndex:'patientId',
            render: (patientId) => <>
                <Button onClick={e => handleClick(patientId)} type='primary' danger>
                    Randevuyu Sil
                </Button>
            </> 
        }
    ]


  
    return (
    <>
    <Table columns={columns} dataSource={tableData}/>
    <Modal>

    </Modal>
    </>
  )
}

export default DocAppointments