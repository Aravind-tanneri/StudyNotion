import React, { useState } from 'react'
import CourseCard from './CourseCard'
// import { Link } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa';
const tabsName = [
    "Free", "New to coding", "Most popular", "Skills paths", "Career paths"
];

export const HomePageExplore = [
    {
        tag: 'Free',
        courses: [
            {
                heading: "Learn HTML",
                description: "This course covers the basic concepts of HTML including creating and structuring web pages, adding text, links, images, and more.",
                level: 'Beginner',
                lessonNumber: 6
            },
            {
                heading: "Learn CSS",
                description: "This course explores advanced topics in HTML5 and CSS3, including animations, transitions, and layout techniques.",
                level: 'Beginner',
                lessonNumber: 6
            },
            {
                heading: "Responsive Design",
                description: "This course teaches responsive web design techniques, allowing web pages to adapt to different devices and screen sizes.",
                level: 'Beginner',
                lessonNumber: 6
            },
        ]
    },
    {
        tag: 'New to coding',
        courses: [
            {
                heading: "JavaScript",
                description: "Learn the fundamentals of JS including variables, loops, and functions. The first step to making your web pages interactive.",
                level: 'Beginner',
                lessonNumber: 8
            },
            {
                heading: "React.js",
                description: "Introduction to React components, props, and state. Learn how to build modern, fast user interfaces.",
                level: 'Beginner',
                lessonNumber: 10
            },
            {
                heading: "Node.js",
                description: "Start your backend journey. Learn how to run JavaScript on the server and handle basic API requests.",
                level: 'Beginner',
                lessonNumber: 7
            },
        ]
    },
    {
        tag: 'Most popular',
        courses: [
            {
                heading: "Java",
                description: "Learn Java from scratch. Covers OOPS, collections, and multi-threading for building robust backend applications.",
                level: 'Beginner',
                lessonNumber: 12
            },
            {
                heading: "Python",
                description: "Master Python for Data Science and Automation. Learn syntax, libraries like NumPy, and data manipulation.",
                level: 'Beginner',
                lessonNumber: 10
            },
            {
                heading: "C++",
                description: "Deep dive into C++ and Data Structures. Perfect for competitive programming and systems development.",
                level: 'Beginner',
                lessonNumber: 15
            },
        ]
    },
    {
        tag: 'Skills paths',
        courses: [
            {
                heading: "Flask",
                description: "Build lightweight web applications using Python's Flask framework. Covers routing, templates, and database integration.",
                level: 'Intermediate',
                lessonNumber: 8
            },
            {
                heading: "Django",
                description: "Learn the high-level Python web framework that encourages rapid development and clean, pragmatic design.",
                level: 'Intermediate',
                lessonNumber: 14
            },
            {
                heading: "Fast API",
                description: "Build high-performance APIs with Python using modern features like type hinting and asynchronous support.",
                level: 'Intermediate',
                lessonNumber: 6
            },
        ]
    },
    {
        tag: 'Career paths',
        courses: [
            {
                heading: "Next.js",
                description: "Master the React framework for production. Learn Server Side Rendering, Static Site Generation, and API routes.",
                level: 'Advanced',
                lessonNumber: 18
            },
            {
                heading: "Graphic Design",
                description: "Learn the fundamentals of visual communication, layout, and color theory using industry-standard tools.",
                level: 'Beginner',
                lessonNumber: 12
            },
            {
                heading: "Sanity",
                description: "Learn how to use Sanity.io for headless CMS management. Build structured content and integrate with modern frontends.",
                level: 'Intermediate',
                lessonNumber: 5
            },
        ]
    },
];

const ExploreMore = () => {
    // State to track which Tab is selected
    const [currentTab, setCurrentTab] = useState(tabsName[0]);
    // State to track which Courses to show based on the Tab
    const [courses, setCourses] = useState(HomePageExplore[0].courses);
    // State to track which Card is highlighted (defaults to the first card's heading)
    const [currentCard, setCurrentCard] = useState(HomePageExplore[0].courses[0].heading);

    // Function to handle Tab Switching
    const setMyCards = (value) => {
        setCurrentTab(value);
        const result = HomePageExplore.filter((course) => course.tag === value);
        // Only update if data exists for that tab
        if(result.length > 0) {
            setCourses(result[0].courses);
            setCurrentCard(result[0].courses[0].heading);
        }
    }

  return (
    <div className='relative w-full flex flex-col items-center mt-10 z-10'>
        {/* Headings */}
        <div className='text-4xl font-semibold text-center text-white'>
            Unlock the <span className='text-blue-gradient'>Power of Code</span>
        </div>
        <p className='text-center text-richblack-300 text-[16px] mt-3 font-semibold'>
            Learn to Build Anything You Can Imagine
        </p>

        {/* Tabs Menu */}
        <div className='hidden lg:flex gap-5 mt-5 mx-auto w-max bg-richblack-800 text-richblack-200 p-1 rounded-full font-medium drop-shadow-[0_1.5px_rgba(255,255,255,0.25)]'>
            {tabsName.map((element, index) => (
                <div 
                    key={index} 
                    className={`text-[16px] flex flex-row items-center gap-2 
                        ${currentTab === element 
                            ? "bg-richblack-900 text-richblack-5 font-medium" 
                            : "text-richblack-200 hover:bg-richblack-900 hover:text-richblack-5"} 
                        rounded-full transition-all duration-200 cursor-pointer px-7 py-2`}
                    onClick={() => setMyCards(element)}
                >
                    {element}
                </div>
            ))}
        </div>

        {/* Spacer to push everything down so cards overlap the white section later */}
        <div className='hidden lg:block h-[250px]'></div>

        {/* Cards Grid */}
        <div className='lg:absolute bottom-0  left-[50%] px-[10px] pt-10 lg:-translate-x-[50%] lg:translate-y-[50%] text-black flex flex-wrap gap-10 w-full justify-center'>
            {courses.map((element, index) => (
                <CourseCard 
                    key={index}
                    cardData={element}
                    currentCard={currentCard}
                    setCurrentCard={setCurrentCard}
                />
            ))}
            <div className='flex flex-row gap-7 w-full justify-center text-white'>
                <button className='btn-grad flex items-center gap-2'>
                    Explore Full Catalog
                    <FaArrowRight />
                </button>
                <button className='btn-dark'>
                    Learn More
                </button>
            </div>
        </div>
        
        
    </div>
  )
}

export default ExploreMore