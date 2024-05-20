import { Divider } from "antd"
import { useNavigate } from "react-router-dom";
import illustration from '../../assets/patient/Online Doctor-amico.svg'
import { Tabs } from 'antd';
import type { TabsProps } from 'antd';
import PersonalInfo from "./PersonalInfo";
import Appointments from "./Appointments";
import Records from "./Records";

const DashboardView = () => {

    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('userInfo'));

    const items: TabsProps['items'] = [
      {
        key: '1',
        label: 'Kişisel bilgilerim',
        children: <PersonalInfo />, //'Kişiler bilgilerimin gösterileceği component gösterilecek'
      },
      {
        key: '2',
        label: 'Randevularım',
        children: <Appointments />,
      },
      {
        key: '3',
        label: 'Laboratuvar sonuç ve raporları',
        children: <Records />, //laboratuvar sonuçları yer alacak liste seklinde. kaldır butonu, indir butonu ve düzenle butonu yer alacak. yeni bir rapor indirebilecek.
      },
    ];
    
    
  return (
    <div className="w-full pl-5 pt-8 grid-cols-2 grid gap-4 ">
        
        <div className="col-span-1">
        Hoşgeldiniz, {user.firstName + ' ' + user.lastName}.
        <Divider />
        <Tabs defaultActiveKey="1" items={items} />
        </div>
        <div className="flex justify-center items-center col-span-1">
        <img src={illustration} className="w-3/4" />
        </div>
        
    </div>
  )
}

export default DashboardView