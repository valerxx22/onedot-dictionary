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
      editedId: 0,
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
   * @method validateInputs
   * @param  {Array} dictionaryItems
   * @param {number} itemId
   */
  validateInputs = (dictionaryItems, itemId) => {
    let _this = this || {};
    dictionaryItems.forEach(item => {
      // check if domain or range is not duplicated
      if(_this.state.domain === item.domain || _this.state.range === item.range) {
        let domain = document.getElementById('domain');
        domain.classList.add('validate');
        domain.classList.add('invalid');
        let range = document.getElementById('range');
        range.classList.add('validate');
        range.classList.add('invalid');
        
        // eslint-disable-next-line
        throw 'Domain or range is duplicated';
      }
    });
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
    if (this.state.editedId !== 0) {
      // edit mode
      // validate edited inputs before updating the array
      this.validateInputs(dictionaryItems);

      dictionaryItems.forEach( (item)  => {

        if (item.id === this.state.editedId) {
          item.domain = this.state.domain;
          item.range = this.state.range;
        }
        
      });
      
      // update localStorage
      this.localStorageSetItems('dictionaryItems', dictionaryItems);

    } else {
      // new input
      // validate new inputs
      this.validateInputs(dictionaryItems);

      // udpating dictionary array
      dictionaryItems.push({
        id: id, 
        domain: this.state.domain, 
        range: this.state.range
      });
    }

    this.setState({
      dictionaryItems,
      editedId: 0,
      domain: '',
      range: '',
    });
    
    // update localStorage
    this.localStorageSetItems('dictionaryItems', dictionaryItems)
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
   * edits the item selected
   * 
   * @method editItem
   * @param  {number} id
   * @return {void}
   */
  editItem = (id) => {
    // copy current list of dictionaryItems
    const dictionaryItems = [...this.state.dictionaryItems],
        editedItems = dictionaryItems.filter((item) => item.id === id);
    // filter out the item being deleted

    this.setState({ domain: editedItems[0].domain, range: editedItems[0].range, editedId: editedItems[0].id });
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

    this.localStorageSetItems('dictionaryItems', updatedItems)
  }

  
  /**
   * @method localStorageSetItems
   * @param  {string} objectName
   * @param  {object} object
   */
  localStorageSetItems = (objectName, object) => {
    // update localStorage
    localStorage.setItem(objectName, JSON.stringify(object));
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
            editItem={ this.editItem }
        />
        <br/>
        <DataSetTable 
          dictionaryItems={ this.state.dictionaryItems }
          originalDataSet={ this.state.originalDataSet }
        />
      </div>
    );
  }
}

export default App;
