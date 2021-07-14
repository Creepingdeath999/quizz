import React from 'react'

export default function Button(props) {
    return (
       <button onClick={props.click} value={props.val.toLowerCase()}>{props.val.toUpperCase()}</button>
    )
}
