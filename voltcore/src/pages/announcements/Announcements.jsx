import {React, useState, useEffect} from 'react';
import './Announcements.css';
import { postAnnouncement, getAnnouncements } from '../../api/services';

function Announcements () {
    const [formData, setFormData] = useState({
        title: '',
        content: ''
    })

    const [success, setSuccess] = useState(false);

    const fetchAnnouncements = () => {
        return getAnnouncements();
    }

    const [announcementsList, setAnnouncementsList] = useState([]);

    useEffect(() => {
        fetchAnnouncements().then((data) => {
            setAnnouncementsList(data);
        })
        .catch((error) => {
            console.error("announcement fetch failed: ", error)
        })
    }, [])

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]:e.target.value})
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        postAnnouncement(formData).then((resp) => {
            setSuccess(true);
            setFormData({
                title: '',
                content: ''
            });
            fetchAnnouncements().then((data) => {
                setAnnouncementsList(data)
            })
        } )
    }

    return (
        <div className="ann-content-wrapper page-layout-container osns">
            <section className='ann-post'>
                <h3 className='rpr'>Post announcement</h3>
                <form onSubmit={handleSubmit}>
                    <label htmlFor='title'>Title</label>
                    <input type='text' name='title' value={formData.title} onChange={handleChange} />

                    <label htmlFor='content'>Details</label>
                    <textarea name='content' value={formData.content} onChange={handleChange} rows={4} />

                    <button type='submit'>Submit</button>
                </form>
                {success && <p>Announcement Successfully posted</p>}
            </section>

            <section className='ann-list'>
                <h3 className='rpr'>Announcements list</h3>
                {announcementsList.length == 0 && <p>No Announcements to display.</p>}
                <ol>
                    {announcementsList.map((item, index) => (
                        <li key={index}>
                            <h4>{item.title}</h4>
                            <p>{item.content}</p>
                            <hr />
                            <br />
                        </li>
                    )
                    )}
                </ol>
            </section>


        </div>
    )
}

export default Announcements;