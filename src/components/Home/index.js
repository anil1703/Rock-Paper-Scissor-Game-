import {Component} from 'react'
import Popup from 'reactjs-popup'
import {RiCloseLine} from 'react-icons/ri'
import './index.css'

const choicesList = [
  {
    id: 'ROCK',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rock-paper-scissor/rock-image.png',
    test: 'rockButton',
  },
  {
    id: 'SCISSORS',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rock-paper-scissor/scissor-image.png',
    test: 'scissorsButton',
  },
  {
    id: 'PAPER',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rock-paper-scissor/paper-image.png',
    test: 'paperButton',
  },
]

class Home extends Component {
  state = {
    isRulesOpen: false,
    gameStart: false,
    startedGameopts: [],
    result: '',
    score: 0,
  }

  toggleRules = () => {
    this.setState(prevState => ({
      isRulesOpen: !prevState.isRulesOpen,
    }))
  }

  clickingCoin = (id, url) => {
    const you = {
      id: id,
      imageUrl: url,
    }
    const random = Math.floor(Math.random() * 3)
    const opponentChoice = choicesList[random].id
    let resso = ''
    if (id === opponentChoice) {
      resso = 'IT IS DRAW'
    } else if (
      (id === 'ROCK' && opponentChoice === 'SCISSORS') ||
      (id === 'PAPER' && opponentChoice === 'ROCK') ||
      (id === 'SCISSORS' && opponentChoice === 'PAPER')
    ) {
      resso = 'YOU WON'
    } else {
      resso = 'YOU LOSS'
    }

    const oponent = {
      id: choicesList[random].id,
      imageUrl: choicesList[random].imageUrl,
    }
    if (resso === 'YOU WON') {
      this.setState(prevState => {
        return {score: prevState.score + 1}
      })
    } else if (resso !== 'IT IS DRAW') {
      this.setState({
        score: 0,
      })
    }
    this.setState({
      result: resso,
      gameStart: true,
      startedGameopts: [you, oponent],
    })
  }
  playingAgain = () => {
    this.setState({
      gameStart: false,
    })
  }
  render() {
    const {score, result, gameStart, isRulesOpen, startedGameopts} = this.state
    console.log(startedGameopts)

    return (
      <div className='home'>
        <div className='sub-home'>
          <div className='scoreboard'>
            <div className='head-div'>
              <h1>ROCK PAPER SCISSORS</h1>
            </div>
            <div className='score-card'>
              <p>Score</p>
              <p className='scc'>{score}</p>
            </div>
          </div>
          {gameStart ? (
            <div className='game-butuns-started'>
              <div className='control'>
                <div className='small-div'>
                  <p>YOU</p>
                  <img
                    src={startedGameopts[0].imageUrl}
                    alt='your choice'
                    className='choice-icon'
                  />
                </div>
                <div className='small-div'>
                  <p>OPPONENT</p>
                  <img
                    src={startedGameopts[1].imageUrl}
                    alt='opponent choice'
                    className='choice-icon'
                  />
                </div>
              </div>
              <p>{result}</p>
              <button
                type='button'
                onClick={this.playingAgain}
                className='play-again-btn'
              >
                Play Again
              </button>
            </div>
          ) : (
            <div className='game-butns'>
              {choicesList.map(eachItem => (
                <button
                  type='button'
                  onClick={() =>
                    this.clickingCoin(eachItem.id, eachItem.imageUrl)
                  }
                  className='game-butn'
                  data-testid={eachItem.test}
                  key={eachItem.id}
                >
                  <img
                    src={eachItem.imageUrl}
                    className='image-icon'
                    alt={eachItem.id}
                  />
                </button>
              ))}
            </div>
          )}

          <Popup
            trigger={
              <button type='button' className='rulrs-butn'>
                Rules
              </button>
            }
            position='left center'
            open={isRulesOpen}
            modal={true}
            onOpen={this.toggleRules}
          >
            <div className='popup'>
              <button
                type='button'
                onClick={this.toggleRules}
                aria-label='Close Rules'
              >
                <RiCloseLine />
              </button>
              <img
                src='https://assets.ccbp.in/frontend/react-js/rock-paper-scissor/rules-image.png'
                alt='rules'
                className='rules-img'
              />
            </div>
          </Popup>
        </div>
      </div>
    )
  }
}

export default Home
