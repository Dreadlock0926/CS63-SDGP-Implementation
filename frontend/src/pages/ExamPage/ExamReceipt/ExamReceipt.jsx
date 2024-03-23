import Axios from "axios";
import { useEffect, useState } from "react";
import "./ExamReceipt.css";
import { useLocation, useNavigate } from "react-router-dom";

function ExamReceipt() {

    const navigator = useNavigate();


    const [examID, setExamID] = useState("");
    const [mark, setMark] = useState("");
    const [examType, setExamType] = useState("");

    const [loadingInfo, setLoadingInfo] = useState(true);

    const location = useLocation();

    useEffect(() => {
        setExamID(location.state.examRef);
    }, [])

    useEffect(() => {
        setLoadingInfo(true);
    }, [mark])

    const getReceipt = async () => {

        try {
            const response = await Axios.post('http://localhost:8000/exam/getReceipt', {
                "examRef":examID
            });    
            const receiptData = response.data;

            setMark(Math.round((receiptData.mark/receiptData.totalMark)*100));
            setExamType(receiptData.examType);


        } catch (err) {
            console.log(err);
        }

    }

    useEffect(() => {
        if (examID) {
            getReceipt();
        }
    }, [examID])

    const returnToExam = () => {

        navigator("/examdashboard");
    }

    const goToReview = () => {

        navigator(`/exam-review/${examID}`);
    }

    return (
        <div className="receipt-centerer">
            <div className="receipt-container">
                <div className="receipt-top">
                    <h2>Your submission is complete!</h2>
                </div>
                <div className="receipt-bottom">
                    <p>The results for the {examType} Exam you have taken have been calculated, your mark will be displayed shortly.</p>
                    <div className="mark-container">
                            <div className="mark-title">Mark</div>
                            <div className="mark">{loadingInfo && mark}%</div>
                        </div>
                    <div className="receipt-buttons-container">
                        <button onClick={goToReview}>Check Results</button>
                        <button onClick={returnToExam}>Return to Exam Page</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ExamReceipt;