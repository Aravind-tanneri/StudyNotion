import React, { useState } from "react"
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts"

export default function InstructorChart({ courses }) {
  // We set our initial state to view student data by default
  const [currChart, setCurrChart] = useState("students")

  // We create a function to generate random beautiful colors for our pie chart slices
  const getRandomColors = (numColors) => {
    const colors = []
    for (let i = 0; i < numColors; i++) {
      const color = `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(
        Math.random() * 256
      )}, ${Math.floor(Math.random() * 256)})`
      colors.push(color)
    }
    return colors
  }

  // We prepare our data arrays for the charts
  const chartDataForStudents = courses.map((course) => ({
    name: course.courseName,
    value: course.totalStudentsEnrolled,
  }))

  const chartDataForIncome = courses.map((course) => ({
    name: course.courseName,
    value: course.totalAmountGenerated,
  }))

  // We map our random colors to however many courses the instructor has
  const COLORS = getRandomColors(courses.length)

  // We determine which dataset to feed into our chart based on the active button
  const chartData = currChart === "students" ? chartDataForStudents : chartDataForIncome

  return (
    <div className="flex flex-1 flex-col gap-y-4 rounded-md bg-richblack-800 p-6">
      <p className="text-lg font-bold text-richblack-5">Visualize</p>
      
      {/* We build the toggle buttons to switch our chart view */}
      <div className="space-x-4 font-semibold">
        <button
          onClick={() => setCurrChart("students")}
          className={`rounded-sm p-1 px-3 transition-all duration-200 ${
            currChart === "students"
              ? "bg-richblack-700 text-yellow-50"
              : "text-yellow-400"
          }`}
        >
          Students
        </button>
        <button
          onClick={() => setCurrChart("income")}
          className={`rounded-sm p-1 px-3 transition-all duration-200 ${
            currChart === "income"
              ? "bg-richblack-700 text-yellow-50"
              : "text-yellow-400"
          }`}
        >
          Income
        </button>
      </div>

      {/* We render the actual Recharts Pie Chart component */}
      <div className="relative mx-auto aspect-square h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={120}
              fill="#8884d8"
              dataKey="value"
            >
              {/* We assign our random colors to each slice of the pie */}
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}