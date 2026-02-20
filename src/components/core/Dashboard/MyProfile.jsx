import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
const MyProfile = () => {
    const {user} = useSelector((state)=> state.profile);
    const navigate = useNavigate();
  return (
    <div>
      
    </div>
  )
}

export default MyProfile
