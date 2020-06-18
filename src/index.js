import React from 'react'
import ReactDOM from "react-dom";
import './sass/global.scss'
import GameController from './containers/GameController'
import { mainWidth } from './constants';

class App extends React.Component {
    render(){
        return (
            <div className="main" style={{width: mainWidth() }}>
                <GameController />
                <p>SPACE BAR for shooting, ARROWS for moving </p>
            </div>)
        
    }
}

ReactDOM.render(<App />, document.querySelector("#app"));