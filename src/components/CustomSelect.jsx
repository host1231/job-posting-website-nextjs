import React from 'react'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { Avatar, AvatarImage } from './ui/avatar'

const CustomSelect = ({data, value, onChange, placeholder}) => {
    return (
        <Select value={value} onValueChange={onChange}>
            <SelectTrigger className="w-full">
                <SelectValue placeholder={placeholder ? placeholder : value}/>
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    {
                        data?.map(item => (
                            <SelectItem key={item._id} value={item.value ? item.value : item._id}>
                                <div className="flex items-center gap-2 text-muted-foreground">
                                    {
                                        item.imageUrl && (
                                            <Avatar className="w-7 h-7">
                                                <AvatarImage src={item.imageUrl} alt={item.title} />
                                            </Avatar>
                                        )
                                    }
                                    {item.title}
                                </div>
                            </SelectItem>
                        ))
                    }
                </SelectGroup>
            </SelectContent>
        </Select>
    )
}

export default CustomSelect