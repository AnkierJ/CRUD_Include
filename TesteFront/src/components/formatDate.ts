export const formatDate = (ISODate: string) => {
    var result
    const date = new Date(ISODate);
    result = date.getDate().toString().padStart(2, '0') + (date.getMonth() + 1).toString().padStart(2, '0') + date.getFullYear() + date.getHours().toString().padStart(2, '0') + date.getMinutes().toString().padStart(2, '0');
    return result;
};