import React, { useState, useEffect } from 'react';
import "./AnnouncementsPreview.css"
import { NavLink } from 'react-router-dom';
import { MdCampaign, MdArrowForward } from "react-icons/md";
import { announcementListDummy } from '../../lib/placeholder';
import { getAnnouncements } from '../../api/services';

const NUM_ROWS = 2;

function AnnouncementsPreview () {
    const [announcementsList, setAnnouncementsList] = useState([]);

    useEffect(() => {
        getAnnouncements().then((data) => {
            data = data.concat( announcementListDummy );
            setAnnouncementsList(data);
        })
        .catch((error) => {
            console.error("announcement fetch failed: ", error)
        })

        console.log('component rendered ...')
    }, [])

    // console.log('announcements list: ', announcementsList)

    const processContentString = (contentString) => {
        // limit announcement content preview length
        if (contentString.length > 135) {
            const processedString = contentString.slice(0, 135) + '...';
            return processedString;
        }

        return contentString;
    }

    return (
        <div className="ancmt-preview_content-wrapper card-p">
            <div className="ancmt-preview_title rpr">
                <MdCampaign className="ancmt-preview_icon" />
                <h2>Announcements</h2>
            </div>
            <div className="ancmt-preview_content">
                {announcementsList.slice(0, NUM_ROWS).map((item, index) => (
                    <div key={index} className='ancmt-preview_list-item'>
                        <h4 className="rpr">{item['title']}</h4>
                        <p className="osns color-grey">{processContentString(item['content'])}</p>
                        {index < NUM_ROWS-1 && <hr className="color-grey"/>}
                    </div>
                ))}
            </div>
            <div className="ancmt-preview_view-all">
                <NavLink to='/announcements'>View all annoucements <MdArrowForward /></NavLink>
            </div>
        </div>
    );
}

export default React.memo(AnnouncementsPreview);