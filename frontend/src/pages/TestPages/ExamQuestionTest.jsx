import { useState } from "react";
import QuestionComponent from "../../components/QuestionComponent/QuestionComponent"
import Axios from 'axios';

function ExamQuestionTest() {

    const noContextTestQuestion = {
        questionID: "s1_pac_7_w_2022_2",
        questionTopic: "Permutations and combinations",
        questionsGrid: [
            "Find the number of different arrangements of the 9 letters in the word ALLIGATOR in which the two As are together and the two Ls are together.",
            "The 9 letters in the word ALLIGATOR are arranged in a random order. Find the probability that the two Ls are together and there are exactly 6 letters between the two As. ",
            "Find the number of different selections of 5 letters from the 9 letters in the word ALLIGATOR which contain at least one A and at most one L."
        ],
        questionsFiguresGrid: [
            "",
            "",
            ""
        ],
        answersTypeGrid: [
            "Expression",
            "Expression",
            "Expression"
        ],
        answersGrid: [
            "5040",
            "0.0132",
            "35"
        ],
        questionSource: "Probability and Statistics I"
    }

    return (
        <>
        <QuestionComponent question={noContextTestQuestion} mqNum={1}/>
        </>
    )

}

export default ExamQuestionTest;