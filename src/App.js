import React, { Component } from 'react'
import Form from './components/Form'
import DictionaryTable from './components/DictionaryTable'
import { mockData } from './mocks/mockData'
import './App.css'
import DataSetTable from './components/DataSetTable';

class App extends Component {
  constructor() {
    super();
    this.state = {
      domain: '',
      range: '',
      originalDataSet: [],
      dictionaryItems: [],
    }
  }
  
  /**
   * When component is mounted updates the state
   * 
   * @method componentDidMount
   * @return {void}
   */
  componentDidMount = () => {
    // extracting the data from mock file
    let data = mockData.data || [];

    // put it in the states
    if (data.length > 0) {
      this.setState({
        originalDataSet: data
      })
    }

    // when mouting component update the state with the local storage
    this.updateStateWithTheLocalStorage();
  }
  
  /**
   * @method updateStateWithTheLocalStorage
   * @return {void}
   */
  updateStateWithTheLocalStorage = () => {
    // for all dictionaryItems in state
    for (let key in this.state) {
      // if the key exists in localStorage
      if (localStorage.hasOwnProperty(key)) {
        // get the key's value from localStorage
        let value = localStorage.getItem(key);
        // parse the localStorage string and setState
        try {
          value = JSON.parse(value);
          this.setState({ [key]: value });
        } catch (e) {
          // handle empty string
          this.setState({ [key]: value });
        }
      }
    }
  }

  /**
   * @method handleFormSubmit
   * @param  {object} event
   * @return {void}
   */
  handleFormSubmit = (event) => {
    event.preventDefault()

    // copy current list of dictionaryItems
    let dictionaryItems = [...this.state.dictionaryItems],
        id = 1 + Math.random();
    // generates a random id

    dictionaryItems.forEach(item => {
      // check if domain or range is not duplicated
      if(this.state.domain === item.domain || this.state.range === item.range) {
        alert('Domain or range is duplicated');
        // eslint-disable-next-line
        throw 'Domain or range is duplicated';
      }
    });

    // pushing the object to dictionaryItems array
    dictionaryItems.push({
      id: id, 
      domain: this.state.domain, 
      range: this.state.range
    });

    this.setState({
      dictionaryItems,
      domain: '',
      range: '',
    });
    
    // update localStorage
    localStorage.setItem(
      'dictionaryItems', 
      JSON.stringify(dictionaryItems)
    );
  }

  /**
   * @method handleInputChange
   * @param  {object} event
   * @return {void}
   */
  handleInputChange = (event) => {
    let input = event.target,
        name = event.target.name,
        value = input.value;

    // update react state
    this.setState({
      [name]: value
    });
  }

  /**
   * Deletes the item selected
   * 
   * @method deleteItem
   * @param  {number} id
   * @return {void}
   */
  deleteItem = (id) => {
    // copy current list of dictionaryItems
    const dictionaryItems = [...this.state.dictionaryItems],
          updatedItems = dictionaryItems.filter(item => item.id !== id);
    // filter out the item being deleted

    this.setState({ dictionaryItems: updatedItems });

    // update localStorage
    localStorage.setItem('dictionaryItems', JSON.stringify(updatedItems));
  }

  
  /**
   * Renders the component
   * @method render
	 * @returns {XML}
	 * @public
   */
  render = () => {
    return (
      <div className="container">
        <Form 
          handleFormSubmit={ this.handleFormSubmit } 
          handleInputChange={ this.handleInputChange } 
          newDomain={ this.state.domain } 
          newRange={ this.state.range }
        />
        <br/>
        <DictionaryTable 
            dictionaryItems={ this.state.dictionaryItems }
            deleteItem={ this.deleteItem }
        />
        <br/>
        <DataSetTable 
          dictionaryItems={this.state.dictionaryItems}
          originalDataSet={this.state.originalDataSet}
        />
      </div>
    );
  }
}

export default App;
