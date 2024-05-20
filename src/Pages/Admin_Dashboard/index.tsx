import React from 'react'
import Navbar from '../../Components/Navbar'
import Illustration from '../../assets/Admin/Dashboard.jpg'
import Patients from '../../VIews/Admin/Patients'
import Doctors from '../../VIews/Admin/Doctors'
import { Tabs, TabsProps } from 'antd'


const index = () => {


  const items: TabsProps['items'] = [
    {
      key: '1',
      label: 'Hastalar',
      children: <Patients />,
    },
    {
      key: '2',
      label: 'Doktorlar',
      children: <Doctors />,
    }
  ];

  return (
    <div>
        <Navbar type={2} />
        <div className='grid grid-cols-2 gap-2 w-full'>
            <div className='col-span-1 m-6'>
            <Tabs defaultActiveKey='1' items={items} /> 
            </div>
            <div className='col-span-1 flex items-center justify-center'>
                <img src={Illustration} className='w-3/4 pt-10' />
            </div>
        </div>
    </div>
  )
}

export default index