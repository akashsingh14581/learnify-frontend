import ChangeProfilePicture from "./ChangeProfilePicture"
import DeleteAccount from "./DeleteAccount"
import EditProfile from "./EditProfile"
import UpdatePassword from "./UpdatePassword"

export default function Settings() {
  return (
    <div className="mx-auto w-11/12 max-w-[1000px] py-10 text-richblack-5">
      
      <h1 className="mb-10 text-3xl font-semibold">
        Edit Profile
      </h1>

      <div className="flex flex-col gap-8">
        <ChangeProfilePicture />
        <EditProfile />
        <UpdatePassword />
        <DeleteAccount />
      </div>

    </div>
  )
}