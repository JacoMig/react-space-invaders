import React, {useEffect, useState} from 'react'
import Alien from './Alien'

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //Il max è escluso e il min è incluso
  }


const Aliens = (props) => {
    const [aliens, setAliens] = useState([])
    
    const deleteAlien = (id) => {
       setAliens(aliens.filter(al => al.id !== id))
    }
    
    let i = 0
    const createAlien = () => {
        let randomX;
        setTimeout(() => {
            randomX = getRandomInt(20, 500)
            if(i <= 10){
                setAliens((state) => [...state, {id: i,  x: randomX}])
              
                createAlien()
            }else{
               return
            }
            i++
        }, 500)
       
    }

    useEffect(() => {
        createAlien(i)
    }, [])

    useEffect(() => {
        deleteAlien(props.alienToDelete)
    }, [props.alienToDelete])

    return (
        aliens.map((alien, i) => (
            <Alien key={alien.id} /* getAlienPos={(alienPos) => props.getAlienPos(alienPos) } */ alien={alien}  deleteAlien={(id) => deleteAlien(id) } />
        ))
    )
}

export default Aliens