import React from 'react'
import Navbar from "../../Components/Navbar"
import DashboardView from '../../VIews/Patient/DashboardView'
const index = () => {
  return (
    <>
    <Navbar type={0}/>
    <DashboardView />
    </>
  )
}

export default index