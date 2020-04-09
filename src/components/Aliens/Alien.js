import React,{useState, useEffect} from 'react'

const Alien = (props) => {
    const [topPos, setTopPos] = useState(20)
    const [myInterval, setMyInterval] = useState()
    
    useEffect(() => {
        setMyInterval(setInterval(() => {
           setTopPos(prev => prev+=5)
        }, 50)) 
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
        }else {
            // props.getAlienPos(document.querySelectorAll('.alien'))
           //console.log({x: props.alien.x, y: topPos})
        }
    },[topPos])

    
    return (
        <div className="alien" id={props.alien.id} style={{left: props.alien.x, top: topPos}}>
        </div>
    )
}

export default Alien