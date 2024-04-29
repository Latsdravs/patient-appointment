import React from 'react'
import {Button} from 'antd'
import {CalendarOutlined, ContactsOutlined,ToolOutlined} from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
const index = () => {
    const navigate = useNavigate();

  return (
    <div className=' w-screen h-screen flex flex-col gap-4  bg-slate-100 h-screen flex items-center justify-center'>
        <Button type='primary' icon={<CalendarOutlined />} onClick={()=> navigate("/patient/login")}>
            Hasta Randevu Sistemi'ne Giriş
        </Button>
        <Button type='primary' icon={<ContactsOutlined />} onClick={()=> navigate("/doctor/login")}>
            Doktor Bilgi Sistemi'ne Giriş
        </Button>
        <Button type='primary' icon={<ToolOutlined />} onClick={()=> navigate("/admin/login")}>
            Yönetici Sistemi'ne Giriş
        </Button>
    </div>
  )
}

export default index