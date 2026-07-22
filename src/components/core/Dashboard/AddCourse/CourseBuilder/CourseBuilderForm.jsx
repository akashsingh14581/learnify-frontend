import React, { useState } from 'react'

const CourseBuilderForm = () => {
  const {register, handleSubmit, setValue, formState:{errors}} = useState();
  const [editSectionName, setEditSectionName] = useState(null);
  return (
    <div className='text-white'>
     <p>Course Builder</p>
     <form action="">
      <div>
        <label htmlFor=""> Section Name <sup>*</sup></label>
        <input type="text" id='sectionName' placeholder='Add Section' {...register("SectionName", {required: true})} className='w-full' />
      </div>
      <div>
        <IconBtn type="Submit" text={editSectionName ? "Edit Section Name" : "Create Section Name"} outline={true} />
      </div>
     </form>
    </div>
  )
}

export default CourseBuilderForm
