import React, { Component } from 'react'
import PropTypes from 'prop-types'


class DataSetTable extends Component {
    
    /**
     * @method handleColorRange
     * @param  {string} itemColor
     * @return {string}
     */
    handleColorRange = (itemColor) => {
        let dictionaryItems = this.props.dictionaryItems,
            color;

        dictionaryItems.forEach(item => {
            if (item.domain === itemColor) {
                color = item.range || '';
            }
        });

        return color;
    }

    /**
     * @method render
     * @return {XML}
     */
    render() {
        let originalDataSet = this.props.originalDataSet;

        return (
            <div className="container">
                <div className="row">
                    <h5 className="center-align">Dataset info:</h5>
                    <table>
                        <thead>
                            <tr>
                                <th>Product</th>
                                <th>Color</th>
                                <th>Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            {originalDataSet.map(item => {
                                return (
                                    <tr key={item.product}>
                                        <td>{item.product}</td>
                                        <td>{this.handleColorRange(item.color)}</td>
                                        <td>{item.price}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

DataSetTable.propTypes = {
    originalDataSet: PropTypes.array.isRequired,
    dictionaryItems: PropTypes.array.isRequired,
};

export default DataSetTable;