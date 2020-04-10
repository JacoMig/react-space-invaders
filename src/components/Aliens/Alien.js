import React,{useState, useEffect} from 'react'
import alienSrc from '../../image/alien.svg'
import {getRandomInt} from '../../utils/getRandomInt'

const Alien = (props) => {
    const [topPos, setTopPos] = useState(20)
    const [myInterval, setMyInterval] = useState()
    
    useEffect(() => {
        setMyInterval(setInterval(() => {
           setTopPos(prev => prev+=5)
        }, getRandomInt(20, 50))) 
    },[])


    useEffect(() => {
        return () => {
            clearInterval(myInterval)
        }
    }, [myInterval])

    useEffect(() => {
        if(topPos >= window.innerHeight - 50){
            props.deleteAlien(props.alien.id)
            clearInterval(myInterval)
        }
    },[topPos])

    
    return (
        <div className="alien" id={props.alien.id} style={{left: props.alien.x, top: topPos}}>
            <img src={alienSrc} />
        </div>
    )
}

export default Alien