import React from 'react'
import {useDispatch} from 'react-redux'
const CourseInformationForm = () => {
    const {register, handleSubmit, setValue, getValues, formState:{errors} } = useForm();
    const dispatch = useDispatch();
  return (
    <div>CourseInformationForm</div>
  )
}

export default CourseInformationForm