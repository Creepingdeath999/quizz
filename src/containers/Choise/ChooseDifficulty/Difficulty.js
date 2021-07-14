import React, {useContext, useState} from 'react'
import Button from '../../../components/button/Button'
import styles from '../Choose.module.css'
import {QuestionContext} from '../../../context/QuestionContext'
export default function ChooseCategory(props) {

   const {difficulties} = useContext(QuestionContext)
   const [difficulty, setDifficulty] = difficulties

   
    return (
        <div className={styles.difficulty}>
            <Button  val="easy"   click={(e)=>{setDifficulty(e.target.value)}} />
            <Button  val="medium" click={(e)=>{setDifficulty(e.target.value)}} />
            <Button  val="hard"   click={(e)=>{setDifficulty(e.target.value)}} />
        </div>
    )
}
