import types from './types'

export default {
    userList: (payload) => {
        return {
            type: types.USER_LIST,
            payload
        }
    },
    addUser: (payload) => {
        return {
            type: types.ADD_USER,
            payload
        }
    },
    deleteUser: (payload) => {
        return {
            type: types.DELETE_USER,
            payload
        }
    },
    updateUser: (payload) => {
        return {
            type: types.UPDATE_USER,
            payload
        }
    },
    setLoading: (payload) => {
        return {
            type: types.SET_LOADING,
            payload
        }
    }
}