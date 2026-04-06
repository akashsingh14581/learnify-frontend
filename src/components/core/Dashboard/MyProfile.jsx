import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import IconBtn from '../../common/iconBtn'

const MyProfile = () => {
  const { user } = useSelector((state) => state.profile);
  const navigate = useNavigate();

  return (
    <div className='text-white w-11/12 max-w-[1000px] mx-auto mt-10 space-y-8'>
      
      <h1 className='text-3xl font-bold'>My Profile</h1>

      {/* Section 1 */}
      <div className='flex justify-between items-center bg-richblack-800 p-6 rounded-xl shadow-md'>
        <div className='flex items-center gap-4'>
          <img 
            src={user?.imageUrl} 
            alt="user-img" 
            className='w-[60px] h-[60px] rounded-full object-cover border-2 border-yellow-50'
          />
          <div>
            <p className='text-lg font-semibold'>
              {user?.firstName + " " + user?.lastName}
            </p>
            <p className='text-sm text-richblack-300'>{user?.email}</p>
          </div>
        </div>

        <IconBtn text="Edit" onclick={() => navigate('/dashboard/settings')} />
      </div>

      {/* Section 2 */}
      <div className='bg-richblack-800 p-6 rounded-xl shadow-md'>
        <div className='flex justify-between items-center mb-3'>
          <p className='text-lg font-semibold'>About</p>
          <IconBtn text="Edit" onclick={() => navigate("/dashboard/settings")} />
        </div>

        <p className='text-richblack-300'>
          {user?.additionalDetails?.about ?? "Write something about yourself"}
        </p>
      </div>

      {/* Section 3 */}
      <div className='bg-richblack-800 p-6 rounded-xl shadow-md'>
        <div className='flex justify-between items-center mb-5'>
          <p className='text-lg font-semibold'>Personal Details</p>
          <IconBtn text="Edit" onclick={() => navigate("/dashboard/settings")} />
        </div>

        <div className='grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-10 text-sm'>
          
          <div>
            <p className='text-richblack-400'>First Name</p>
            <p>{user?.firstName}</p>
          </div>

          <div>
            <p className='text-richblack-400'>Last Name</p>
            <p>{user?.lastName}</p>
          </div>

          <div>
            <p className='text-richblack-400'>Email</p>
            <p>{user?.email}</p>
          </div>

          <div>
            <p className='text-richblack-400'>Gender</p>
            <p>{user?.additionalDetails?.gender}</p>
          </div>

          <div>
            <p className='text-richblack-400'>Phone Number</p>
            <p>{user?.additionalDetails?.contactNumber}</p>
          </div>

          <div>
            <p className='text-richblack-400'>Date Of Birth</p>
            <p>{user?.additionalDetails?.dateOfBirth}</p>
          </div>

        </div>
      </div>

    </div>
  )
}

export default MyProfile