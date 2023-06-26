import './StartScreen.css'
import { useNavigate, useOutletContext } from 'react-router-dom'
import { useEffect, useState } from 'react'

export default function StartScreen() {
    const navigation = useNavigate()
    const [questionCategories, setQuestionCategories] = useState([])
    const { setApiOptions, apiOptions } = useOutletContext()

    useEffect(() => {
        fetch(`https://opentdb.com/api_category.php`)
            .then(res => res.json())
            .then(data => {
                setQuestionCategories(data.trivia_categories)
            })
    }, [])

    const questionCategoryOptions = questionCategories.map(questionCategory => (
        <option key={questionCategory.id} value={questionCategory.id}>{questionCategory.name}</option>
    ))


    return (
        <div className="start-screen">
            <h1 className="heading">Quizzical</h1>
            <p className="subheading">Let's answer some questions</p>
            <form>
                <label htmlFor="category">Select Category </label>
                <select
                    name="category"
                    id="category"
                    onChange={e => {
                        setApiOptions(prevState => {
                            return {
                                ...prevState,
                                ['category']: e.target.value
                            }
                        })
                    }}
                >
                    <option value="any">Any category</option>
                    {questionCategoryOptions}
                </select>
                <br />
                <label htmlFor="number">Number of Questions</label>
                <input
                    name='number'
                    type="number"
                    value={apiOptions.number}
                    onChange={e => {
                        setApiOptions(prevState => {
                            return {
                                ...prevState,
                                ["number"]: e.target.value
                            }
                        })
                    }}
                />
            </form>
            <button className="button" onClick={() => navigation('main')}>Start quiz</button>
        </div>
    )
}