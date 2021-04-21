import React from 'react';
import './App.css';

import Header from './components/Header'
import ToyForm from './components/ToyForm'
import ToyContainer from './components/ToyContainer'
import { connect } from 'react-redux'

class App extends React.Component{
  state = {
    display: false
  }

  handleClick = () => {
    let newBoolean = !this.state.display
    this.setState({
      display: newBoolean
    })
  }

  componentDidMount() {
    fetch('http://localhost:4000/toys')
    .then(res => res.json())
    .then(json => {
      json.forEach(toy => {
        this.props.populateToy(toy)
      })
    })
  }

  render(){
    return (
      <>
        <Header/>
        { this.state.display
            ?
          <ToyForm/>
            :
          null
        }
        <div className="buttonContainer">
          <button onClick={this.handleClick}> Add a Toy </button>
        </div>
        <ToyContainer/>
      </>
    );
  }
}


const mapDispatchToProps = (dispatch) => {
  return {
    addToy: (toy) => dispatch({type: "ADD_TOY", toy}),
    populateToy: (toy) => dispatch({type: "POPULATE_TOY", toy})
  }
}

export default connect(null, mapDispatchToProps)(App);
