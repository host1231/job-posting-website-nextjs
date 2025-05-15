"use client"
import { CloudUpload } from 'lucide-react'
import React, { useState } from 'react'
import { Input } from '../ui/input';

const InputFile = ({placeholder, field}) => {
    const [fileName, setFileName] = useState("");

    function handleInput(e) {
        const file = e.target.files?.[0];
        if (file) {
            setFileName(file.name);
            field.onChange(file);
        }
    }

    return (
        <label className="border border-input px-5 py-10 flex flex-col justify-center items-center gap-1 rounded-md text-muted-foreground cursor-pointer transition-all duration-300 hover:border-primary hover:text-primary shadow-xs">
            <Input type="file"  accept="image/*" onChange={handleInput}  hidden />
            <CloudUpload size={50} />
            <p>{fileName || placeholder || "Добавьте логотип компании"}</p>
        </label>

    )
}

export default InputFile