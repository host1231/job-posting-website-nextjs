import React, { useState } from 'react';
import { Checkbox } from './ui/checkbox';

const CheckboxMenuForm = ({ title, data = [], value = [], onChange }) => {

    const toggleItem = (id) => {
        const newValue = value.includes(id)
            ? value.filter(i => i !== id)
            : [...value, id];

        onChange(newValue);
    };

    return (
        <div>
            <h6 className="text-sm font-semibold">{title}</h6>
            {
                data.map(item => (
                    <div key={item.value ? item.value : item.slug} className="flex items-center space-x-2 my-3">
                        <Checkbox
                            id={item.value ? item.value : item.slug}
                            checked={value.includes(item.value ? item.value : item.slug)}
                            onCheckedChange={() => toggleItem(item.value ? item.value : item.slug)}
                        />
                        <label
                            htmlFor={item.value ? item.value : item.slug}
                            className="text-sm text-muted-foreground font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                            {item.title}
                        </label>
                    </div>
                ))
            }
        </div>
    );
};

export default CheckboxMenuForm;
