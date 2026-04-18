import React, { useState } from 'react'
import { sidebarLinks } from '../../../data/dashboard-links'
import { logout } from "../../../services/operations/authAPI"
import { useDispatch, useSelector } from 'react-redux'
import SidebarLink from './SidebarLink'
import { useNavigate } from 'react-router-dom'
import { VscSignOut } from "react-icons/vsc"
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai"
import ConfirmationModal from '../../common/confirmationModal'

const Sidebar = () => {
    const { user, loading: profileLoading } = useSelector((state) => state.profile)
    const { loading: authLoading } = useSelector((state) => state.auth)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [confirmationModal, setConfirmationModal] = useState(null)
    const [isMobileOpen, setIsMobileOpen] = useState(false)  // 🔥 new

    if (profileLoading || authLoading) {
        return <div className='mt-10'>Loading...</div>
    }

    const sidebarContent = (
        <div className='flex flex-col h-full bg-richblack-800 py-10'>
            <div className='flex flex-col'>
                {sidebarLinks.map((link) => {
                    if (link.type && user?.accountType !== link.type) return null
                    return (
                        <SidebarLink
                            key={link.id}
                            link={link}
                            iconName={link.icon}
                            onClick={() => setIsMobileOpen(false)}  // 🔥 close on nav
                        />
                    )
                })}
            </div>

            <div className='mx-auto mt-6 mb-6 h-[1px] w-10/12 bg-richblack-600' />

            <div className='flex flex-col'>
                <SidebarLink
                    link={{ name: "Settings", path: "dashboard/settings" }}
                    iconName="VscSettingsGear"
                    onClick={() => setIsMobileOpen(false)}
                />
                <button
                    onClick={() => {
                        setIsMobileOpen(false)
                        setConfirmationModal({
                            text1: "Are You Sure ?",
                            text2: "You will be logged out of your Account",
                            btn1Text: "Logout",
                            btn2Text: "Cancel",
                            btn1Handler: () => dispatch(logout(navigate)),
                            btn2Handler: () => setConfirmationModal(null),
                        })
                    }}
                    className='text-sm font-medium text-richblack-300 px-8 py-2'
                >
                    <div className='flex items-center gap-x-2'>
                        <VscSignOut className='text-lg' />
                        <span>Logout</span>
                    </div>
                </button>
            </div>
        </div>
    )

    return (
        <div className='text-white'>
            {/* Desktop sidebar */}
            <div className='hidden lg:flex min-w-[222px] flex-col border-r-[1px] border-r-richblack-700
                h-[calc(100vh-3.5rem)] bg-richblack-800'>
                {sidebarContent}
            </div>

            {/* Mobile hamburger button */}
            <button
                className='lg:hidden fixed top-[3.5rem] left-4 z-50 mt-2 p-2 rounded-md bg-richblack-800 text-white'
                onClick={() => setIsMobileOpen(true)}
            >
                <AiOutlineMenu className='text-xl' />
            </button>

            {/* Mobile overlay */}
            {isMobileOpen && (
                <div
                    className='lg:hidden fixed inset-0 z-40 bg-black bg-opacity-50'
                    onClick={() => setIsMobileOpen(false)}
                />
            )}

            {/* Mobile drawer */}
            <div className={`lg:hidden fixed top-0 left-0 z-50 h-full w-[222px] transform transition-transform duration-300
                ${isMobileOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <button
                    className='absolute top-4 right-4 text-white text-xl'
                    onClick={() => setIsMobileOpen(false)}
                >
                    <AiOutlineClose />
                </button>
                {sidebarContent}
            </div>

            {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
        </div>
    )
}

export default Sidebar