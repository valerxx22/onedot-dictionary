import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Table extends Component {

    /**
     * @method render
     * @returns {XML}
     */
    render = () => {
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
                                            <div className="col s6">
                                                <button className="btn waves-effect waves-light" 
                                                    onClick={this.props.editItem.bind(this, item.id)}>
                                                    <i className="material-icons left">edit</i>Edit
                                                </button>
                                            </div>
                                            <div className="col s6">
                                                <button className="btn waves-effect waves-light" 
                                                    onClick={this.props.deleteItem.bind(this, item.id)}>
                                                    <i className="material-icons right">remove_circle</i>Remove
                                                </button>
                                            </div>
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
    editItem: PropTypes.func.isRequired,
    dictionaryItems: PropTypes.array.isRequired,
};
  
export default Table;