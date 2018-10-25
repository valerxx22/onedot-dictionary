import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Form extends Component {
    /**
     * @method render
     * @returns {XML}
     */
    render() {
      return (
        <div className="container">
            <div className="row">
                <h5 className="center-align">Add a new term in Dictionary:</h5>  
            </div>
            <form className="col s12" onSubmit={this.props.handleFormSubmit}>
                <div className="row">
                    <div className="input-field col s6">
                        <input 
                            placeholder="Domain" 
                            id="domain" 
                            value={this.props.newDomain} 
                            type="text" 
                            name="domain" 
                            onChange={this.props.handleInputChange} 
                            className="validate" />
                        <label htmlFor="domain">Domain</label>
                        <span className="helper-text" data-error="Duplicated input" data-success="right"></span>
                    </div>
                    <div className="input-field col s6">
                        <input 
                            placeholder="Range" 
                            id="range" 
                            value={this.props.newRange} 
                            type="text" 
                            name="range" 
                            onChange={this.props.handleInputChange} 
                            className="validate" />
                        <label htmlFor="range">Range</label>
                        <span className="helper-text" data-error="Duplicated input" data-success="right"></span>
                    </div>
                </div>
                <div className="row">
                    <button className="waves-effect waves-light btn-large" type="submit" value="Submit">Add Item</button>
                </div>
            </form>
        </div>
        );
    }
}

Form.propTypes = {
    handleInputChange: PropTypes.func.isRequired,
    handleFormSubmit: PropTypes.func.isRequired,
    newDomain: PropTypes.string,
    newRange: PropTypes.string
};
  
export default Form;