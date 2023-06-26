
import './MainScreen.css'
import React from 'react'
import Question from './Question'
import { nanoid } from "nanoid"
import { useOutletContext } from 'react-router-dom'


export default function MainScreen() {

    const [triviaData, setTriviaData] = React.useState([])
    const [answersChecked, setAnswersChecked] = React.useState(false)
    const [score, setScore] = React.useState(0)
    const { apiOptions } = useOutletContext()





    // fetch(`https://opentdb.com/api.php?amount=5`)

    async function getData() {
        let res = await fetch(`https://opentdb.com/api.php?amount=${apiOptions.number}${apiOptions.category !== "any" ? `&category=${apiOptions.category}` : ""}`)
        let data = await res.json()

        const dataArr = data.results.map((element, index) => {

            const correctAnswer = element.correct_answer;
            const incorrectAnswers = element.incorrect_answers;

            function createOptionsArray(incorrectAnswers, correctAnswer) {
                const randomNum = Math.floor(Math.random() * 4);
                let options = [...incorrectAnswers]
                options.splice(randomNum, 0, correctAnswer)
                return options.map(option => ({
                    option: option,
                    clicked: false,
                    id: nanoid(),
                    correctAnswer: false,
                    wrongAnswer: false,
                    index: index.toString()
                }))
            }

            return {
                question: element.question,
                correctAnswer: correctAnswer,
                incorrectAnswers: incorrectAnswers,
                options: createOptionsArray(incorrectAnswers, correctAnswer)
            }
        })
        console.log(dataArr)
        setTriviaData(dataArr)
    }


    React.useEffect(() => {
        getData()
    }, [])




    function clicked(event) {
        const index = event.target.getAttribute('data-index')
        const id = event.target.id
        setTriviaData(prevData => {
            return prevData.map(obj => {
                return {
                    ...obj,
                    options: obj.options.map(option => {

                        if (option.id === id) {
                            return {
                                ...option,
                                clicked: true
                            }
                        } else if (option.index === index) {
                            return {
                                ...option,
                                clicked: false
                            }
                        } else {
                            return option
                        }

                    })
                }
            })
        })
    }


    function checkAnswers() {

        setTriviaData(prevData => {
            return prevData.map(prevObj => ({
                ...prevObj,
                options: prevObj.options.map(option => {
                    if (prevObj.correctAnswer === option.option) {

                        if (option.clicked && prevObj.correctAnswer === option.option) {
                            setScore(prevScore => prevScore + 1)
                        }

                        return {
                            ...option,
                            correctAnswer: true
                        }
                    } else if (option.clicked) {
                        return {
                            ...option,
                            wrongAnswer: true
                        }
                    }

                    return option
                })
            }))
        })
        setAnswersChecked(true)
    }


    function playAgain() {
        getData()
        setAnswersChecked(false)
        setScore(0)
    }


    const questions = triviaData.map(triviaObj => {
        return (
            <Question
                question={triviaObj.question}
                options={triviaObj.options}
                clicked={clicked}
                key={nanoid()}
                data={triviaObj}
                answersChecked={answersChecked}
            />
        )
    })


    return (
        <div className='main'>
            <div>
                {triviaData.length > 0 ? questions : <h2>loading...</h2>}
            </div>
            {
                answersChecked ?
                    <div className='main-score'>
                        <div>{`You scored ${score}/4 correct answers`}</div>
                        <button className='main-button play-again-button' onClick={playAgain}>Play again</button>
                    </div> :
                    triviaData.length > 0 && <button className='main-button check-answer-button' onClick={checkAnswers}>Check answers</button>
            }
        </div>
    )
}