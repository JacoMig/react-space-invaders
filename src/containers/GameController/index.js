import React, {useState, useEffect} from 'react'
import Shuttle from '../../components/Shuttle'
import Aliens from '../../components/Aliens'
import {uniqBy} from 'lodash'
 
var is_colliding = function( $div1, $div2 ) {
	// Div 1 data
	var d1_offset             = $div1.getBoundingClientRect();
	var d1_height             = $div1.offsetHeight;
	var d1_width              = $div1.offsetWidth;
	var d1_distance_from_top  = d1_offset.top + d1_height;
	var d1_distance_from_left = d1_offset.left + d1_width;

	// Div 2 data
	var d2_offset             = $div2.getBoundingClientRect();
	var d2_height             = $div2.offsetHeight;
	var d2_width              = $div2.offsetWidth;
	var d2_distance_from_top  = d2_offset.top + d2_height;
	var d2_distance_from_left = d2_offset.left + d2_width;

	var not_colliding = ( d1_distance_from_top < d2_offset.top || d1_offset.top > d2_distance_from_top || d1_distance_from_left < d2_offset.left || d1_offset.left > d2_distance_from_left );
    return ! not_colliding;
}; 

const GameController = () => {
    const [shuttlePosition, setShuttlePosition] = useState(0);
    /* const [aliens, setAliens] = useState([])
    const [moveAlienTimer, setMoveAlienTimer] = useState() */
    const [gameController, setGameController] = useState()
    const [idToDelete, setIdToDelete] = useState(0)
    
    useEffect(() => {
        setGameController(setInterval(() => {
            const aliens = document.querySelectorAll('.alien');
            const drop = document.querySelector('.drop')
            if(aliens.length > 0){
                aliens.forEach(alien => {
                    if(drop){
                        if(is_colliding(alien, drop)){
                          //  alien.style.display = 'none'
                            setIdToDelete(parseInt(alien.id))
                        }
                    }
                })
            }else {
                clearInterval(gameController)
            }
            
        }, 20))
    }, [])

    return (
        <>
            <Aliens alienToDelete={idToDelete} />
            <Shuttle  /* shuttlePos={(position) => setShuttlePosition(position) } */ />
        </>
    )
}


export default GameController