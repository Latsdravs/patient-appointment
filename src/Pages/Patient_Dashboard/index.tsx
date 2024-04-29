import React from 'react'
import Navbar from "../../Components/Navbar"
import DashboardView from '../../VIews/Patient/DashboardView'
const index = () => {
  return (
    <>
    <Navbar navbar_text='Hasta Randevu Sistemi'/>
    <DashboardView />
    </>
  )
}

export default index