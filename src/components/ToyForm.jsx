import React, { Component } from 'react';
import { connect } from 'react-redux'
import uuid from 'uuid'

class ToyForm extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      image: '',
    }
  }

  handleOnSubmit = (e) => {
    e.preventDefault()
    const toy = {
      name: this.state.name, 
      image: this.state.image,
      id: uuid(),
      likes: 0
    }
    this.props.addToy(toy)
    this.setState({name: '', image: ''})
  }

  handleOnChange = (e) => {
    this.setState({...this.state, [e.target.name]: e.target.value})
  }

  render() {
    return (
      <div className="container">
        <form className="add-toy-form" onSubmit={this.handleOnSubmit}>
          <h3>Create a toy!</h3>
          <input 
            type="text" 
            name="name" 
            placeholder="Enter a toy's name..." 
            className="input-text"
            onChange={this.handleOnChange}
            value={this.state.name}
          />
          <br/>
          <input 
            type="text" 
            name="image" 
            placeholder="Enter a toy's image URL..." 
            className="input-text"
            onChange={this.handleOnChange}
            value={this.state.image}
          />
          <br/>
          <input 
            type="submit" 
            name="submit" 
            value="Create New Toy" 
            className="submit"
          />
        </form>
      </div>
    );
  }

}

const mapDispatchToProps = dispatch => {
  return {
    addToy: (toy) => dispatch({type: "ADD_TOY", toy})
  }
}

export default connect(null, mapDispatchToProps)(ToyForm);
