import React, { useEffect, useState } from 'react'
import { useEffect, useState } from "react"

const RequirementField = ({ name, label, register, errors, setValue, getValues }) => {
    const [requirement, setRequirement] = useState("");
    const [requirementsList, setRequirementsList] = useState([]);

    useEffect(() => {
        register(name, {
            required: true,
            validate: (value) => value.length > 0
        });
    }, [register, name]);

    useEffect(() => {
        setValue(name, requirementsList);
    }, [requirementsList, setValue, name]);

    const handleAddRequirement = () => {
        if (requirement) {
            setRequirementsList([...requirementsList, requirement]);
            setRequirement(""); // Clear the input field
        }
    };

    const handleRemoveRequirement = (index) => {
        const updatedList = [...requirementsList];
        updatedList.splice(index, 1);
        setRequirementsList(updatedList);
    };

    return (
        <div className="flex flex-col space-y-2">
            <label className="text-sm text-richblack-5" htmlFor={name}>
                {label} <sup className="text-pink-200">*</sup>
            </label>
            
            <div className="flex flex-col items-start space-y-2">
                <input
                    type="text"
                    id={name}
                    value={requirement}
                    onChange={(e) => setRequirement(e.target.value)}
                    className="form-style w-full text-black p-2 rounded-md"
                    placeholder="Enter course requirement (e.g., Basic HTML)"
                />
                <button
                    type="button"
                    onClick={handleAddRequirement}
                    className="font-semibold text-yellow-50"
                >
                    Add
                </button>
            </div>

            {/* Display the list of added requirements */}
            {requirementsList.length > 0 && (
                <ul className="mt-2 list-inside list-disc">
                    {requirementsList.map((req, index) => (
                        <li key={index} className="flex items-center text-richblack-5">
                            <span>{req}</span>
                            <button
                                type="button"
                                onClick={() => handleRemoveRequirement(index)}
                                className="ml-2 text-xs text-pure-greys-300 hover:text-pink-200"
                            >
                                clear
                            </button>
                        </li>
                    ))}
                </ul>
            )}
            
            {/* Show validation error if the list is empty and form is submitted */}
            {errors[name] && (
                <span className="text-xs text-pink-200">{label} is required</span>
            )}
        </div>
    )
}

export default RequirementField