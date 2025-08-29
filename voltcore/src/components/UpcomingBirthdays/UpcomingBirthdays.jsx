import React, {useState, useEffect} from 'react';
import "./UpcomingBirthdays.css";
import { upcomingBirthdaysListDummy } from '../../lib/placeholder';
import { getBirthdays } from '../../api/services';
import { format } from 'date-fns';

const NUM_ROWS = 4;

function UpcomingBirthdays () {
    const [birthdaysList, setBirthdaysList] = useState([]);

    useEffect(() => {
        getBirthdays().then((data) => {
            const processed = data.map(processBirthday);
            setBirthdaysList(processed.concat(upcomingBirthdaysListDummy));
        })
        .catch((error) => {
            console.error("birthdays get failed: ", error)
        })
    }, [])

    const processBirthday = (b) => {
        const bMonth = b.birth_month
        const bDay = b.birth_day

        const falseBday = new Date(2000, bMonth-1, bDay)

        const birthdayStr = format(falseBday, "MMM dd")

        return {
            name: b.name,
            role: b.designation_name,
            bday: birthdayStr
        }
    }

    return (
        <div className="UBday_content-wrapper card-p">
            <h2 className="rpr">Birthdays</h2>

            <div className="UBday_main-content osns">
                {birthdaysList.slice(0, NUM_ROWS).map((birthday, index) => (
                    <div key={index}>
                        <div className="UBday_bday-row">
                            <div className="UBday_person-details">
                                <div className="UBday_person-name">
                                    <p>{birthday.name}</p>
                                </div>

                                <div className="UBday_person-role color-grey">
                                    <p>{birthday.role}</p>
                                </div>
                            </div>
                            
                            <div className="UBday_person-bdate">
                                <p>{birthday.bday}</p>
                            </div>
                        </div>

                        {index < NUM_ROWS -1 && <hr className='color-grey' />}
                    </div>
                    
                ))}
            </div>
        </div>
    );
}

export default React.memo(UpcomingBirthdays);