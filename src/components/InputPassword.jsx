"use client"
import React, { useRef, useState } from 'react'
import { Input } from './ui/input'
import { Eye, EyeClosed, EyeClosedIcon, EyeOff } from 'lucide-react'

const InputPassword = ({placeholder, ...field}) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleVisibility = () => {
        setIsOpen(prev => !prev);
    }

    return (
        <div className='w-full relative'>
            <Input {...field} placeholder={placeholder}  type={isOpen ? "text" : "password"} />
            <button onClick={toggleVisibility} className="absolute top-3 right-3 cursor-pointer text-neutral-400 transition-all duration-300 hover:text-amber-500">
                {
                    isOpen ? 
                    (
                        <Eye className="w-5 h-5" />
                    ) : 
                    (
                        <EyeOff className="w-5 h-5" />
                    )
                }
            </button>
        </div>
    )
}

export default InputPassword