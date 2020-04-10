import React from 'react'

const Score = (props) => {
    return (
        <h5 className="score-text">Score <span>{props.score}</span></h5>
    )
}

export default Score