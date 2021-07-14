import React from 'react'
import styles from './Finish.module.css'
export default function Finish(props){

    return (
        <div className={styles.finish}>
            <h1>YOUR FINAL SCORE: {props.score}</h1>
            <button onClick={props.click}>TRY AGAIN</button>
        </div>
    )
}
