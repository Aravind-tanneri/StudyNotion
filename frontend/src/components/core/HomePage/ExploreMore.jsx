import React, { useState } from 'react'
import CourseCard from './CourseCard'
import { Link } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa';

const tabsName = [
    "Free", "New to coding", "Most popular", "Skills paths", "Career paths"
];

const HomePageExplore = [
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
    const [currentTab, setCurrentTab] = useState(HomePageExplore[0].tag);
    const [courses, setCourses] = useState(HomePageExplore[0].courses);
    const [currentCard, setCurrentCard] = useState(HomePageExplore[0].courses[0].heading);

    const setMyCards = (value) => {
        setCurrentTab(value);
        const result = HomePageExplore.filter((course) => course.tag === value);
        if (result.length > 0) {
            setCourses(result[0].courses);
            setCurrentCard(result[0].courses[0].heading);
        }
    }

  return (
    <div className='relative w-full flex flex-col items-center mt-10 z-10'>
        {/* Headings Section */}
        <div className='text-4xl font-semibold text-center text-white'>
            Unlock the <span className='text-blue-gradient'>Power of Code</span>
        </div>
        <p className='text-center text-richblack-300 text-[16px] mt-3 font-semibold'>
            Learn to Build Anything You Can Imagine
        </p>

        {/* Tabs Menu */}
        <div className='flex gap-1 md:gap-5 mt-5 mx-auto bg-richblack-800 text-richblack-200 p-1 md:p-2 rounded-full font-medium drop-shadow-[0_1.5px_rgba(255,255,255,0.25)] flex-wrap justify-center shadow-md shadow-[#2C333F]'>
            {tabsName.map((element, index) => (
                <div 
                    key={index} 
                    className={`text-[12px] md:text-[16px] flex flex-row items-center gap-2 
                        ${currentTab === element 
                            ? "bg-richblack-900 text-richblack-5 font-medium shadow-[#2C333F]" 
                            : "text-richblack-200 hover:bg-richblack-900 hover:text-richblack-5"} 
                        rounded-full transition-all duration-200 cursor-pointer px-3 md:px-7 py-2`}
                    onClick={() => setMyCards(element)}
                >
                    {element}
                </div>
            ))}
        </div>

        {/* Height Spacer for Desktop Overlap */}
        <div className='hidden lg:block h-[80px]'></div>

        {/* Cards Grid */}
        <div className='flex flex-wrap gap-10 justify-center lg:gap-0 lg:justify-between w-9/10 text-black mb-7 lg:mb-0 mt-10 lg:mt-0'>
            {courses.length > 0 ? (
                courses.map((element, index) => (
                    <CourseCard 
                        key={index}
                        cardData={element}
                        currentCard={currentCard}
                        setCurrentCard={setCurrentCard}
                    />
                ))
            ) : (
                <div className="text-white text-xl">Loading courses...</div>
            )}
        </div>

        {/* Buttons (Desktop & Mobile Unified Flow) */}
        <div className='mt-5 lg:mt-[160px] lg:mb-[-120px] pb-10 flex flex-row gap-5 w-full justify-center text-white'>
            <Link to="/catalog/web-development">
                <button className='btn-grad flex items-center justify-center gap-2 text-[14px] md:text-[16px] py-2 md:py-3 px-4 md:px-6'>
                    Explore Full Catalog <FaArrowRight />
                </button>
            </Link>
            <Link to="/signup">
                <button className='btn-dark flex items-center justify-center text-[14px] md:text-[16px] py-2 md:py-3 px-4 md:px-6'>
                    Learn More
                </button>
            </Link>
        </div>
    </div>
  )
}

export default ExploreMore