export function formatDate(date)
{
    let year, month, day, time, format;

    if(date.toString().length===19)
    {
        year = date.slice(5, 9);
        month = date.slice(2, 4);
        day = date.slice(0, 1);
        time = date.slice(11, 16);
        format = "0"+day + "-" + month + "-" + year+" "+time;
    }
    else
    {
        year = date.slice(6, 10);
        month = date.slice(3, 5);
        day = date.slice(0, 2);
        time = date.slice(12, 17);
        format = day + "-" + month + "-" + year + " "+time;
    }
    return format;
}