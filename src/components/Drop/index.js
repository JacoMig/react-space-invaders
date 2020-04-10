import React, {useEffect, useState} from 'react'

const Drop = (props) => {
    const [myInterval, setMyInterval] = useState()
    const [topPos, setTopPos] = useState(props.startPos)
    
    useEffect(() => {
        setMyInterval(setInterval(() => {
            setTopPos(prev => prev+=20)
        }, 50))
    }, [])

    useEffect(() => {
        if(topPos > window.innerHeight - 50){
            clearInterval(myInterval)
            props.deleteDrop()
        }
    }, [topPos])

    return (
        <div className="drop" style={{bottom: topPos, left: props.left}}>
        </div>
    )
}

export default Drop