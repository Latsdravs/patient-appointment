import { Divider } from "antd"
import { useNavigate } from "react-router-dom";
import illustration from '../../assets/patient/Online Doctor-amico.svg'
import { Tabs } from 'antd';
import type { TabsProps } from 'antd';
import PersonalInfo from "./PersonalInfo";
import type { PersonInfo } from "./PersonalInfo";


const DashboardView = () => {

    const navigate = useNavigate();

    const example1:PersonInfo = {
      name: 'alper',
      surname: 'Komurcu',
      password: '12345',
      birth: '24 Subat 2004',
      gender: 'Erkek',
      phone: '5427142402',
      email: 'ALperkomurcu@outlook.com',
      adress: 'Osmaniye Mah. Sehitmehmetcik Sokak Kucuk Apt',
      
    }

    const items: TabsProps['items'] = [
      {
        key: '1',
        label: 'Kişisel bilgilerim',
        children: <PersonalInfo person={example1}/>, //'Kişiler bilgilerimin gösterileceği component gösterilecek'
      },
      {
        key: '2',
        label: 'Randevularım',
        children: 'gecmis, gelecek randevularin gosterilecegi, bunlarin iptal veya duzenlenebilecegi bir component olacak. ayni sekilde randevuyu goruntule dendiginde ekrana modal cikip randevu bilgilerini gosterecek.',
      },
      {
        key: '3',
        label: 'Laboratuvar sonuç ve raporları',
        children: 'laboratuvar sonuçları yer alacak liste seklinde. kaldır butonu, indir butonu ve düzenle butonu yer alacak. yeni bir rapor indirebilecek.',
      },
    ];
    
    
  return (
    <div className="w-full pl-5 pt-8 grid-cols-2 grid gap-4 ">
        
        <div className="col-span-1">
        Hoşgeldiniz, Lorem, ipsum.
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