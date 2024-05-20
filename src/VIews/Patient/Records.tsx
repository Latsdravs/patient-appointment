import { Modal, Table, TableProps } from 'antd'
import React, { useState } from 'react'
import {PlusCircleOutlined, DownloadOutlined, DeleteOutlined} from '@ant-design/icons'


const Records = () => {

    const [isVisible,setIsVisible] = useState<boolean>(false);
    const [confirmLoading,setConfirmLoading] = useState<boolean>(false);


    const downloadFile = (id: string) => {

    }

    const deleteFile = (id: string) => {

    }

    const handleOk = () => {
        setIsVisible(false);
    }

    const cols: TableProps<any>['columns'] = [
        {
            title: 'Dosya Adı',
            dataIndex: 'name',
            key: 'name'
        },
        {
            title: 'Tarih',
            dataIndex: 'date',
            key: 'date',
        },
        {
            title: () => <div className='flex items-center justify-center'><PlusCircleOutlined  onClick={(e) => {setIsVisible(true)}}/></div>,
            dataIndex: 'id',
            key: 'id',
            render: (id) => <div className='flex flex-row justify-center gap-1 items-center'>
                <DownloadOutlined onClick={(e) => {downloadFile(id)}}/>
                <DeleteOutlined onClick={(e) => {deleteFile(id)}} />
            </div>
        }
    ] 


    const data:any = [];

    return (
    <div>
        <Table dataSource={data} columns={cols} />
        <Modal
        open={isVisible}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={() => setIsVisible(false)}
        >

        </Modal>
    </div>
  )
}

export default Records