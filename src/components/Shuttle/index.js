import React, {useEffect, useState} from 'react'
import shuttleUrl from '../../image/shuttle.svg'
import explosionUrl from '../../image/explosion.gif'
import Drop from '../Drop'
import {mainWidth} from '../../constants'


const Shuttle = (props) => {
    const [leftValue, setLeftValue] = useState( (mainWidth()/2) - 25 )
    const [isMoving, setIsMoving] = useState({pressed: false, key: ''})
    let [intervalMove, setIntervalMove] = useState()
    const [drops, setDrops] = useState([])
    
    let i = 1;
    
    const downHandler = ({key, code}) => {
        if(!props.explosion){
            if(key === 'ArrowRight' || key === 'ArrowLeft') {
                setIsMoving({pressed: true, key})
            } 
            if(code === "Space"){
                i++
                setDrops(state =>  
                    [...state, 
                    {id: i, y: document.querySelector('.shuttle').offsetLeft + 25}
                ])
            }
        }
    }

    const upHandler = ({ key, code }) => {
        if(!props.explosion){
            setIsMoving({pressed: false, key})
        }
    };

    const moveShuttle = (key) => {
        const offsetLeft = document.querySelector('.shuttle').offsetLeft
        if(offsetLeft < window.innerWidth - 120 && key === "ArrowRight"){
            setLeftValue((prev) => prev+=20)
        }else if(offsetLeft > 40 && key === "ArrowLeft"){
            setLeftValue((prev) => prev-=20)
        }else {
            clearInterval(intervalMove)
        }
    }

    useEffect(() => {
        if(isMoving.pressed){
            setIntervalMove(setInterval(() => {
                moveShuttle(isMoving.key)
            }, 100))
        }else{
            clearInterval(intervalMove)
        }
    },[isMoving.pressed])

    useEffect(() => {
        window.addEventListener('keydown', downHandler);
        window.addEventListener('keyup', upHandler);
        return () => {
          window.removeEventListener('keydown', downHandler);
          window.removeEventListener('keyup', upHandler);
        };
    }, []); 


    return (
        <div className="shuttle-container">
            <div className="shuttle" style={{left: leftValue}}>
                 <img src={!props.explosion ? shuttleUrl : explosionUrl} />
            </div>
            {drops.map((drop, i) => (
                <Drop 
                    key={drop.id} 
                    left={drop.y} 
                    startPos={70}
                    deleteDrop={(id) => setDrops(drops.filter(d => d.id !== drop.id)) } />
            ))}
        </div>
    )
}

export default Shuttle

