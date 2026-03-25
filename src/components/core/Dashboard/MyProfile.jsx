import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import IconBtn from '../../common/iconBtn'
const MyProfile = () => {
    const {user} = useSelector((state)=> state.profile);
    const navigate = useNavigate();
  return (
    <div className='text-white'>
      <h1>my profile</h1>

      {/* section 1 */}
      <div>
        <div>
          <img src={user?.imageUrl} alt="user-img" loading='lazy' className='w-[60px] rounded-full object-cover' />
          <div>
            <p>{user?.firstName + " " + user?.lastName}</p>
            <p>{user?.email}</p>
            
          </div>
        </div>
        <IconBtn text="Edit" onclick={()=>{navigate('/dashboard/settings')}} />
      </div>

      {/* section 2 */}
      <div>
        <div>
          <p>About</p>
          <IconBtn text="Edit" onclick={()=> navigate("/dashboard/settings")} />
        </div>
        <p>{user?.additionalDetails?.about ?? "write something about yourself"}</p>
      </div>

          {/* section 3 */}
      <div>
        <div>
          <p>Personal Details</p>
          <IconBtn text="Edit" onclick={()=> navigate("/dashboard/settings")} />
        </div>
        <div>
          First Name:
          <p>{user?.firstName}</p>
        </div>
          <div>
          Last Name:
          <p>{user?.lastName}</p>
        </div>
          <div>
          Email:
          <p>{user?.email}</p>
        </div>
          <div>
          Gender:
          <p>{user?.additionalDetails?.gender}</p>
        </div>
        
             <div>
          Phone no:
          <p>{user?.additionalDetails?.contactNumber}</p>
        </div>
              <div>
          Date Of Birth:
          <p>{user?.additionalDetails?.dateOfBirth}</p>
        </div>
      </div>
    </div>
  )
}

export default MyProfile
