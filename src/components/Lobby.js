import React, { Component } from 'react'
import * as request from 'superagent'

class Lobby extends Component {
    
    newGame = async () => {
        const { history } = this.props
        try {
            const response = await request.post('http://localhost:4000/games')
            history.push(`/games/${response.body.id}`)  
        }
        catch(error){ console.log(error) } 
    }

    render () {
        const { history } = this.props

        return (
            <div className="wrapper">
                <ul className="menu">
                    <li onClick={this.newGame}>Nieuw spel</li>
                    <li onClick={()=> history.push(`/info`)}>Info</li>
                </ul>
            </div>
        )
    }
}

export default Lobby