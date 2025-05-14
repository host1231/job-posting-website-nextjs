import { Badge } from './ui/badge'
import { X } from 'lucide-react'

const BadgeList = ({ data, setData, options=[] }) => {
    return (
        <div className="flex gap-2">
            {
                data?.map(val => {
                    const matched = options.find(opt => opt.value ? opt.value : opt.slug  === val);
                    return (
                        <Badge key={val} className="">
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