import React from 'react'
import ReactDOM from "react-dom";
import './sass/global.scss'
import GameController from './containers/GameController'

class App extends React.Component {
    render(){
        return (
            <div className="main">
                <GameController />
            </div>)
        
    }
}

ReactDOM.render(<App />, document.querySelector("#app"));