import React, {useContext} from 'react'
import {QuestionContext} from '../../../context/QuestionContext'
import styles from '../Choose.module.css'
export default function Category() {
    const {categories} = useContext(QuestionContext)
    const [category, setCategory] = categories

    console.log(category)
    return (
        <div className={styles.selector}>
            <select onChange={(e)=>{setCategory(e.target.value)}} id="categories" name="categories">
                <option value={9}>General Knowledge</option>
                <option value={12}>Music</option>
                <option value={22}>Geography</option>
                <option value={21}>Sports</option>
                <option value={23}>History</option>
                <option value={11}>Movies</option>
                <option value={10}>Books</option>
                <option value={25}>Art</option>
                <option value={24}>Politics</option>
            </select>
        </div>
    )
}
