const formatDate = ({ date }: { date: Date }): string => {
    return date.toLocaleDateString('es-MX', { year: "numeric", month: "short", day: "numeric" })
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