import {
    axiosAddOrRemoveFriend,
    axiosSetOnline,
    changeCheckRepeatBackgroundDB, changeLoginWithDB, changePasswordWithDB, checkOnlineUserWithNode,
    setUploadAvatarDB,
    setUploadBackgroundDB
} from "../API/api";


const IS_LOGIN_IN = 'IS_LOGIN_IN';
const SET_USER = 'SET_USER';
const SET_CHANGE_FRIEND = 'SET_CHANGE_FRIEND';
const SET_ONLINE_USER = 'SET_ONLINE_USER';
const CHANGE_AVATAR = 'CHANGE_AVATAR'
const CHANGE_BACKGROUND = 'CHANGE_BACKGROUND'
const CHANGE_CHECK_REPEAT = 'CHANGE_CHECK_REPEAT'
const CHANGE_LOGIN = 'CHANGE_LOGIN'
const CHANGE_PASSWORD = 'CHANGE_PASSWORD'


let initialState = {
    authData: {
        /*name: 213, urlAvatar: 123, id: 2*/


    },
    user: {

    },
    isAuth: true
    /*followingInProgress: [1,2]*/
}



const authReducer = (state = initialState, action) =>  {


    switch (action.type) {
        case  IS_LOGIN_IN:
            return {
                ...state,
                isAuth: action.check
            }
        case SET_USER:
            return {
                ...state,
                user: action.user
            }
        case SET_CHANGE_FRIEND:
            if(action.check.check){
                return {
                    ...state,
                    user: {
                        ...state.user,
                        friend: [...state.user.friend, action.hostId]
                    }
                }
            }else{
                return {
                    ...state,
                    user: {
                        ...state.user,
                       /* friend: state.user.friend.map((item)=>{
                            if(item != action.hostId) return item
                        })*/
                        friend: state.user.friend.filter(e => e != action.hostId)
                    }
                }
            }
        case SET_ONLINE_USER:
            return {
                ...state,
                user: {
                    ...state.user,
                    online: action.check
                }
            }
        case CHANGE_AVATAR:
            return {
                ...state,
                user: {
                    ...state.user,
                    avatar: action.url
                }
            }
        case CHANGE_CHECK_REPEAT:
            return {
                ...state,
                user: {
                    ...state.user,
                    background: {
                        ...state.user.background,
                        repeatBackground: action.check
                    }
                }
            }
        case CHANGE_BACKGROUND:
            return {
                ...state,
                user: {
                    ...state.user,
                    background: {
                        ...state.user.background,
                        url: action.url
                    }
                }
            }
        case CHANGE_LOGIN:
            return {
                ...state,
                user: {
                    ...state.user,
                    login: action.login
                }
            }
        case CHANGE_PASSWORD:
            return {
                ...state,
                user: {
                    ...state.user,
                    password: action.password
                }
            }
        default:
            return state;
    };
};



export let isLoginIn = (check) =>{
    return {
        type: IS_LOGIN_IN,
        check
    }
}
export let setUSerData = (user) =>{
    return {
        type: SET_USER,user
    }
}

export let setOnlineUser = (check) =>{
    return {
        type: SET_ONLINE_USER,check
    }
}

export let setChangeFriend = (check,hostId) =>{
    return {
        type: SET_CHANGE_FRIEND,check,hostId
    }
}
export let changeAvatar = (url) =>{
    return {
        type: CHANGE_AVATAR,
        url
    }
}
export let changeBackground = (url) =>{
    return {
        type: CHANGE_BACKGROUND,
        url
    }
}
export let changeCheckRepeat = (check) =>{
    return {
        type: CHANGE_CHECK_REPEAT,check
    }
}
export let changeLogin = (login) =>{
    return {
        type: CHANGE_LOGIN,login
    }
}
export let changePassword = (password) =>{
    return {
        type: CHANGE_PASSWORD,password
    }
}
export let pressChangeFriend = (userId,hostId) =>{
    return async (dispatch) => {
        let check = await axiosAddOrRemoveFriend(userId,hostId)

        dispatch(setChangeFriend(check,hostId))
    }
}

export let changeOnlineUser = (userId,check) =>{
    return async (dispatch) => {
        let data = await axiosSetOnline(userId,check)
        dispatch(setOnlineUser(check))
    }
}

export let changeUserAvatar = (userId,file) =>{
    return async (dispatch) => {
        let data = await setUploadAvatarDB(userId,file)

       dispatch(changeAvatar(data))
    }
}

export let changeUserBackground = (userId,file) =>{
    return async (dispatch) => {
        let data = await setUploadBackgroundDB(userId,file)
        console.log(data)
        dispatch(changeBackground(data))
    }
}
//
export let changeCheckRepeatBackground = (userId,check) =>{
    return async (dispatch) => {

        let data = await changeCheckRepeatBackgroundDB(userId,check)

        dispatch(changeCheckRepeat(check))
    }
}
export let changeLoginAsync = (userId,login) =>{
    return async (dispatch) => {

        let data = await changeLoginWithDB(userId,login)

        dispatch(changeLogin(login))
    }
}
export let changePasswordAsync = (userId,password) =>{
    return async (dispatch) => {

        let data = await changePasswordWithDB(userId,password)

        dispatch(changePassword(password))
    }
}
export let checkOnlineUser = (userId) =>{
    return async (dispatch) => {

        let data = await checkOnlineUserWithNode(userId)

    }
}
export  default authReducer;