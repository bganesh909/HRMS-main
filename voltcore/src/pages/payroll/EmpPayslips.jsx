import { React, useState } from 'react';
import './EmpPayslips.css';

import { empPayslips } from '../../lib/placeholder';
import DownloadButton from '../../components/DownloadButton/DownloadButton';

function EmpPayslips () {
    const currentYear = new Date().getFullYear();
    const [selectedYear, setSelectedYear] = useState(currentYear);
    const availableYears = Object.keys(empPayslips).map(year => parseInt(year))
    availableYears.sort((a, b) => b-a);

    return (
        <div className='empps_content-wrapper page-layout-container'>
            <header>
                <h2 className='rpr'>My Payslips</h2>
                <hr className='color-grey'/>
            </header>

            <section className='empps_filters osns'>
                <label>Filter by Year</label>
                <select value={selectedYear} onChange={ (e) => setSelectedYear(e.target.value)}>
                    {availableYears.map((year, index) => (
                        <option key={index} value={year}>{year}</option>
                    ))}
                </select>
            </section>

            <section className='empps_table-container osns'>
                <table className='table-style1'>
                    <thead>
                        <tr>
                            <th>Pay Period</th>
                            <th>Payment Date</th>
                            <th>Net Pay</th>
                            <th>Action</th>
                        </tr>
                    </thead>

                    <tbody>
                    {empPayslips[selectedYear].map((monthlyPayslip, index) => (
                        <tr key={index}>
                            <td>{monthlyPayslip.period}</td>
                            <td>{monthlyPayslip.payDate}</td>
                            <td>{monthlyPayslip.netPay}</td>
                            <td className="empps_download-cell"><DownloadButton name="Download Payslip" url = {monthlyPayslip.downloadUrl} /></td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </section>

        </div>
    )
};

export default EmpPayslips;