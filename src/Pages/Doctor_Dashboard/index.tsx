import Navbar from "../../Components/Navbar"
import DashbordView from '../../VIews/Doctor/DashboardView'
import Illustration from '../../assets/Doctor/Doctor_Dashboard.jpg'
const index = () => {
  return (
    <div>
        <Navbar type={1} />
        <div className=" w-full pl-5 pt-8 grid-cols-2 grid gap-4">
        <div className="col-span-1">
            <DashbordView />
        </div>
        <div className="col-span-1 flex items-center justify-center mt-10">
        <img src={Illustration} className="w-3/4" />
        </div>
        </div>
    </div>
  )
}

export default index