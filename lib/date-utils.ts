import { format as dateFormat } from "date-fns"
import { es } from "react-day-picker/locale/es"

const formatDate = ({ date, format = "PPP" }: { date: Date, format?: string }): string => {
    return dateFormat(date, format, { locale: es })
}

const getDayPeriod = ({ date }: { date: Date }): string => {
    const hours = date.getHours()
    if (hours < 12) return "Buenos días"
    if (hours < 18) return "Buenas tardes"
    return "Buenas noches"
}

export {
    formatDate,
    getDayPeriod
}