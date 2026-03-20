import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import IconBtn from '../../common/iconBtn'
const MyProfile = () => {
    const {user} = useSelector((state)=> state.profile);
    const navigate = useNavigate();
  return (
    <div>
      <h1>my profile</h1>

      {/* section 1 */}
      <div>
        <div>
          <img src={user?.image} alt="user-img" loading='lazy' className='w-[60px] rounded-full object-cover' />
          <div>
            <p>{user?.firstName + " " + user?.lastName}</p>
            <p>{user?.email}</p>
            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ab ut nemo repellat iste quasi asperiores atque tenetur sint saepe distinctio neque itaque, hic, suscipit praesentium molestias iure consectetur fugiat molestiae minima error expedita? Quidem.</p>
          </div>
        </div>
        <IconBtn text="Edit" onclick={()=>{navigate('/dashboard/settings')}} />
      </div>
    </div>
  )
}

export default MyProfile
