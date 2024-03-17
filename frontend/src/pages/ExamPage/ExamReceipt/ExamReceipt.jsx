import Axios from "axios";
import { useEffect, useState } from "react";
import "./ExamReceipt.css";

function ExamReceipt() {

    return (
        <div className="receipt-centerer">
            <div className="receipt-container">
                <div className="receipt-top">
                    <h2>Your submission is complete!</h2>
                </div>
                <div className="receipt-bottom">
                    <p>The results for the Feedback Exam you have taken have been calculated, your mark will be displayed shortly.</p>
                    <div className="mark-container">
                            <div className="mark-title">Mark</div>
                            <div className="mark">56%</div>
                        </div>
                    <div className="receipt-buttons-container">
                        <button>Check Results</button>
                        <button>Return to Exam Page</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ExamReceipt;