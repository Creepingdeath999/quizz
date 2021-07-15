import React from 'react'
import styles from './button.module.css'
export default function Button(props) {
    return (
       <button className={styles.difficulty} onClick={props.click} value={props.val.toLowerCase()}>{props.val.toUpperCase()}</button>
    )
}
