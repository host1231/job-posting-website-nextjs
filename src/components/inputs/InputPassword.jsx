"use client"
import React, { useRef, useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'
import { Input } from '../ui/input';

const InputPassword = ({placeholder, ...field}) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleVisibility = () => {
        setIsOpen(prev => !prev);
    }

    return (
        <div className='w-full relative'>
            <Input {...field} placeholder={placeholder}  type={isOpen ? "text" : "password"} />
            <button type="button" onClick={toggleVisibility} className="absolute top-3 right-3 cursor-pointer text-muted-foreground transition-all duration-300 hover:text-primary">
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