import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import { getAllCategories, getCatalogPageData } from '../services/operations/categoryAPI'
import Course_Card from '../components/core/Catalog/Course_Card'
import Footer from '../components/common/Footer'

export default function Catalog() {
  const { catalogName } = useParams()
  const [loading, setLoading] = useState(true)
  const [catalogPageData, setCatalogPageData] = useState(null)
  const [categoryName, setCategoryName] = useState("")

  useEffect(() => {
    ;(async () => {
      setLoading(true)
      const allCategories = await getAllCategories()

      // catalogName in the URL is a lowercase, hyphenated slug of the category name
      const matchedCategory = allCategories.find(
        (cat) =>
          cat.name?.toLowerCase().split(" ").join("-") === catalogName
      )

      if (matchedCategory) {
        setCategoryName(matchedCategory.name)
        const res = await getCatalogPageData(matchedCategory._id)
        setCatalogPageData(res)
      }
      setLoading(false)
    })()
  }, [catalogName])

  if (loading) {
    return <div className="grid min-h-[50vh] place-items-center text-white">Loading...</div>
  }

  const courses = catalogPageData?.categoryCourses?.length
    ? catalogPageData.categoryCourses
    : catalogPageData?.topSellingCourses || []

  return (
    <div>
      <div className="bg-richblack-800">
        <div className="mx-auto flex w-11/12 max-w-maxContent flex-col gap-3 py-10 text-white">
          <p className="text-sm text-richblack-300">
            Home / Catalog / <span className="text-yellow-25">{categoryName || "Courses"}</span>
          </p>
          <h1 className="text-3xl font-semibold">{categoryName || "Explore Courses"}</h1>
          <p className="max-w-[870px] text-richblack-200">
            {catalogPageData?.message}
          </p>
        </div>
      </div>

      <div className="mx-auto w-11/12 max-w-maxContent py-10 text-white">
        <h2 className="mb-6 text-2xl font-semibold">
          {catalogPageData?.categoryCourses?.length
            ? "Courses in this category"
            : "No courses found in this category — here are our top courses"}
        </h2>

        {courses.length === 0 ? (
          <p className="text-richblack-300">No courses available right now.</p>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {courses.map((course) => (
              <Course_Card key={course._id} course={course} />
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  )
}
