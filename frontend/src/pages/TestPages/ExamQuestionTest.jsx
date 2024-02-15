import QuestionComponent from "../../components/QuestionComponent/QuestionComponent"

function ExamQuestionTest() {

    const oneAnswerQuestion = {
        questionID: "p1_s_2_w_2022_2",
        questionTopic: "Series",
        questionsGrid: [
          "The first, second and third terms of an arithmetic progression are a, 2a and a^2 respectively, where a is a positive constant. Find the sum of the first 50 terms of the progression."
        ],
        questionsFiguresGrid: [
          ""
        ],
        answersTypeGrid: [
          "Expression"
        ],
        answersGrid: [
          "3825"
        ],
        questionSource: "Pure Mathematics I"
    }

    const contextQuestion = {
        questionID: "s1_p_5_w_2022_2",
        questionTopic: "Probability",
        questionsGrid: [
            "Eric has three coins. One of the coins is fair. The other two coins are each biased so that the probability of obtaining a head on any throw is 1/4, independently of all other throws. Eric throws all three coins at the same time. Events A and B are defined as follows. A: all three coins show the same result B: at least one of the biased coins shows a head",
            "Find P(B).",
            "Find P(A|B)."
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
            "",
            "7/16",
            "1/14"
        ],
        questionSource: "Probability and Statistics I"
    }

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
        <QuestionComponent question={contextQuestion} mqNum={1}/>
    )
}

export default ExamQuestionTest;