import React, {useEffect, useState} from 'react'
import Alien from './Alien'
import {getRandomInt} from '../../utils/getRandomInt'
import {totalAliens, mainWidth} from '../../constants'

const Aliens = (props) => {
    const [aliens, setAliens] = useState([])
    
    const deleteAlien = (id) => {
       setAliens(aliens.filter(al => al.id !== id))
    }
    
    let i = 0
    const createAlien = () => {
        let xPos;
        setTimeout(() => {
            xPos = getRandomInt(20, ( mainWidth() - 50 ))
            if(i <= totalAliens){
                setAliens((state) => [...state, {id: i,  x: xPos}])
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
        if(props.alienToDelete !== null){
            deleteAlien(props.alienToDelete)
            // console.log('deleteAlien', props.alienToDelete)
        }
    }, [props.alienToDelete])

    return (
        aliens.map((alien, i) => (
            <Alien key={alien.id} alien={alien}  deleteAlien={(id) => deleteAlien(id) } />
        ))
    )
}

export default Aliens