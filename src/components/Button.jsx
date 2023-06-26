import React from "react"

export default function Button(props) {

    const { correctAnswer, wrongAnswer, clicked, id, option, index } = props.optionObj

    function setStyle() {

        if (correctAnswer) {
            return {
                backgroundColor: "#94D7A2",
                border: "1px solid #94D7A2"
            }
        } else if (wrongAnswer) {
            return {
                backgroundColor: "#F8BCBC",
                border: "1px solid #F8BCBC",
                opacity: '0.5'
            }
        } else if (clicked) {
            return {
                backgroundColor: "#D6DBF5",
                border: "1px solid #D6DBF5"
            }
        } else {
            return {}
        }
    }

    const style = setStyle()

    return (
        <button
            onClick={!props.answersChecked ? (event) => props.clicked(event) : null}
            style={style}
            className={'option'}
            id={id}
            data-index={index}
        >
            {option}
        </button>
    )
}