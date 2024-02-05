import NavBar from "../../components/NavigationBar/navBar.jsx";
import "../main.css"
import "../addQuestionsPage/addQuestions.css"

function QuestionSourcePanel() {

    return (
        <>
        <div className="panel-container">
            <div className="question-source-container">
                <form>
                    <label className="qs-input">
                        <p>Question Source</p>
                        <input className="qs-input" type="text" list="data" />
                        <datalist id="data">
                            <option value="Statistics I" />
                            <option value="Pure Mathematics I" />
                        </datalist>
                    </label>
                </form>
                <div className="question-specifier">
                    <p className="qs-pa">Is this question from a
                    Cambridge International AS and A Level Past 
                    Paper? </p>
                    <div className="qp-switch">
                        <div className="qp-sphere"></div>
                    </div>
                </div>
                <form>
                    <label>
                        <p>Question Number</p>
                        <input className="qn-input" type="text" name="ques-num" />
                    </label>
                    <label>
                        <p>Year</p>
                        <input className="qy-input" type="text" list="ques-year" />
                        <datalist id="ques-year">
                            <option value="May 2000" />
                            <option value="Oct 2000" />
                        </datalist>
                    </label>
                    <label>
                        <p>Variant</p>
                        <input className="qv-input" type="text" list="ques-var" />
                        <datalist id="ques-var">
                            <option value="1" />
                            <option value="2" />
                            <option value="3" />
                        </datalist>
                    </label>
                </form>
            </div>
        </div>
        </>
    );

}

function QuestionFinalPanel() {

    return (
    <div className="question-final-panel">
        <h2>Add Question</h2>
        <QuestionSourcePanel />
    </div>
    );

}

function AddQuestionsPage() {

    return(
        <>
        <NavBar />
        <QuestionFinalPanel />
        </>
    );   

}

export default AddQuestionsPage;