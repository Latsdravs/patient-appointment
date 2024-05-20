import { Button, Input, InputNumber, Modal, Space } from 'antd'
import React, { useState } from 'react'
import {EditOutlined} from '@ant-design/icons'
const PersonalInfo = () => {

    const [open,setOpen] = useState<boolean>(false);
    const user = JSON.parse(localStorage.getItem('userInfo'));
  

  return (
    <div className='grid grid-cols-2 gap-2'>
        <div className=' flex flex-col col-span-2 gap-3'>
            <p>
                Isim Soyisim: {user.firstName + ' ' + user.lastName}
            </p>
            <p>
                Calıştığınız Hastane: {user.clinic.hospital}
            </p>
            <p>
                Uzmanlık Alanınız: {user.clinic.speciality}
            </p>

        </div>
       
    </div>
  )
}

export default PersonalInfo