import React from 'react'
import Difficulty from './ChooseDifficulty/Difficulty'
import Category from '../Choise/ChooseCategory/Category'
import { Link } from 'react-router-dom'
import styles from './Choose.module.css'
export default function Choose() {
    
    return (
        <div className={styles.Home}>
            <Category />
            <Difficulty/>
            <Link className={styles.button} to='/game'>START</Link>
        </div>
    )
}
