import { Divider, Tabs, TabsProps } from 'antd'
import React from 'react'
import PersonalInfo from './PersonalInfo';
import Appointments from './Appointments';
const DashboardView = () => {

  const user = JSON.parse(localStorage.getItem('userInfo'));



    const items: TabsProps['items'] = [
        {
          key: '1',
          label: 'Kişisel bilgilerim',
          children: <PersonalInfo />, //'Kişiler bilgilerimin gösterileceği component gösterilecek'
        },
        {
          key: '2',
          label: 'Hasta ve Randevularım',
          children: <Appointments />,
        }
      ];
  

    return (
    <div>
        <p>Hoşgeldiniz, {user.firstName + ' ' + user.lastName}.</p>
        <Divider />
        <Tabs defaultActiveKey='1' items={items} />
    </div>
  )
}

export default DashboardView