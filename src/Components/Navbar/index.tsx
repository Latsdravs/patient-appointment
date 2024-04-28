import React from 'react'
import {Button} from 'antd'
interface props {
    navbar_text: string;
}
const index = (props: props) => {
  return (
    <div className='w-screen h-14 flex flex-row  px-6 align-center bg-slate-300 shadow-sm'>
        <div className='flex items-center'>
           <span>
            {props.navbar_text}
            </span>
        </div>
        <div className=' ml-auto justify-self-end flex flex-row'>
            <Button className='h-full' type='text'>
                Randevu Al
            </Button>
            <Button className='h-full' type='text'>
                Profilim
            </Button>
            <Button className='h-full' type='text'>
                Çıkış
            </Button>
        </div>
        
    </div>
  )
}

export default index