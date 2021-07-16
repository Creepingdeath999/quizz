import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { QuestionContext } from '../../context/QuestionContext'


export default function Home() {
   
    const {indexes,scores}=useContext(QuestionContext)
    const [index, setIndex] = indexes

     const [score, setScore] =scores

     function reset() {
         setScore(0)
         setIndex(0)
     }

    return (
       <Link onClick={reset} to="/">HOME</Link>
    )
}
