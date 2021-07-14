import React, { useEffect, useContext, useState } from 'react'
import { QuestionContext } from '../../context/QuestionContext'
import { useHistory } from 'react-router'
import axios from 'axios'
import Answer from '../../components/answer/Answer'
import styles from './Questions.module.css'
import Question from '../../components/Question/Question'
import Finish from '../../components/finish/Finish'

import { NavLink, Redirect } from 'react-router-dom'
export default function Questions() {

    ///state
    const { categories } = useContext(QuestionContext)
    const [category] = categories
    let history = useHistory()
    const { difficulties } = useContext(QuestionContext)
    const [difficulty] = difficulties

    const { answerValue } = useContext(QuestionContext)
    const [answer, setAnswer] = answerValue

    const url = `https://opentdb.com/api.php?amount=10&category=${category}&difficulty=${difficulty}&type=multiple`
    const [questions, setQuestions] = useState(null)
    const [loading, setLoading] = useState(true)
    const [content, setContent] = useState(null)
    
    const {indexes} = useContext(QuestionContext)
    const [index, setIndex] = indexes
    
    const {scores} = useContext(QuestionContext)
    const [score, setScore] = scores

    const [disable, setDisable] = useState(false)
    const [correct, setCorrect]= useState('')
    useEffect(() => {

        axios.get(url)
            .then(res => {
                if (res.data) {
                    const data = res.data.results
                    setQuestions(data)
                    setLoading(false)

                    if (questions && res.data) {
                        generateQuestion()
                    } else {
                        setLoading(false)
                    }
                }
            })

    }, [loading])

    function shuffle(array) {
        var currentIndex = array.length,  randomIndex;
      
        // While there remain elements to shuffle...
        while (0 !== currentIndex) {
      
          // Pick a remaining element...
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex--;
      
          // And swap it with the current element.
          [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
        }
      
        return array;
      }

    function generateQuestion() {
        const c = questions.map(question => {
            let formatedQuestion = {
                question: question.question
            }
            const answers = [...question.incorrect_answers, question.correct_answer]
            shuffle(answers)
            formatedQuestion.answer= question.correct_answer
            formatedQuestion.answers = answers
            console.log(formatedQuestion)
            return formatedQuestion
        })
        setContent(c)
    }
    const [disableAnswer, setDisableAnswer] = useState(false)
    //Control Questions
    function nextQuestion() {
        setIndex(index + 1)
        if (index>=9) {setDisable(true)}
        else{
            setCorrect('')
            setDisableAnswer(false)
        }
    }
    //unicode converter

    //check answers
    let style;
    function displayCorrectAnswer () {
        setCorrect(content[index].answer)
    }
    
     function check() {
        if (content[index].answer === answer) {
            console.log("right")
            setScore(score + 1)
            setDisableAnswer(true)
            nextQuestion()
        } else {
            setDisableAnswer(true)
            nextQuestion()  
        }

    }
    //try again
    function tryAgain () {
        setIndex(0)
        setCorrect('')
        setDisable(false)
        setDisableAnswer(false)
        setScore(0)
    }

   let loader= <h1>LOADING</h1>;
   if(index  > 9) {
       loader=<Finish score={score} click={tryAgain} />
   }
    return (
        <div className={styles.container}>
               <NavLink to="/">HOME</NavLink>
           {index<=9 ? <span>{index+1}/10</span> : null }
            {
                content && index <=9 ?
                
                <div className={styles.question}>
                    <h1>{score}</h1>
                     <Question content={content[index].question} />
                    <h2 style={style}>{correct}</h2>
                    
                        {
                          content[index].answers.map(a=>(
                              <div key={a} className={styles.answers}> 
                              <Answer 
                              disableAnswer={disableAnswer} 
                              val={a} 
                              click={(e)=>{setAnswer(e.target.value); displayCorrectAnswer()}} />
                              </div>
                          ))
                        }
                        <button disabled={disable} onClick={() => {check()}}>{index<=8 ? "NEXT" :"RESULT"}</button>
                    </div>

                : loader
            }
        </div>
    )

}