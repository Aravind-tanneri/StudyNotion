import React, { useState, useEffect } from 'react'
import { FaArrowRight } from "react-icons/fa"
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'

const CodeBlocks = ({
    position, heading, subheading, ctaBtn1, ctaBtn2, codeblock, backgroundGradient, codeColor
}) => {
    // Custom state to handle the typing animation smoothly
    const [displayedText, setDisplayedText] = useState("");

    useEffect(() => {
        let i = 0;
        let typingInterval;

        const startTyping = () => {
            setDisplayedText(""); // Clear text
            i = 0;
            
            typingInterval = setInterval(() => {
                if (i < codeblock.length) {
                    setDisplayedText(codeblock.substring(0, i + 1));
                    i++;
                } else {
                    clearInterval(typingInterval);
                    // Pause for 2 seconds at the end, then restart the loop
                    setTimeout(startTyping, 2000); 
                }
            }, 40); // Typing speed (40ms per character)
        };

        startTyping();

        // Cleanup interval on component unmount
        return () => clearInterval(typingInterval);
    }, [codeblock]);

    return (
        <div className={`flex max-[900px]:flex-wrap ${position} my-20 justify-between gap-10`}>
          
          {/* Section 1: Text and Buttons */}
          <div className='w-[100%] min-lg:w-[50%] text-[16px] spacing-y-0.1 flex flex-col gap-8'>
            {heading}
            <div className='text-richblack-300 max-md:font-medium font-bold'>
                {subheading}
            </div>
    
            <div className='flex gap-7 mt-7'>
                {/* CTA Button 1 */}
                <button className={"btn-grad"}>
                    <div className='flex items-center gap-2'>
                        {ctaBtn1.btnText}
                        <FaArrowRight/>
                    </div>
                </button>

                {/* CTA Button 2 */}
                <button className={"btn-dark text-normal"}>
                    {ctaBtn2.btnText}
                </button>
            </div>
          </div>
    
          {/* Section 2: Animated & Colorful Code */}
            <div className='relative z-0 w-[100%] lg:w-[500px] '>
                {/* Glow Effect */}
                <div className={`absolute -top-10 -left-10 h-[250px] w-[350px] blur-[60px] rounded-full opacity-35 z-[-10] ${backgroundGradient}`}></div>
                
                {/* 3D Border Container */}
                <div className='h-fit select-none relative z-10 flex flex-row w-[100%] py-4 rounded-[7px] border-t-1 border-l-1 border-gray-400/20 bg-white/3 backdrop-blur-lg'>
                    
                    <div className='text-center flex flex-col w-[10%] leading-[23.5px] text-richblack-400 font-inter font-bold text-[16px] pt-1'>
                        {codeblock.split("\n").map((_, index) => (
                            <p key={index}>{index + 1}</p>
                        ))}
                    </div>

                    {/* Syntax Highlighter Container */}
                    <div className={`w-[90%] flex flex-col font-bold font-mono pr-2 ${codeColor || ""}`}>
                        <SyntaxHighlighter
                            language="html"
                            style={vscDarkPlus}
                            customStyle={{
                                backgroundColor: "transparent",
                                margin: 0,
                                padding: 0,
                                fontSize: "16px",
                            }}
                            codeTagProps={{
                                style: {
                                    fontSize: "16px", 
                                    fontFamily: "inherit",
                                }
                            }}
                            wrapLines={true}
                        >
                            {/* The text being typed + the fake blinking cursor */}
                            {displayedText + (displayedText.length < codeblock.length ? "|" : "")}
                        </SyntaxHighlighter>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CodeBlocks