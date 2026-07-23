import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import IconBtn from '../../../common/iconBtn';
import { buyCourse } from '../../../../services/operations/courseAPI';

const RenderTotalAmount = () => {

    const {total, cart} = useSelector((state) => state.cart);
    const {token} = useSelector((state) => state.auth);
    const {user} = useSelector((state) => state.profile);
    const dispatch = useDispatch();
    const navigate = useNavigate();


    const handleBuyCourse = () => {
        const courses = cart.map((course) => course._id);
        buyCourse(token, courses, user, navigate, dispatch);
    }
  return (
    <div className="rounded-md border border-richblack-700 bg-richblack-800 p-6 lg:w-[400px]">

        <p className="mb-1 text-sm text-richblack-400">Total:</p>
        <p className="mb-6 text-3xl font-medium text-yellow-100">Rs {total}</p>

        <IconBtn 
            text="Buy Now"
            onclick={handleBuyCourse}
            customClasses={"w-full justify-center"}
        />
        
    </div>
  )
}

export default RenderTotalAmount
