import types from '../actions/types'
import initialState from '../state';

const assignListItem = (state) => {
   return {
    ...state,
    users: [
      {
        id: 1,
        imgUrl: "http://personal.psu.edu/xqz5228/jpg.jpg",
        firstName: "sdfte",
        lastName: "as",
        desc:
          "Some quick example text to build on the card title and make up the bulk of the card's content.",
      },
      {
        id: 2,
        imgUrl: "http://personal.psu.edu/xqz5228/jpg.jpg",
        firstName: "sdfte",
        lastName: "yuas",
        desc: "Some quick example text to build on",
      },
      {
        id: 3,
        imgUrl: "http://personal.psu.edu/xqz5228/jpg.jpg",
        firstName: "eete",
        lastName: "tras",
        desc: "Some quick example.",
      }
    ]
  }
}

const filterListItem = (state, searchText) => {
  let data = state.users.filter((r) => r.firstName === searchText || r.lastName === searchText)
  return {
    ...state,
    users: data
  }
}

const clearItem = (state) => { return {...state, users: [] }}

export default function reducer(state = initialState, action) {
    let users = null;
    switch (action.type) {
      case types.USER_LIST:
        if(action.payload) {
          return filterListItem(state, action.payload)
        } else {
          clearItem(state)
          return assignListItem(state)
        }
      case types.DELETE_USER:
        return {
          ...state,
          users: state.users.filter((r) => r.id !== parseInt(action.payload))
        }
      case types.ADD_USER :
        let id = state.users.length + 1
        return {
          ...state,
          users: [
            ...state.users, { ...action.payload, id, imgUrl: "http://personal.psu.edu/xqz5228/jpg.jpg" }
          ]
        }
      case types.UPDATE_USER:
        users = state.users.map((r) => {
          if(r.id !== parseInt(action.payload.id))
            return r
          return Object.assign(
            {},
            r,
            {
              firstName: action.payload.firstName,
              lastName: action.payload.lastName,
              desc: action.payload.desc
            }
          )
        })
        return {
          ...state,
          users
        }
      case types.SET_LOADING:
        return {
          ...state,
          isLoading: action.payload
        }
      default:
        return state
    }
}