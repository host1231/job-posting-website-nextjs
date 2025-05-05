"use client"
import React, { useState } from 'react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu'
import { Button } from './ui/button'
import { ChevronDown } from 'lucide-react'
import { Checkbox } from './ui/checkbox'

const DropdownMenuCheckbox = ({ title, data, value=[], onChange }) => {
    const toggleItem = (id) => {
        const newValue = value.includes(id) 
            ? value.filter(i => i !== id)
            : [...value, id];
        onChange(newValue);
    }
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="custom" size="xl" className="w-80 h-11 justify-between text-muted-foreground">
                    {value.length > 0 ? `${value.length} выбрано` : title}
                    <ChevronDown />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-80">
                {data.map((item) => (
                    <DropdownMenuItem
                        key={item._id}
                        onSelect={(e) => {
                            e.preventDefault()
                            toggleItem(item._id)
                        }}
                        className="cursor-pointer text-muted-foreground text"
                    >
                        <Checkbox
                            checked={value.includes(item._id)}
                            onCheckedChange={() => toggleItem(item._id)}
                            className="mr-2"
                        />
                        {item.title}
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default DropdownMenuCheckbox