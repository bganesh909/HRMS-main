import { React, useState } from 'react';
import "./HRPayslips.css";
import DownloadButton from '../../components/DownloadButton/DownloadButton';
import { Download } from 'lucide-react';
import { hrPayslipsUploadHistory } from '../../lib/placeholder';

function HRPayslips () {

    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth() + 1; // returns count from 0
    const [selectedYear, setSelectedYear] = useState(currentYear);
    const [selectedMonth, setSelectedMonth] = useState(currentMonth);
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const years = Array.from({ length: 5 }, (_, i) => currentYear - i);
    
    const [file, setFile] = useState(null);

    const handleSubmit = (e) => {
        // handle submit here
    }

    return (
        <div className="hrps_content-wrapper page-layout-container">
            <header>
                <h2 className='rpr'>Upload Payslip Information</h2>
                <hr className='color-grey'/>
            </header>

            <section className='hrps_template-info'>
                <p className='osns'>Please upload payslip details in an excel file in the following specified format:</p>
                <DownloadButton name='Download Template' url='/HR-Payslips-upload-template.xlsx' />
            </section>

            <section className='hrps_upload osns'>

                <form onSubmit={handleSubmit}>

                    <div className='hrps_pay-period'>
                        <p className='rpr'>Select Pay Period for this upload</p>

                        <div className='hrps_month-year'>
                            <label htmlFor="month">Month:</label>
                            <select id="month" value={selectedMonth} onChange={(e) => setSelectedMonth(e.target.value)} required>
                                {months.map((month, index) => (
                                    <option key={index} value={index+1}>{month}</option>
                                ))}
                            </select>

                            <label htmlFor="year">Year:</label>
                            <select id="year" value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)} required>
                                {years.map((year, index)=> (
                                    <option key={index} value={year}>{year}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    
                    <div className='hrps_file-upload'>
                        <p className='rpr'>Upload Excel File (.xlsx)</p>
                        <input type="file" accept=".xlsx" onChange={(e) => setFile(e.target.files[0])} />
                    </div>
                    
                    <div className='hrps_file-submit'>
                        <p className='rpr'>Click to submit data</p>
                        <button type="submit">Submit</button>
                    </div>
                    
                </form>
            </section>

            <section className='hrps_history'>
                <header>
                    <h2 className='rpr'>Payslip Upload History</h2>
                    <hr className='color-grey'/>                 
                </header>
                
                <table className='table-style1 osns'>
                    <thead>
                        <tr>
                            <th>File Name</th>
                            <th>Pay Period</th>
                            <th>Upload Date/Time</th>
                            <th>Status</th>
                            <th>Records Processed/Failed</th>
                        </tr>
                    </thead>
                    
                    <tbody>
                        {hrPayslipsUploadHistory.map((record, index) => (
                            <tr key={index}>
                                <td>{ record.filename }</td>
                                <td>{ record.payPeriod }</td>
                                <td>{ record.uploadTime }</td>
                                <td>{ record.status }</td>
                                <td>{ record.successNum }</td>
                            </tr>
                        ))} 
                    </tbody>
                </table>                

            </section>

        </div>
    )
};

export default HRPayslips;