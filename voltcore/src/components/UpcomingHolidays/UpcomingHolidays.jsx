import React, { useState, useEffect } from 'react';
import { parse, format } from 'date-fns';
import "./UpcomingHolidays.css";
import { getHolidays } from '../../api/services';
const NUM_ROWS = 6 // to display

function UpcomingHolidays () {
    const [holidaysList, setHolidaysList] = useState([]);
    const today = new Date()
    const todayStripped = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    
    // filter out holidays that have already occurred
    const filterHoliday = (holiday) => {
        const holiday_date_str = holiday.date
        const holiday_date = parse(holiday_date_str, 'yyyy-MM-dd', new Date())
        const result = holiday_date >= todayStripped
        return result
    }

    // convert date from yyyy-MM-dd format to dd MMM yyyy format
    const processHoliday = (holiday) => {
        const holiday_date_str = holiday.date
        const holiday_date_parsed = parse(holiday_date_str, 'yyyy-MM-dd', new Date())
        const holiday_date_processed = format(holiday_date_parsed, 'dd MMM yyyy')

        return {
            name: holiday.name,
            date: holiday_date_processed,
            day_of_the_week: holiday.day_of_the_week,
        }
    }

    useEffect(() => {
        getHolidays().then((data) => {
            const filtered = data.filter(filterHoliday) 
            const processed = filtered.map(processHoliday)
            setHolidaysList(processed);
            console.log('processed: ', processed)
        })
        .catch((error) => {
            console.error('holidays get failed: ', error)
        })
    }, [])

    return (
        <div className="UHD_content-wrapper card-p">
            <h2 className="rpr">Upcoming Holidays</h2>
            <div className="UHD_main-content osns">
                {holidaysList.length == 0 && <p>Error occurred: Please try logging in or run "python manage.py import_holidays holidays2025.csv" in the backend</p>}
                <table>
                {holidaysList.slice(0, NUM_ROWS).map((holiday, index) => (
                    <tr key={index}>
                        <td>{holiday.name}</td>
                        <td className="UHD_date-col color-grey">{holiday.date}</td>
                        <td className="UHD_day-col color-grey">{holiday.day_of_the_week}</td>
                    </tr>
                ))}
                </table>

            </div>
        </div>
    );
}

export default React.memo(UpcomingHolidays);