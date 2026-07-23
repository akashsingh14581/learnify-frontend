import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { getPurchaseHistory } from '../../../../services/operations/courseAPI'

export default function PurchaseHistory() {
  const { token } = useSelector((state) => state.auth)
  const [orders, setOrders] = useState(null)

  useEffect(() => {
    ;(async () => {
      const result = await getPurchaseHistory(token)
      setOrders(result)
    })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="text-white">
      <h1 className="mb-8 text-3xl font-medium">Purchase History</h1>

      {!orders ? (
        <div>Loading...</div>
      ) : orders.length === 0 ? (
        <p className="text-richblack-300">You haven't purchased any course yet</p>
      ) : (
        <div className="overflow-x-auto rounded-md border border-richblack-700">
          <table className="w-full">
            <thead>
              <tr className="border-b border-richblack-700 bg-richblack-800 text-left text-sm text-richblack-300">
                <th className="p-4">Course</th>
                <th className="p-4">Instructor</th>
                <th className="p-4">Amount</th>
                <th className="p-4">Payment ID</th>
                <th className="p-4">Date</th>
                <th className="p-4">Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id} className="border-b border-richblack-700 last:border-0">
                  <td className="flex items-center gap-x-3 p-4">
                    <img
                      src={order.course?.thumbnail}
                      alt={order.course?.courseName}
                      className="h-12 w-16 rounded object-cover"
                    />
                    {order.course ? (
                      <Link
                        to={`/courses/${order.course._id}`}
                        className="line-clamp-2 hover:text-yellow-50"
                      >
                        {order.course.courseName}
                      </Link>
                    ) : (
                      <span className="text-richblack-400">Course removed</span>
                    )}
                  </td>
                  <td className="p-4 text-richblack-200">
                    {order.course?.instructor?.firstName} {order.course?.instructor?.lastName}
                  </td>
                  <td className="p-4">Rs. {order.amount}</td>
                  <td className="p-4 text-xs text-richblack-400">{order.razorpayPaymentId}</td>
                  <td className="p-4 text-richblack-200">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>
                  <td className="p-4">
                    <span
                      className={`rounded-full px-3 py-1 text-xs ${
                        order.status === "Success"
                          ? "bg-caribbeangreen-800 text-caribbeangreen-100"
                          : "bg-pink-800 text-pink-100"
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
