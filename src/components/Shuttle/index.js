import React, {useEffect, useState} from 'react'
import shuttleUrl from '../../image/shuttle.svg'
import Drop from '../Drop'

const Shuttle = (props) => {
    const [leftValue, setLeftValue] = useState(null)
    const [isMoving, setIsMoving] = useState({pressed: false, key: ''})
    let [intervalMove, setIntervalMove] = useState()
    
    const [drops, setDrops] = useState([])
    
    let i = 1;
    
    const downHandler = ({key, code}) => {
        if(key === 'ArrowRight' || key === 'ArrowLeft') {
            setIsMoving({pressed: true, key})
        } 

        if(code === "Space"){
            i++
            setDrops(state =>  [...state, {id: i, y: document.querySelector('.shuttle').offsetLeft}])
        }
    }


    const upHandler = ({ key, code }) => {
       setIsMoving({pressed: false, key})
    };

    const moveShuttle = (key) => {
        const offsetLeft = document.querySelector('.shuttle').offsetLeft
        if(offsetLeft < window.innerWidth - 80 && key === "ArrowRight"){
            setLeftValue((prev) => prev+=20)
         //   props.shuttlePos(offsetLeft + 50)
        }else if(offsetLeft > 40 && key === "ArrowLeft"){
            setLeftValue((prev) => prev-=20)
          //  props.shuttlePos(offsetLeft - 20)
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
       // props.shuttlePos({x: offsetLeft, y: offsetTop })
        window.addEventListener('keydown', downHandler);
        window.addEventListener('keyup', upHandler);
        // Remove event listeners on cleanup
        return () => {
          window.removeEventListener('keydown', downHandler);
          window.removeEventListener('keyup', upHandler);
        };
    }, []); 


    return (
        <>
            <div className="shuttle" style={{left: leftValue}}>
                <img src={shuttleUrl} />
            </div>
            {drops.map((drop, i) => (
                <Drop key={drop.id} left={drop.y} deleteDrop={(id) => setDrops(drops.filter(d => d.id !== drop.id)) } />
            ))}
        </>
    )
}

export default Shuttle

