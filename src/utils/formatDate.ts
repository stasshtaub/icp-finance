export const formatDate = (date?: string | null): string | null => {
    return date
        ? new Date(date)
            .toLocaleString()
            .slice(0, -3)
            .replace(",", "")
        : null
}
