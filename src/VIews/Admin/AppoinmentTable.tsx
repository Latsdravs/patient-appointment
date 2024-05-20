import { useEffect, useState } from 'react';
import {Tooltip, Table, Tag, Modal, Button, Popconfirm, message, TimePicker } from 'antd';
import type { TableProps } from 'antd';
import {DeleteOutlined,FieldTimeOutlined } from '@ant-design/icons'
import type { PopconfirmProps } from 'antd';
import api from '../../ApiManager';

interface appointment {
    id: string;
    date: string;
    time: string;
    doctor: string;
    clinic: string;
    hospital: string;
    status: boolean;
}


// ONEMLI GUNCELLEME!!!!!!!!! RANDEVULAR TIME DEGIL SADECE KARSILIGI "2024-05-04T13:30:45" GIBI BIR IFADE OLAN DATE OBJESI DONECEK. BUNLAR HALA BU SEKIL SAKLANMAYA DEVAM EDIP, YALNIZCA RENDER ASAMASINDA TARIH, SAAT VE DAKIKAYA DONUSTURULECEK!!!!!!


interface props {
    personId: any,
    type: number
}



const AppointmentTable = (props: props) => {

    const [tableData,setTableData] = useState<Array<any>>([]);
    const [id,setId] = useState<string>('');
    const [editLoading,setEditLoading] = useState<boolean>(false);
    
   const fetchAppointments = () => {
     const token = localStorage.getItem('token');
     let url;
     if(props.type == 1) url = 'Admin/DoctorAppointments/'+props.personId
     else url = 'Admin/PatientAppointments/'+props.personId 
        api.get(url,{headers:{ Authorization: `Bearer ${token}`}})
        .then(res => {
            console.log(res.data);
            
            if(res.data.statusCode == 200){
                pushTableData(res.data.data);
            }else{
                setTableData([]);
            }
        })  
   }

   useEffect(() => {
    console.log(props.personId);
    
    fetchAppointments();

   },[props.personId])


   const pushTableData = (arr:Array<any>) => {
        //console.log('girdmi');
        
    const temp: Array<any> = [];

    arr.forEach((appo,index) => temp.push({
        key: index,
        clinic: appo.doctor.clinic.speciality,
        hospital: appo.doctor.clinic.hospital,
        doctor: appo.doctor.firstName + " " + appo.doctor.lastName,
        date: appo.appointmentDateTime.split('T')[0],
        time: appo.appointmentDateTime.split('T')[1].split(':').slice(0, 2).join(':'),
        id: appo.id
    }))

    console.log(temp);
    
    setTableData(temp);
    

}

    

    useEffect(() => {
         fetchAppointments();
    },[]);
    
    
    //Randevu edit baslangic

    

    // randevu silme kismi baslangic

    const confirm = () => {
        const token = localStorage.getItem('token');
        api.patch('Admin/CancelAppointment/'+id,{},{headers: {Authorization: `Bearer ${token}`,}})
        .then(res => {
            console.log(res);
            fetchAppointments();
            message.success('Randevunuz Başarıyla Silinmiştir.');
            
        })
      }

    
      
      


      const cancel: PopconfirmProps['onCancel'] = (e) => {
        console.log('hayira basildi');
       
      };

      // Rndevu silme bitis
    
    const columns: TableProps<any>['columns'] = [
        {
            title: 'Klinik',
            dataIndex: 'clinic',
            key: 'clinic',
        },
        {
            title: 'Hastane',
            dataIndex: 'hospital',
            key: 'hospital',
        },
        {
            title: 'Doktor',
            dataIndex: 'doctor',
            key: 'doctor',
        },
        {
            title: 'Tarih',
            dataIndex: 'date',
            key: 'date',
        },
        {
            title: 'Saat',
            dataIndex: 'time',
            key: 'time',
        },
        {
            title: 'İşlemler',
            dataIndex: 'id',
            key: 'id',
            render: (id) => { if(id == '') return <Tag color='volcano' key={id}>Muayene olundu</Tag>
            else return <div  key={id} className='flex justify-around items-center'>
                <Popconfirm
                key={id}
                title='Randevuyu sil'
                description='Randevunuzu silmek istediğinize emin misiniz?'
                onConfirm={confirm}
                onCancel={cancel}
                onOpenChange={() => setId(id)}
                okText='Sil'
                cancelText='Iptal'
                
                >
                    <Tooltip title='Randevuyu sil'>
                    <Button type='primary' danger shape='circle'  icon={<DeleteOutlined/>} />
                </Tooltip>
                </Popconfirm>
                
            </div>}
        },
    ]
    

   
    
    const timeFormat = 'HH:mm';
    
  return (
    <div>
        <Table dataSource={tableData} columns={columns} />
    </div>
  )
}

export default AppointmentTable