"use client"
import React, { useState } from 'react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu'
import { Button } from './ui/button'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { Checkbox } from './ui/checkbox'
import { cn } from '@/lib/utils'

const DropdownMenuCheckbox = ({ title, data, value = [], onChange, size }) => {
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
                <Button variant="custom" size="xl" className={cn("h-11 flex justify-between text-muted-foreground hover:text-primary", open && "text-primary border-primary", size ? size : "w-45")}>
                    {value.length > 0 ? `${value.length} выбрано` : title}
                    {
                        open ? <ChevronUp /> : <ChevronDown />
                    }
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className={cn(size ? size : "w-45")}>
                {data?.map((item) => (
                    <DropdownMenuItem
                        key={item.slug ? item.slug : item.value}
                        onSelect={(e) => {
                            e.preventDefault()
                            toggleItem(item.slug ? item.slug : item.value)
                        }}
                        className="cursor-pointer text-muted-foreground text"
                    >
                        <Checkbox
                            checked={value.includes(item.slug ? item.slug : item.value)}
                            onCheckedChange={() => toggleItem(item.slug ? item.slug : item.value)}
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