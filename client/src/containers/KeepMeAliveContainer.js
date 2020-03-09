import React, { Component } from 'react';
import SelectPlant from '../components/SelectPlant.js';
import PlantInfo from '../components/PlantInfo.js';
import GameContainer from './GameContainer.js';

class KeepMeAliveContainer extends Component {
  constructor(props){
    super(props)
    this.state = {
      plants: [],
      selectedPlant: null,
      selectedPlantId: null,
      isGameActive: false,
      isPlantSelected:false
    }
  }

  setSelectedPlantId = (plantId) => {
    this.setState({selectedPlantId: plantId});
  }

  resetSelectedPlant = () => {
    this.setState({selectedPlant: null});
  }

  setIsPlantSelected = (status) => {
    this.setState({isPlantSelected: status})
  }

  setGameStatus = (gameStatus) => {
    this.setState({isGameActive: gameStatus})
  }

  returnToPickAPlant = () => {
    this.resetSelectedPlant(null);
    this.setSelectedPlantId(null);
    this.setIsPlantSelected(false);
  }

  componentDidMount(){
    fetch('http://localhost:8080/plants')
      .then(response => response.json())
      .then(plantsObject => plantsObject._embedded.plants)
      .then(plantsArray => this.setState({plants: plantsArray}))
      .catch(err => console.error)
  }

  componentDidUpdate(prevProps, prevState){
    if (prevState.selectedPlantId !== this.state.selectedPlantId && this.state.selectedPlantId !== null) {
      fetch(`http://localhost:8080/plants/${this.state.selectedPlantId}`)
        .then(response => response.json())
        .then(plantObject => this.setState({selectedPlant: plantObject}))
        .catch(err => console.error)
    }
  }

  render(){
    return (
      <>
        <h1 id="website-title">Keep Me Alive!</h1>

        <SelectPlant
          plants={this.state.plants}
          setSelectedPlantId={this.setSelectedPlantId}
          isPlantSelected={this.state.isPlantSelected}
          setIsPlantSelected={this.setIsPlantSelected}
        />

        <PlantInfo
          plant={this.state.selectedPlant}
          isGameActive={this.state.isGameActive}
          setGameStatus={this.setGameStatus}
          returnToPickAPlant={this.returnToPickAPlant}
        />

        <GameContainer
          plant={this.state.selectedPlant}
          isGameActive={this.state.isGameActive}
          setGameStatus={this.setGameStatus}
          setSelectedPlantId={this.setSelectedPlantId}
          setIsPlantSelected={this.setIsPlantSelected}
          resetSelectedPlant={this.resetSelectedPlant}
        />
      </>
    )
  }
}

export default KeepMeAliveContainer;
