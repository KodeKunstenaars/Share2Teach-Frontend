import { useState } from 'react';

const ReportButton = ({ documentId, onReport, showButtons, setShowButtons }) => {
    const [isReporting, setIsReporting] = useState(false);
    const [reportReason, setReportReason] = useState('');

    const handleSubmit = () => {
        console.log("Report reason selected:", reportReason);
        if (reportReason) {
            console.log("Submitting report for document:", documentId); 
            onReport(documentId, reportReason);
            setIsReporting(false); 
            setShowButtons(true);
        } else {
            console.log("No report reason selected.");
        }
    };

    const handleCancel = () => {
        setIsReporting(false); 
        setShowButtons(true);   
    };

    return (
        <>
            {/* Hide the report button when modal is open */}
            {showButtons && <button className="btn btn-sm btn-outline-danger me-2" onClick={() => { setIsReporting(true); setShowButtons(false); }}>Report</button>}
            {isReporting && (
                <div className="report-modal">
                    <h4>Report Document</h4>
                    <select className="form-select" value={reportReason} onChange={(e) => setReportReason(e.target.value)}>
                        <option value="">Select reason</option>
                        <option value="inappropriate">Inappropriate content</option>
                        <option value="spam">Spam</option>
                        <option value="other">Other</option>
                    </select>
                    <button className="btn btn-sm btn-outline-danger me-2" onClick={handleSubmit}>Submit Report</button>
                    <button className="btn btn-sm btn-outline-danger me-2" onClick={handleCancel}>Cancel</button>
                </div>
            )}
        </>
    );
};

export default ReportButton;