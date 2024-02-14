import "./QuestionComponent.css"

function QuestionComponent() {

    return (
        <>
        <div className="question-component-container">
            <div className="main-text-container">
                <div className="mq-num">1</div>
                <div className="main-text">The lengths of the rods produced by a company are normally distributed with mean 55.6 mm
                and standard deviation 1.2 mm.</div>
            </div>
            <div className="sub-question-container">
                <div className="sub-question">
                    <div className="sub-question-text-container">
                        <div className="sq-num">a</div>
                        <div className="sub-question-text">In a random sample of 400 of these rods, how many would you expect to have
                        length less than 54.8mm?</div>
                    </div>
                    <div className="figure-for-sub-question"></div>
                    <div className="answer-for-sub-question">
                        <input className="answer-input" placeholder="Answer..."></input>
                        <div className="mark-for-sq">(2 marks)</div>
                    </div>
                </div>
                <div className="sub-question">
                    <div className="sub-question-text-container">
                        <div className="sq-num">b</div>
                        <div className="sub-question-text">Find the probability that a randomly chosen rod produced by this company
                        has a length that is within half a standard deviation of the mean.</div>
                    </div>
                    <div className="figure-for-sub-question"></div>
                    <div className="answer-for-sub-question">
                        <input className="answer-input" placeholder="Answer..."></input>
                        <div className="mark-for-sq">(2 marks)</div>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
}

export default QuestionComponent;