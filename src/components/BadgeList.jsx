import { cn } from '@/lib/utils';
import { Badge } from './ui/badge'
import { X } from 'lucide-react'

const BadgeList = ({ data, setData, options=[] }) => {
    return (
        <div className="flex">
            {
                data?.map(val => {
                    const matched = options.find(opt => opt.value ? opt.value : opt.slug  === val);
                    return (
                        <Badge key={val} className="mr-2">
                            {matched?.title || val}
                            <X className="cursor-pointer" size={80} onClick={() => setData((prev) => prev.filter(item => item !== val))} />
                        </Badge>
                    )
                })
            }
        </div>
    )
}

export default BadgeList