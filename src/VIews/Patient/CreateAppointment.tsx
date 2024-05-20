import { useState } from 'react'
import Navbar from '../../Components/Navbar'
import Illustration from '../../assets/patient/Appointment.jpg'
import { Select,DatePicker, Divider, Table, Spin, TableProps, Button, Popconfirm, TimePicker, message } from 'antd'
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import api from '../../ApiManager';

dayjs.extend(utc);
dayjs.extend(timezone);

dayjs.extend(customParseFormat);


const CreateAppointment = () => {

    const [hospital,setHospital] = useState<any>();
    const [clinic,setClinic] = useState<any>();
    const [date,setDate] = useState<any>();
    const [showTable,setShowTable]  = useState<boolean>(false);
    const [isSpinning,setIsSpinning] = useState<boolean>(false);
    
    const [tableData,setTableData] = useState<any>([]);
    const [id,setId] = useState<any>();

    const token = localStorage.getItem('token');

    const handleChange = (selectedDate:any, dateString:any) => {
        
        const localISOTime = selectedDate.tz(dayjs.tz.guess()).format();
        
        setDate(dateString);
        console.log(localISOTime, dateString); 
      };


      const handleOk = () => api.patch('Patient/BookAppointment/'+id,{},{headers:{Authorization: `Bearer ${token}`}})
                            .then(res => {
                                console.log(res);
                                if(res.data.statusCode == 200){
                                    message.success('Randevunuz alınmıştır.');
                                    getAppointments();
                                }
                            })
    const createTimePicker = (appointment: any) => {

        const hours:any = [];

        appointment.forEach((appo: any) => {
            const ob = {
                label: appo.hour,
                value: appo.id,
            };
            console.log(ob);
            
            hours.push(ob);
        })

        return <Select style={{ width: 60 }} onChange={(value) => setId(value)} options={hours} />
    }

    

    const columns: TableProps['columns'] = [
        {
            title:'Hastane',
            dataIndex: 'hospital',
            key: 'hospital'
        },
        {
            title: 'Klinik',
            dataIndex: "clinic",
            key: 'clinic',
        },
        {
            title:'Doktor',
            dataIndex:'name',
            key: 'name'
        },
        {
            title: 'Islem',
            dataIndex: "availableAppointments",
            key: 'availableAppointments',
            render: (appointment) =>   <>
                <Popconfirm
                title="Randevu Saatini seciniz."
                description={createTimePicker(appointment)}
                
                onConfirm={handleOk}
                okText='Randevu Al'
                cancelText="Iptal"
                >
                    <Button type='primary' >
                        Randevu Al
                    </Button>
                </Popconfirm>
            </>
        }

    ]

    const groupAppointmentsByDoctor = (appointments:any, targetDate:any) => {
        const result:any = [];
        
        appointments.forEach(appointment => {
          const appointmentDate = new Date(appointment.appointmentDateTime);
          const appointmentDateString = appointmentDate.toISOString().split('T')[0];
          
          if (appointmentDateString === targetDate) {
            const doctorName = `${appointment.doctor.firstName} ${appointment.doctor.lastName}`;
            
            let doctorRecord = result.find(record => record.name === doctorName);
            if (!doctorRecord) {
              doctorRecord = {
                hospital: appointment.doctor.clinic.hospital,
                clinic: appointment.doctor.clinic.speciality,
                name: doctorName,
                appointments: [],
                availableAppointments: []
              };
              result.push(doctorRecord);
            }
            
            const hour = appointmentDate.getHours();
            
            if (appointment.state === 'Unavailable') {
              doctorRecord.appointments.push(hour);
            } else if (appointment.state === 'Available') {
              doctorRecord.availableAppointments.push({
                hour: hour,
                id: appointment.id
              });
            }
          }
        });
        
        return result;
      }

    const getAppointments = () => {
       
        console.log({speciality: clinic, hospital: hospital});
        setIsSpinning(true);
        api.post('Patient/SearchAppointment',{speciality: clinic, hospital: hospital},{headers: {Authorization: `Bearer ${token}` }})
        .then(res => {
            console.log(res.data);
            setIsSpinning(false);
            
            if(res.data.statusCode == 200) {
               // console.log(res.data);
                 
            const groupedAppointments = groupAppointmentsByDoctor(res.data.data, date);
            console.log(groupedAppointments);
            setTableData(groupedAppointments);
            setShowTable(true);
            }else{
                message.error('Randevu Bulunamadı.');
            }
        })
        
    }

  return (
    <div>
         <Navbar type={0}/>
        <div className='grid grid-cols-2 gap-3'>
            <div className='col-span-1'>
                <div className='flex flex-row gap-4 w-full py-8 px-5 ' >
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
                <DatePicker
                  defaultValue={dayjs(new Date())}
                  minDate={dayjs(new Date())}
                  onChange={handleChange}
  />
                <Button type='primary' onClick={() => {getAppointments()}}>
                    Randevu Ara
                </Button>
                </div>
                <Divider />
                {
                   showTable ? <Table columns={columns} dataSource={tableData} />: <div className='h-full w-full flex justify-center pt-10'><Spin tip='Yukleniyor...' spinning={isSpinning}/></div>
                }
            </div>
            <div className='col-span-1 flex items-center justify-center'>
                <img src={Illustration} className=' w-11/12' />
            </div>
        </div>
    </div>
  )
}

export default CreateAppointment