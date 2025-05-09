"use client"
import React, { useState } from 'react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu'
import { Button } from './ui/button'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { Checkbox } from './ui/checkbox'
import { cn } from '@/lib/utils'

const DropdownMenuCheckbox = ({ title, data, value = [], onChange }) => {
    const [open, setOpen] = useState(false);

    const toggleItem = (id) => {
        const newValue = value.includes(id)
            ? value.filter(i => i !== id)
            : [...value, id];
        onChange(newValue);
    }
    return (
        <DropdownMenu onOpenChange={(open) => setOpen(open)}>
            <DropdownMenuTrigger asChild>
                <Button variant="custom" size="xl" className={cn("w-40 h-11 flex justify-between text-muted-foreground hover:text-primary", open && "text-primary border-primary")}>
                    {value.length > 0 ? `${value.length} выбрано` : title}
                    {
                        open ? <ChevronUp /> : <ChevronDown />
                    }
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-40">
                {data?.map((item) => (
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