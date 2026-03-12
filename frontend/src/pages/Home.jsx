import React from 'react'
import HeroSection from '../components/core/HomePage/HeroSection'
import CodeBlocks from '../components/core/HomePage/CodeBlocks'

const Home = () => {
  return (
    <div>
      <div className='relative mx-auto flex flex-col w-11/12 max-w-maxContent items-center text-white justify-between'>
        <HeroSection />

        {/* Code Section 1 */}
        <div className='w-full'>
            <CodeBlocks 
                position={"flex-row"}
                heading={
                    <div className='text-4xl font-semibold'>
                        Unlock your <span className='text-blue-400'>coding potential</span> with our online courses.
                    </div>
                }
                subheading={"Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."}
                ctaBtn1={{ btnText: "Try it Yourself", active: true, linkto: "/signup" }}
                ctaBtn2={{ btnText: "Learn More", active: false, linkto: "/login" }}
                codeblock={`<!DOCTYPE html>\n<html>\n<head><title>Example</title>\n<link rel="stylesheet" href="style.css">\n</head>\n<body>\n<h1><a href="/">Header</a></h1>\n<nav><a href="one/">One</a><a href="two/">Two</a>\n<a href="three/">Three</a></nav>\n</body>\n</html>`}
                codeColor={"text-yellow-25"}
            />
        </div>

        {/* Code Section 2 */}
        <div className='w-full'>
            <CodeBlocks 
                position={"flex-row-reverse"}
                heading={
                    <div className='text-4xl font-semibold'>
                        Start <span className='text-blue-400'>coding in seconds</span>
                    </div>
                }
                subheading={"Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson."}
                ctaBtn1={{ btnText: "Continue Lesson", active: true, linkto: "/signup" }}
                ctaBtn2={{ btnText: "Learn More", active: false, linkto: "/login" }}
                codeblock={`import React from 'react';\nimport Button from './Button';\n\nconst App = () => {\n  return (\n    <div>\n      <h1>Hello World</h1>\n      <Button text="Click Me!" />\n    </div>\n  );\n};\n\nexport default App;`}
                codeColor={"text-white"}
            />
        </div>
      </div>
    </div>
  )
}

export default Home