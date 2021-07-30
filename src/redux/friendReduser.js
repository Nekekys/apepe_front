import {axiosGetDataUser} from "../API/api";

const SET_USER_FRIEND = 'SET_USER_FRIEND'
const SET_USER_PAGE = 'SET_USER_PAGE'
const CLEAR_FRIEND_STATE = 'CLEAR_FRIEND_STATE'

let initialState = {
    friendData: [

    ],
    friendPage: {}
}



const friendReducer = (state = initialState, action) =>  {

    switch (action.type) {
        case SET_USER_FRIEND:
            for(let i = 0; i < state.friendData.length;i++){
                if( state.friendData[i]._id == action.user._id){
                    return {
                        ...state
                    }
                }
            }
            return {
                ...state,
                friendData: [ ...state.friendData, action.user]
            }
        case SET_USER_PAGE:
            return {
                ...state,
                friendPage: action.user
            }
        case CLEAR_FRIEND_STATE:
            return {
                ...state,
                friendData: []
            }
        default:
            return state;
    };
};

export let setUser = (user) =>{
    return {
        type: SET_USER_FRIEND,
        user
    }
}
export let setUserPage = (user) =>{
    return {
        type: SET_USER_PAGE,
        user
    }
}
export let clearFriendState = () =>{
    return {
        type: CLEAR_FRIEND_STATE
    }
}


export let setUSerAsync = (id) =>{
    return async (dispatch) => {
        let data = await axiosGetDataUser(id)
        dispatch(setUser(data))
    }
}
export let setUSerAsyncPage = (id) =>{
    return async (dispatch) => {
        let data = await axiosGetDataUser(id)
        dispatch(setUserPage(data))
    }
}

export  default friendReducer;