import React, { useEffect, useContext, useState } from 'react'
import { QuestionContext } from '../../context/QuestionContext'
import axios from 'axios'
import Answer from '../../components/answer/Answer'
import styles from './Questions.module.css'
import Question from '../../components/Question/Question'
import Finish from '../../components/finish/Finish'
import Spinner from '../../components/spinner/Spinner'
import Home from '../../components/homeBtn/Home'
export default function Questions() {

    ///context
    const { categories, difficulties , answerValue,indexes,scores } = useContext(QuestionContext)
    
    const [category] = categories
    const [difficulty] = difficulties
    const [answer, setAnswer] = answerValue
    const [index, setIndex] = indexes
    const [score, setScore] = scores
    
    const url = `https://opentdb.com/api.php?amount=10&category=${category}&difficulty=${difficulty}`
    //local state
    const [questions, setQuestions] = useState(null)
    const [loading, setLoading] = useState(true)
    const [content, setContent] = useState(null)
    const [disable, setDisable] = useState(true)
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
        const q = questions.map(question => {
            let formatedQuestion = {
                question: question.question
            }
            const answers = [...question.incorrect_answers, question.correct_answer]
            shuffle(answers)
            formatedQuestion.answer= question.correct_answer
            formatedQuestion.answers = answers
            return formatedQuestion
        })
        setContent(q)
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

    function displayCorrectAnswer () {
        setCorrect(content[index].answer)
        setDisable(false)
        setDisableAnswer(true)
    }
     function check() {
        if (content[index].answer === answer) {
            setScore(score + 1)
            setDisableAnswer(false)
            nextQuestion()

        } else {
            setDisableAnswer(false)
            nextQuestion()           
        }
   setDisable(true)
    }
    //try again
    function tryAgain () {
        setIndex(0)
        setCorrect('')
        setDisable(true)
        setDisableAnswer(false)
        setScore(0)
    }

   let loader= <Spinner />
   if(index  > 9) {
       loader=<Finish score={score} click={tryAgain} />
   }
    return (
        index<10 && content ?
        <div className={styles.container}>
            <header> 
             <Home />
                {index<=9 ? <span>{index+1}/10</span> : null }
            </header>
                <div className={styles.question}>
                    <h1>SCORE: {score}</h1>
                     <Question content={content[index].question} />
                    <h2>{correct}</h2>
                    
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
            
        </div> :loader
    )

}
