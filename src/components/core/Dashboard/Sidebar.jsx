import React, { useState } from 'react'
import { sidebarLinks } from '../../../data/dashboard-links'
import {useDispatch, useSelector} from "react-redux"
import {useNavigate} from "react-router-dom"
import { logout } from '../../../services/operations/authAPI'
const Sidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [confirmationModal, setConfirmationModal] = useState(null)
  const {user, loading: profileLoading} = useSelector((state)=> state.profile);
  const {loading: authLoading} = useSelector((state)=> state.auth)

      if(authLoading || profileLoading){
        return (
            <div>
                Loading...
            </div>
        )
    }
  return (
    <div className='flex min-w-[222px] flex-col border-r-[1px] border-r-richblack-700 h-[calc(100vh-3.5rem)] bg-richblack-800 py-10'>
      <div className='flex flex-col'>
      {
        sidebarLinks.map((link)=>{
          if(link.type && user?.accountType !== link.type) return null;
          return <sidebarLink key={link.id} link={link} iconName={link.icon} />
        })
      }
      </div>
      <div className='mx-auto mt-6 mb-6 h-[1px] w-10/12 bg-richblack-600'></div>
      <div className='flex flex-col'>
      <sidebarLink link={{link:"Settings" , path:"dashboard/settings"}} iconName="VscSettingGear" />
      <button onClick={()=> {
        setConfirmationModal({text1:"Are You Sure?",
        text2:"You will be logged out from your account",
        btn1Text:"Logout",
        btn2Text:"Cancel",
        btnHandler:()=> dispatch(logout(navigate)),
        btn2Handler: ()=> setConfirmationModal(null)})
      }} className='text-sm text-richblack-300 font-medium'>
        <div className='flex item-center gap-x-2'>
      <VscSignOut className="text-lg"/>
      <span>ogout</span>
        </div>
      </button>
      </div>
      {confirmationModal && <confirmationModal modalData={confirmationModal} />}
    </div>
  )
}

export default Sidebar
