import React from 'react';
import "./AvailableLeaves.css"
import { loggedInUserDetails } from '../../lib/placeholder';

function AvailableLeaves () {
    return (
        <div className="avl-leaves_content-wrapper card-p">
            <h2 className="rpr">Available Leaves</h2>
            <div className="avl-leaves_content">
                <div className="avl-leaves_earned">
                    <p className="osns color-grey">Casual</p>
                    <h5 className="rpr">{loggedInUserDetails['availableEarnedLeaves']}</h5>
                    <p className="avl-leaves_days osns color-grey">Days</p>
                </div>

                <div className="avl-leaves_sick">
                    <p className="osns color-grey">Sick</p>
                    <h5 className="rpr">{loggedInUserDetails['availableSickLeaves']}</h5>
                    <p className="avl-leaves_days osns color-grey">Days</p>
                </div>
            </div>
        </div>
    );
}

export default AvailableLeaves;