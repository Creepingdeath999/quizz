import React from 'react'
import styles from './answer.module.css'
export default function Answer(props) {
    const classes=[props.class, styles.answer]
    return (
    <button
     style={props.type}
     disabled={props.disableAnswer}
     className={classes.join(" ")} 
     onClick={props.click} 
     value={props.val}>
         {props.val}
     </button>

    )
}
