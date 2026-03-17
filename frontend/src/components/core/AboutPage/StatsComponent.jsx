import React from 'react'

const Stats = [
    { count: "5K", label: "Active Students" },
    { count: "10+", label: "Mentors" },
    { count: "200+", label: "Courses" },
    { count: "50+", label: "Awards" },
];

const StatsComponent = () => {
  return (
    <section className='bg-richblack-800'>
        {/* Main Container */}
        <div className='w-11/12 max-w-maxContent mx-auto py-8'>
            
            {/* Grid Layout for responsive design */}
            <div className='grid grid-cols-2 md:grid-cols-4 text-center'>
                {
                    Stats.map((data, index) => {
                        return (
                            <div className='flex flex-col py-10' key={index}>
                                <h1 className='text-[30px] font-bold text-richblack-5'>
                                    {data.count}
                                </h1>
                                <h2 className='font-semibold text-[16px] text-richblack-500'>
                                    {data.label}
                                </h2>
                            </div>
                        )
                    })
                }
            </div>
            
        </div>
    </section>
  )
}

export default StatsComponent