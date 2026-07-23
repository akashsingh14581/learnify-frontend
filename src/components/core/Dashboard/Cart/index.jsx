import { useSelector } from "react-redux"

import RenderCartCourses from "./RenderCartCourses";
import RenderTotalAmount from "./RenderTotalAmount";



export default function Cart() {

    const {total, totalItems} = useSelector((state)=>state.cart);


    return (
        <div className="text-white">
            <h1 className="mb-6 text-3xl font-medium">Your Cart</h1>
            <p className="pb-4 border-b border-b-richblack-400 text-richblack-300">
                {totalItems} {totalItems === 1 ? "Course" : "Courses"} in Cart
            </p>

            {total > 0
            ? (<div className="flex flex-col-reverse gap-y-10 lg:flex-row lg:items-start justify-between mt-8">
                <RenderCartCourses />
                <RenderTotalAmount />
            </div>)
            : (<p className="mt-14 text-center text-3xl text-richblack-100">Your Cart is Empty</p>)}
        </div>
    )
}