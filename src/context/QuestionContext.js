import React, {createContext, useState} from 'react'

export const QuestionContext = createContext()

export const ContextProvider = (props) =>{
    const [category, setCategory] = useState(9)
    const [difficulty, setDifficulty]= useState('easy')
    const [answer, setAnswer] = useState('')
    const [index, setIndex] = useState(0)
    const [score, setScore] = useState(0)
    return (
        <QuestionContext.Provider value={{categories:[category,setCategory], 
        difficulties:[difficulty,setDifficulty],
        answerValue:[answer, setAnswer],
        scores:[score,setScore],
        indexes:[index, setIndex]
        }}>
            {props.children}
        </QuestionContext.Provider>
    )
} 

