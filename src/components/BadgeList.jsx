import { Badge } from './ui/badge'
import { X } from 'lucide-react'

const BadgeList = ({data, setData}) => {
    return (
        <div className="flex gap-2">
            {
                data?.map(item => (
                    <Badge key={item}>
                        {item}
                        <X className="cursor-pointer" size={80} onClick={() => setData((prev) => prev.filter(prevItem => prevItem !== item))} />
                    </Badge>
                ))
            }
        </div>
    )
}

export default BadgeList