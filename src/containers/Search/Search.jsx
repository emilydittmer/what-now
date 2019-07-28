import React, { Component } from 'react';
import './Search.scss';
import { fetchWatchedShowId } from '../../utils/apiCalls';
import { setSearchShow } from '../../actions';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'

export class Search extends Component {
  constructor(props){
    super(props);
    this.state = {
      error: '',
      searchValue: ''
    }
  }

  handleChange= (event) => {
    event.preventDefault();
    this.setState({ [event.target.name]: event.target.value })
  }

  handleSubmit = async event => {
    event.preventDefault();

    const { searchValue }= this.state;
    let searchedShow = await fetchWatchedShowId(searchValue)

    if (searchedShow){
      this.props.setSearchShow(searchedShow)
      this.props.history.push("/results")
    } else {
      this.setState({error: "No results found. Please search again"})
    }
    this.resetInputs();
  }

  resetInputs = () => {
    this.setState({searchValue: ''})
  }

  render(){
    return(
      <form className='search-field'>
        <input 
          className='search-input'
          type='text'
          placeholder='TV Show Title'
          value={this.state.searchValue}
          name='searchValue'
          onChange={event => this.handleChange(event)}
        />
        <input
          className='submit-btn'
          type='submit'
          value= 'Submit'
          onClick = {event => this.handleSubmit(event)}
          />
        {this.state.error === ''  ? (
          <p></p>
          ) : (
          <p>{this.state.error}</p>
        )}
      </form>
    )
  }
}

export const mapDispatchToProps = dispatch => ({
  setSearchShow: show => dispatch(setSearchShow(show))
})

export default connect(null, mapDispatchToProps)(Search);