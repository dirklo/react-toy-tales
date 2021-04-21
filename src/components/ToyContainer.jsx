import React, { Component } from 'react'
import ToyCard from './ToyCard'
import { connect } from 'react-redux'

class ToyContainer extends Component {
  render() {
    return (
      <div id="toy-collection">
        {this.props.toys.map(toy => 
          <ToyCard 
            key={toy.id} 
            toy={toy} 
            removeToy={(toyId) => this.props.removeToy(toyId)} 
            addLike={(toyId) => this.props.addLike(toyId)} 
            />)}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    toys: state.toys
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    removeToy: (toyId) => dispatch({type: "REMOVE_TOY", toyId}),
    addLike: (toyId) => dispatch({type: "ADD_LIKE", toyId})
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ToyContainer);
