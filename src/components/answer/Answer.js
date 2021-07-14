import React from 'react'
import styles from './answer.module.css'
export default function Answer(props) {
    const classes=[props.class, styles.answer]
    function createMarkup() {
        return {__html: props.val};
      }
    return (
    <button
     disabled={props.disableAnswer}
     className={classes.join(" ")} 
     onClick={props.click} 
     value={props.val}>
         {props.val}
     </button>

    )
}
