export const timeToHours = (timeString) => {
     let days = 0
    let timeParts;
    if(timeString.split(' ').length > 1) {
        const [dayPart, timePart] = timeString.split(' ');
        timeParts = timePart
        days = parseInt(dayPart, 10);
    }
 
  const [hourStr, minuteStr, secondStr] = timeParts? timeParts.split(":").map(Number):timeString.split(":").map(Number);
  const hours = parseInt(hourStr, 10);
  const minutes = parseInt(minuteStr, 10);
  const seconds = parseFloat(secondStr);

  // Convert everything to hours
  const totalHours = (days * 24) + hours + (minutes / 60) + (seconds / 3600);

  return totalHours;
  // const [hours, minutes, seconds] = timeString.split(':').map(Number);
  // console.log(hours + minutes / 60 + seconds / 3600);
  // return hours + minutes / 60 + seconds / 3600;
};
export const subtractTimeString = (timeStr) => {
  const [hours, minutes, seconds = 0] = timeStr.split(':').map(Number);
  const date = new Date();
  date.setHours(date.getHours() - hours);
  date.setMinutes(date.getMinutes() - minutes);
  date.setSeconds(date.getSeconds() - seconds);
  return date;
};
