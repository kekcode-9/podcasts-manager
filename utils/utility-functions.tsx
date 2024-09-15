export function dateFormatter(dateTime: string) {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const dateArr = dateTime.split('T')[0].split('-');
    const year = dateArr[0];
    const month = months[Number(dateArr[1]) - 1];
    const date = dateArr[2];

    return month + ' ' + date + ', ' + year;
}