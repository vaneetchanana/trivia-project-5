import Button from './Button'
import { nanoid } from 'nanoid'

export default function Question(props) {
    // console.log(props.answersChecked)
    // const [data, setData] = useState(props.data)

    // function clicked(event) {
    //     setData(prevData => {
    //         return {
    //             ...prevData,
    //             options : prevData.options.map(option => {
    //                 return {
    //                     ...option,
    //                     clicked : option.clicked ? false : event.target.id === option.id ? true : option.clicked
    //                 }
    //             })
    //         }
    //     })
    // }


    // function checkAnswers() {

    //     console.log('checking answers')
    //     setData(prevData => {
    //         console.log(prevData)
    //         return prevData.map(prevObj => ({
    //             ...prevObj,
    //             options: prevObj.options.map(option => {
    //                 if (prevObj.correctAnswer === option.option) {

    //                     if (option.clicked && prevObj.correctAnswer === option.option) {
    //                         // setScore(prevScore => prevScore + 1)
    //                     }

    //                     return {
    //                         ...option,
    //                         correctAnswer: true
    //                     }
    //                 } else if (option.clicked) {
    //                     return {
    //                         ...option,
    //                         wrongAnswer: true
    //                     }
    //                 }

    //                 return option
    //             })
    //         }))
    //     })
    //     // setAnswersChecked(true)
    // }


    const buttons = props.options.map(optionObj => {
        return (
            <Button
                optionObj={optionObj}
                clicked={props.clicked}
                key={nanoid()}
                answersChecked={props.answersChecked}
            />)
    })

    return (
        <div className="question">
            <h2 className="main-heading">{props.question}</h2>
            <div className="buttons">
                {buttons}
            </div>
            <hr className='divider' />
        </div>
    )
}