import "./QuestionComponent.css"

function SubQuestion( {sqNum, sqText} ) {
    return (
        <div className="sub-question">
        <div className="sub-question-text-container">
            <div className="sq-num">{sqNum}</div>
            <div className="sub-question-text">{sqText}</div>
        </div>
        <div className="figure-for-sub-question"></div>
        <div className="answer-for-sub-question">
            <input className="answer-input" placeholder="Answer..."></input>
            <div className="mark-for-sq">(2 marks)</div>
        </div>
    </div>
    )
}

function QuestionComponent( {question, mqNum} ) {

    return (
        <>
        <div className="question-component-container">
            <div className="main-question-container">
                <div className="main-text-container">
                    <div className="mq-num">1</div>
                    <div className="main-text">The lengths of the rods produced by a company are normally distributed with mean 55.6 mm
                    and standard deviation 1.2 mm.</div>
                </div>
                {/* <input className="answer-input" placeholder="Answer..."></input> */}
            </div>
            <div className="sub-question-container">
                    <SubQuestion sqNum={"a"} sqText={"In a random sample of 400 of these rods, how many would you expect to have length less than 54.8mm?"} />
                    <SubQuestion sqNum={"b"} sqText={"Find the probability that a randomly chosen rod produced by this company has a length that is within half a standard deviation of the mean."} />
            </div>
        </div>
        <div className="question-component-container">
            <div className="main-question-container">
                <div className="main-text-container">
                    <div className="mq-num">1</div>
                    <div className="main-text">The lengths of the rods produced by a company are normally distributed with mean 55.6 mm
                    and standard deviation 1.2 mm.</div>
                </div>
                {/* <input className="answer-input" placeholder="Answer..."></input> */}
            </div>
            <div className="sub-question-container">
                    <SubQuestion sqNum={"a"} sqText={"In a random sample of 400 of these rods, how many would you expect to have length less than 54.8mm?"} />
                    <SubQuestion sqNum={"b"} sqText={"Find the probability that a randomly chosen rod produced by this company has a length that is within half a standard deviation of the mean."} />
            </div>
        </div>
        <div className="question-component-container">
            <div className="main-question-container">
                <div className="main-text-container">
                    <div className="mq-num">1</div>
                    <div className="main-text">The lengths of the rods produced by a company are normally distributed with mean 55.6 mm
                    and standard deviation 1.2 mm.</div>
                </div>
                {/* <input className="answer-input" placeholder="Answer..."></input> */}
            </div>
            <div className="sub-question-container">
                    <SubQuestion sqNum={"a"} sqText={"In a random sample of 400 of these rods, how many would you expect to have length less than 54.8mm?"} />
                    <SubQuestion sqNum={"b"} sqText={"Find the probability that a randomly chosen rod produced by this company has a length that is within half a standard deviation of the mean."} />
            </div>
        </div>
        </>
    );
}

export default QuestionComponent;