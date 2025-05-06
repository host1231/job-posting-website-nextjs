import { format, formatDistanceToNow, formatDistanceToNowStrict } from "date-fns";
import { az } from "date-fns/locale"

export const getFormattedDate = (currentDate, another) => {
  const date = new Date(currentDate);
  return another
    ? format(date, 'd MMMM yyyy', { locale: az })
    : formatDistanceToNowStrict(date, {
      addSuffix: true,
      locale: az
    })
}