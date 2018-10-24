import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Table extends Component {
    render() {
        const dictionaryItems = this.props.dictionaryItems;
        return (
        <div className="container">
            <div className="row">
                <table>
                    <thead>
                        <tr>
                            <th>Domain</th>
                            <th>Range</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {dictionaryItems.map(item => {
                            return (
                                <tr key={item.id}>
                                    <td>{item.domain}</td>
                                    <td>{item.range}</td>
                                    <td>
                                        <button 
                                            className="waves-effect waves-light btn" 
                                            onClick={this.props.deleteItem.bind(this, item.id)}>
                                            Remove
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
        );
    }
}

Table.propTypes = {
    deleteItem: PropTypes.func.isRequired,
    dictionaryItems: PropTypes.array.isRequired,
};
  
export default Table;