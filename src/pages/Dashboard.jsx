import React from 'react'
import { useSelector } from "react-redux"
import { Outlet } from 'react-router-dom'
import Sidebar from '../components/core/Dashboard/Sidebar'

const Dashboard = () => {
    const { loading: authLoading } = useSelector((state) => state.auth)
    const { loading: profileLoading } = useSelector((state) => state.profile)

    if (authLoading || profileLoading) {
        return <div>Loading...</div>
    }

    return (
        <div className='relative flex min-h-[calc(100vh-3.5rem)]'>  {/* 🔥 typo fix: min-h- */}
            <Sidebar />
            <div className='h-[calc(100vh-3.5rem)] overflow-auto w-full'>  {/* 🔥 w-screen → w-full */}
                <div className='mx-auto w-11/12 py-10 lg:pt-10 pt-16'>  {/* 🔥 pt-16 mobile pe hamburger ke liye */}
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default Dashboard