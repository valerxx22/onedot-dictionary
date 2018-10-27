import { FETCH_DATA } from '../actions/actions'

const initialState = {
    data: [
        {
            "product": "Apple iPhone 6s",
            "color": "Stonegrey",
            "price": "CHF 769"
        }, {
            "product": "Samsung Galaxy S8",
            "color": "Midnight Black",
            "price": "CHF 569"
        }, {
            "product": "Huawei P9",
            "color": "Mystic Silver",
            "price": "CHF 272"
        }
    ]
}

const dataSet = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_DATA:
        return [
          ...state,
          {
            data: action.data
          }
        ]
      default:
        return state
    }
}

export default dataSet
  