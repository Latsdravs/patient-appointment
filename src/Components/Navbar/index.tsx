import React from 'react'
import {Button} from 'antd'
import type { MenuProps } from 'antd';
import { Dropdown, Space } from 'antd';
import {NotificationOutlined} from '@ant-design/icons'
import { Menu } from 'antd';
import { useNavigate } from 'react-router-dom';
interface props {
    type: number;

}

type MenuItem = Required<MenuProps>['items'][number];



const Delete = () => {
    
}

const index = (props: props) => {

    const navigate = useNavigate();

    const logOut = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userInfo');
        navigate('/');
    }
    
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
               <span onClick={(e) => navigate('#')}>Bildirimlerim</span> 
            ),
            key: 'bildirim',
            children: notifications
        },
        {
            label: (
               <span onClick={(e) => logOut()}>Çıkış Yap</span> 
            ),
            key: 'logout',
            
        },
    ];

    var text  = '';

    switch(props.type){
        case 0:
            text = 'Hasta Randevu Sistemi';

            items.unshift({
                label: (
                   <span onClick={(e) => navigate('/patient/appointment')}>Randevu Al</span> 
                ),
                key: 'randevu',
                
            });
            items.unshift( {
                label: (
                   <span onClick={(e) => navigate('/patient/dashboard')}>Profilim</span> 
                ),
                key: 'profil',
                
            })
            break;

        case 1:
            text = 'Doktor Yönetim Sistemi';
            items.unshift( {
                label: (
                   <span onClick={(e) => navigate('/doctor/dashboard')}>Profilim</span> 
                ),
                key: 'profil',
                
            });
            break;

        case 2:
            text = "Admin Yönetim Sistemi"; 
            items.unshift( {
                label: (
                   <span onClick={(e) => navigate('/admin/dashboard')}>Yönetim Sistemi</span> 
                ),
                key: 'profil',
                
            })
            break;
        }
            

  return (
    <div className='w-screen h-14 flex flex-row  px-6 align-center bg-indigo-300 shadow-sm'>
        <div className='flex items-center'>
           <span >
            {text}
            </span>
        </div>
        <Menu style={{width:'400px'}} className=' justify-self-end ml-auto bg-indigo-300' selectedKey={['profil']} mode="horizontal" items={items} />
        
    </div>
  )
}

export default index