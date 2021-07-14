import React from 'react'

export default function Question(props) {
    function createMarkup() {
        return {__html: props.content};
      }
    return (
        <div>
           <p dangerouslySetInnerHTML={createMarkup()}></p>
        </div>
    )
}
