import React, { Component } from 'react'
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as Actions from './actions/actions';
import Form from './components/Form'
import DictionaryTable from './components/DictionaryTable'
import './App.css'
import DataSetTable from './components/DataSetTable';

class App extends Component {
  constructor() {
    super();
    this.state = {
      domain: '',
      range: '',
      editedId: 0,
      dictionaryItems: [],
    }
  }
  
  /**
   * When component is mounted updates the state
   * 
   * @method componentDidMount
   * @returns {void}
   */
  componentDidMount = () => {
    // when mouting component update the state with the local storage
    this.updateStateWithTheLocalStorage();

    // add event listener to save state to localStorage
    // when user leaves/refreshes the page
    window.addEventListener(
      "beforeunload",
      this.saveStateToLocalStorage.bind(this)
    );
  }
  
  /**
   * When component is unmounted updates the the local storage
   * 
   * @method componentWillUnmount
   * @returns {void}
   */
  componentWillUnmount = () => {
    window.removeEventListener(
      "beforeunload",
      this.saveStateToLocalStorage.bind(this)
    );

    // saves if component has a chance to unmount
    this.saveStateToLocalStorage();
  }

  /**
   * @method localStorageSetItems
   * @returns {void}
   */
  saveStateToLocalStorage = () => {
    // for every item in React state
    for (let key in this.state) {
      // save to localStorage
      localStorage.setItem(key, JSON.stringify(this.state[key]));
    }
  }
  
  /**
   * @method updateStateWithTheLocalStorage
   * @returns {void}
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
   */
  validateInputs = (dictionaryItems) => {
    let _this = this || {};
    dictionaryItems.forEach(item => {
      // check if domain or range is not duplicated
      if (_this.state.domain === item.domain || _this.state.range === item.range) {

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
   * @returns {void}
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
          // updating the array with edited inputs
          item.domain = this.state.domain;
          item.range = this.state.range;
        }
        
      });

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

    // updating the states
    this.setState({
      dictionaryItems,
      editedId: 0,
      domain: '',
      range: '',
    });
    
  }

  /**
   * @method handleInputChange
   * @param  {object} event
   * @returns {void}
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
   * @returns {void}
   */
  editItem = (id) => {
    // copy current list of dictionaryItems
    const dictionaryItems = [...this.state.dictionaryItems],
        editedItems = dictionaryItems.filter((item) => item.id === id);
    // filter out the item being deleted

    this.setState({ 
      domain: editedItems[0].domain, 
      range: editedItems[0].range, 
      editedId: editedItems[0].id 
    });
  }

  /**
   * Deletes the item selected
   * 
   * @method deleteItem
   * @param  {number} id
   * @returns {void}
   */
  deleteItem = (id) => {
    // copy current list of dictionaryItems
    const dictionaryItems = [...this.state.dictionaryItems],
          updatedItems = dictionaryItems.filter(item => item.id !== id);
    // filter out the item being deleted

    this.setState({ 
      dictionaryItems: updatedItems
    });

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
          originalDataSet={ this.props.data }
        />

      </div>
    );
  }
}

/**
 * Map the state to props.
 */
const mapStateToProps = (state) => ({
  ...state
})

/**
 * This function maps actions to props
 * and binds them so they can be called
 * directly.
 *
 * In this case all actions are mapped
 * to the `actions` prop.
 */
const mapDispatchToProps = (dispatch) => ({
	actions: bindActionCreators(Actions, dispatch)
})

/**
 * Finally the Redux store is connected
 * to the component with the `connect()`
 * function.
 */
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
