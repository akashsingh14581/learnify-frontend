import React from 'react'
import { sidebarLinks } from '../../../data/dashboard-links'
import { logout } from '../../../services/operations/authAPI'
const Sidebar = () => {
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
    </div>
  )
}

export default Sidebar
