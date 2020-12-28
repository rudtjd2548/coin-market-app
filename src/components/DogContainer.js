import React, { Component } from 'react'
import axios from 'axios'

import './DogContainer.css'

class CoinWrapper extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       dogBreeds : [],
       imgLink : "",
       clickedIndex : -1
    }
  }
  
  componentDidMount(){
    axios.get('https://dog.ceo/api/breeds/list/all')
      .then(res => {
        this.setState({
          dogBreeds : res.data.message
        })
      })
  }

  handleClickButton = (selectedBreed, i) => {
    axios.get('https://dog.ceo/api/breed/'+selectedBreed+'/images/random')
      .then(res => {
        this.setState({
          imgLink : res.data.message,
          clickedIndex : i
        })
      })
  }

  render() {
    const {imgLink, clickedIndex} = this.state
    const dogBreeds = Object.keys(this.state.dogBreeds)

    const dogBreedsList = dogBreeds.map((dogBreed, i) => (
      <li key ={dogBreed}>
        <button 
          onClick={() => this.handleClickButton(dogBreed, i)}
          style={clickedIndex===i ? {fontWeight: "bold"} : {fontWeight: "normal"}}
        >
          {dogBreed}
        </button>
      </li>
    ))

    return (
      <div>
        <div>
          <ul className="DogListBox">
            {dogBreedsList}
          </ul>
        </div>
        <div>
          <img alt={clickedIndex} src={imgLink} width="300" />
        </div>
      </div>
    )
  }
}

export default CoinWrapper
