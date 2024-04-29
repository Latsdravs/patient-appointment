import React from 'react'
import {Button} from 'antd'
import type { MenuProps } from 'antd';
import { Dropdown, Space } from 'antd';
import {NotificationOutlined} from '@ant-design/icons'
import { Menu } from 'antd';
import { useNavigate } from 'react-router-dom';
interface props {
    navbar_text: string;
}

type MenuItem = Required<MenuProps>['items'][number];



const Delete = () => {
    
}

const index = (props: props) => {

    const navigate = useNavigate();
    
    const notifications = [
        {
            label: 'Lorem ipsum dolor sit amet consectetur.',
            key: 1,
        },
        {
            label: 'Lorem ipsum dolor sit amet consectetur.',
            key: 2,
        },
        {
            label: 'Lorem ipsum dolor sit amet consectetur.',
            key: 3,
        },
        {
            label: 'Bildirimleri Temizle',
            key: 4,
            danger: true,
            
        }
    ]

    const items: MenuItem[] = [
        {
            label: (
               <span onClick={(e) => navigate('#')}>Randevu Al</span> 
            ),
            key: 'randevu',
            
        },
        {
            label: (
               <span onClick={(e) => navigate('#')}>Profilim</span> 
            ),
            key: 'profil',
            
        },
        {
            label: (
               <span onClick={(e) => navigate('#')}>Bildirimlerim</span> 
            ),
            key: 'bildirim',
            children: notifications
        },
        {
            label: (
               <span onClick={(e) => navigate('#')}>Çıkış Yap</span> 
            ),
            key: 'logout',
            
        },
    ]

  return (
    <div className='w-screen h-14 flex flex-row  px-6 align-center bg-indigo-300 shadow-sm'>
        <div className='flex items-center'>
           <span >
            {props.navbar_text}
            </span>
        </div>
        <Menu style={{width:'400px'}} className=' justify-self-end ml-auto bg-indigo-300' selectedKey={['profil']} mode="horizontal" items={items} />
        
    </div>
  )
}

export default index