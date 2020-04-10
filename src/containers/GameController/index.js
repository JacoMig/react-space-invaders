import React, {useState, useEffect} from 'react'
import Shuttle from '../../components/Shuttle'
import Aliens from '../../components/Aliens'
import Score from '../../components/Score'
import {is_colliding} from '../../utils/isColliding'

const GameController = () => {
    const [hitShuttle, setHitShuttle] = useState(0);
    const [countScore, setCountScore] = useState(0);
    const [gameOver, setGameOver] = useState(false)
    const [explosion, setExplosion] = useState(false)
    const [gameController, setGameController] = useState()
    const [idToDelete, setIdToDelete] = useState(null)
    
    const handleShuttleHit = (hit) => {
        if(hit >= 5){
            setExplosion(true)
            setTimeout(() => {
                setGameOver(true)     
            }, 1000)
        } 
    }

    const retryGame = () => {
        setExplosion(false);
        setCountScore(0);
        setHitShuttle(0);
        setGameOver(false);
        setIdToDelete(null);
    }

    useEffect(() => {
        handleShuttleHit(hitShuttle)
    },[hitShuttle])

    useEffect(() => {
        setGameController(setInterval(() => {
            const aliens = document.querySelectorAll('.alien');
            const drop = document.querySelector('.drop')
            const shuttle = document.querySelector('.shuttle')
            if(aliens.length > 0){
                aliens.forEach(alien => {
                    if(drop && is_colliding(alien, drop)){
                        setIdToDelete(parseInt(alien.id))
                        setCountScore(state => state+=1)
                       // console.log('hit Alien', parseInt(alien.id))
                        
                    }
                    if(is_colliding(alien, shuttle)) {
                        setIdToDelete(parseInt(alien.id)) 
                        setHitShuttle(state => state+=1)
                     //   console.log('hit Shuttle')
                    }
                })
            }else {
                clearInterval(gameController)
            }
        }, 20))
    }, [])

    return (
        <>
            {!gameOver && 
                <>
                    <Score score={countScore} />
                    <Aliens alienToDelete={idToDelete} />
                    <Shuttle explosion={explosion} />
                </>
            || 
                <>
                    <h3 className="final-text">Game Over</h3>
                    <button className="retry-btn" onClick={retryGame}>Play again</button>
                </>
            }
        </>
    )
}


export default GameController