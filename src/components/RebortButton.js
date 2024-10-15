import { useState } from 'react';

const ReportButton = ({ documentId, onReport, showButtons, setShowButtons}) => {
    const [isReporting, setIsReporting] = useState(false);
    const [reportReason, setReportReason] = useState('');

    const handleSubmit = () => {
        console.log("Report reason selected:", reportReason); // Add this log
        if (reportReason) {
            console.log("Submitting report for document:", documentId); // Add this log
            onReport(documentId, reportReason);
            setIsReporting(false); // Close the modal or form
            setShowButtons(true); // show buttons again after submitting report
        } else {
            console.log("No report reason selected.");
        }
    };

    const handleCancel = () => {
        setIsReporting(false); // Close the modal
        setShowButtons(true);   // Show the buttons when the modal is closed
    };

    return (
        <>
            {/* Hide the report button when modal is open */}
            {showButtons && <button onClick={() => { setIsReporting(true); setShowButtons(false); }}>Report</button>}
            {isReporting && (
                <div className="report-modal">
                    <h4>Report Document</h4>
                    <select value={reportReason} onChange={(e) => setReportReason(e.target.value)}>
                        <option value="">Select reason</option>
                        <option value="inappropriate">Inappropriate content</option>
                        <option value="spam">Spam</option>
                        <option value="other">Other</option>
                    </select>
                    <button onClick={handleSubmit}>Submit Report</button>
                    <button onClick={handleCancel}>Cancel</button>
                </div>
            )}
        </>
    );
};
export default ReportButton;