import React, { Component } from 'react'
import * as request from 'superagent'

class Game extends Component {
    state = {}
    
    async componentDidMount() {
        try {
            const response = await request.get(`http://localhost:4000/games/${this.props.match.params.id}`)
            this.setState({...response.body}) 
        }
        catch(error){ console.log(error) } 
    }
    
    newMove = async (coordinate) => {
        try {
            const response = await request
                .post(`http://localhost:4000/games/${this.props.match.params.id}`)
                .send({coordinate})
            
                console.log(response.body);

            this.setState({...response.body}) 
        }
        
        catch(error){console.log(error)}
    }
    
    render () {
        const {shipsGridUser, shotsGridUser, feedbackUser, feedbackComputer, scoreUser, scoreComputer, winner, turn, status} = this.state
        if(!shipsGridUser){ return 'loading'}
        
        return (
            <div className="game">
                <div className="wrapper">
                    <div className="ships-grid">
                        {shipsGridUser.map((row,rowIndex) => 
                            row.map((field,fieldIndex) => 
                                <div className={`ships-grid__field ${field && field !== 'oo' && 'ships-grid__boat'}`} key={`${rowIndex}${fieldIndex}`} >
                                    {field === 'xx' && <span className="ships-grid__hit">x</span>}
                                    {field === 'oo' && <span className="ships-grid__miss">o</span>}
                                </div>
                            )
                        )}
                    </div>
                    <div className="shots-grid">
                        {shotsGridUser.map((row,rowIndex) => 
                            row.map((field,fieldIndex) => 
                                <div className={`shots-grid__field`}
                                    key={`${rowIndex}${fieldIndex}`}>
                                    <button onClick={() => this.newMove([rowIndex,fieldIndex])} 
                                        className="shots-grid__button"
                                        disabled={field === 'xx' || field === 'oo' || status === 'finished'}
                                        >
                                            {field === 'xx' && <span className="shots-grid__hit">x</span>}
                                            {field === 'oo' && <span className="shots-grid__miss">o</span>}
                                    </button>
                                </div>)
                        )}
                    </div>
                </div>
                <div className="scores">
                    <div className="scores__user">
                        <h2>Jij</h2>
                        <h3>{scoreUser}/17 punten</h3>
                        <h3>{feedbackUser}</h3>
                    </div>
                    <div className="scores__info">
                        <h3>Beurt: {turn}</h3>
                        <h3>Status: {status}</h3>
                        { winner === 'user' && <h3>Jij hebt gewonnen!</h3>}
                        { winner === 'computer' && <h3>De computer heeft gewonnen!</h3>}
                    </div>    
                    <div className="scores__computer">
                        <h2>Computer</h2>
                        <h3>{scoreComputer}/17 punten</h3>
                        <h3>{feedbackComputer}</h3>
                    </div>
                </div>
           </div>
        )
    }
}

export default Game