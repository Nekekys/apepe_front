import {axiosGetPost, countMainPost, getAllBranchPostDB, pressLikePost, setBranchPostDB, setPostDB} from "../API/api";
import actions from "redux-form/lib/actions";

const SET_COMMENT = 'SET_COMMENT';
const SET_POST = 'SET_POST';
const SET_ANSWER_POST = 'SET_ANSWER_POST';
const PRESS_LIKE = 'PRESS_LIKE'

const SET_ALL_BRANCH_POST = 'SET_ALL_BRANCH_POST'
const SET_ALL_MAIN_PAGE_POST = 'SET_ALL_MAIN_PAGE_POST'
const SET_INC_COUNT_ANSWER_POST = 'SET_INC_COUNT_ANSWER_POST'
const DELETE_BRANCH_POSTS = 'DELETE_BRANCH_POSTS'
const CLEAR_MAIN_POST = 'CLEAR_MAIN_POST'

let initialState = {
    mainPagePost: [],
    branchPost:[],
    count: 0,
    preloader: true
}



const postReducer = (state = initialState, action) =>  {


    switch (action.type) {
        case SET_POST:
            /*return {
                ...state,
                ...state.mainPagePost.push(action.post)
            }*/
            return {
                ...state,
                mainPagePost: [...state.mainPagePost, action.post]
            }
        case SET_COMMENT:
            let j = 0;
            for(let i = 0;i < state.postData.length; i++){
                if (state.postData[i].id == action.id){
                    j = i
                }
            }
            let time2 = Date.now()
            let obj2 = {
                id: state.postData[j].AnswerArray.length,
                userId: action.userId,
                textPost: action.text,
                postTime: time2,
                countLike: 0,
                countAnswer: 0,
                answer: {},
                LikeArray: []
            }
            return {
                ...state,
                ...state.postData[j].countAnswer++,
                ...state.postData[j].AnswerArray.push(obj2)
            }
        case PRESS_LIKE:
            if (action.data) {
                return {
                    ...state,
                    mainPagePost: state.mainPagePost.map((item) => {
                        if (item.id == action.postId) {
                            let num = item.countLike + 1
                            return {
                                ...item,
                                countLike: num,
                                LikeArray: [...item.LikeArray, action.userId]
                            }
                        } else {
                            return {...item}
                        }
                    })
                }
            } else {
                return {
                    ...state,
                    mainPagePost: state.mainPagePost.map((item) => {
                        if (item.id == action.postId) {
                            let num = item.countLike - 1
                            return {
                                ...item,
                                countLike: num,
                                /*LikeArray: item.LikeArray.map((likeId)=>{
                                    if(likeId != action.userId) return likeId
                                })*/
                                LikeArray: item.LikeArray.filter(e => e != action.userId)
                            }
                        } else {
                            return {...item}
                        }
                    })
                }
            }

        case SET_ANSWER_POST:
            let postNew
            if(action.post.answerCheck){
                postNew = {
                    ...action.post,
                    name: action.hostData.name,
                    lastName: action.hostData.lastName,
                    avatar: action.hostData.avatar,
                    nameAnswer:action.answerData.name,
                    lastNameAnswer:action.answerData.lastName
                }
            }else {
                postNew = {
                    ...action.post,
                    name: action.hostData.name,
                    lastName: action.hostData.lastName,
                    avatar: action.hostData.avatar
                }
            }

            return {
                ...state,
                branchPost: [...state.branchPost, postNew]
            }
        case SET_ALL_MAIN_PAGE_POST:
            if(action.posts){
                //return action.posts //наговногкодил
                return {
                    ...state,
                    mainPagePost: action.posts.mainPagePost,
                    preloader: false
                }
            }else{
                return {
                    ...state
                }
            }
        case SET_ALL_BRANCH_POST:
            if(action.posts){
                return {
                    ...state,
                    branchPost: action.posts
                }
            }else{
                return {
                    ...state
                }
            }
        case SET_INC_COUNT_ANSWER_POST:
            return {
                ...state,
                mainPagePost: state.mainPagePost.map((item) => {
                    if (item.id == action.id) {
                        return {
                            ...item,
                            countAnswer: item.countAnswer + 1
                        }
                    } else {
                        return {...item}
                    }
                })
            }
        case DELETE_BRANCH_POSTS:
            return {
                ...state,
                branchPost: []
            }
        case CLEAR_MAIN_POST:
            return {
                ...state,
                mainPagePost: []
            }
        default:
            return state;
    };
};




export let setPostDispatch = (post) =>{
    return {
        type: SET_POST,
        post
    }
}
export let deleteBranchPost = () =>{
    return {
        type: DELETE_BRANCH_POSTS
    }
}


export let setComment = (text,userId,id) =>{
    return {
        type: SET_COMMENT,
        text,userId,id
    }
}
export let pressLike = (postId,userId,data) =>{
    return {
        type: PRESS_LIKE,
        postId,userId,data
    }
}
export let clearMainPost = () =>{
    return {
        type: CLEAR_MAIN_POST
    }
}

export let setLike = (idUser,idPost,idHost) =>{
    return async (dispatch) => {
        let data = await pressLikePost(idUser,idPost,idHost)

        dispatch(pressLike(idUser,idPost,data.check))
    }
}
export let setAnswerPost = (post,hostData,answerData) =>{
    return {
        type: SET_ANSWER_POST,
        post,hostData,answerData
    }
}
export let setAllPost = (posts) =>{
    return {
        type: SET_ALL_MAIN_PAGE_POST,
        posts
    }
}

export let setAllBranchPostDispatch = (posts) =>{
    return {
        type: SET_ALL_BRANCH_POST,
        posts
    }
}

export let setAllPostAsync = (id) =>{
    return async (dispatch) => {
        let data = await axiosGetPost(id)
        dispatch(setAllPost(data))
    }
}

export let setIncCountAnswerPost = (id) =>{
    return {
        type: SET_INC_COUNT_ANSWER_POST,
        id
    }
}

export let setPost  = (text,id) =>{
    return async (dispatch) => {
        let time = Date.now()
        let randomId = Math.round(Math.random()*10000000000)
        let post = {
            id: randomId,
            textPost: text,
            postTime: time,
            countLike: 0,
            countAnswer: 0,
            LikeArray: []
        }
        let data = await setPostDB(id,post)
        dispatch(setPostDispatch(data))
    }
}

export let setAnswerPostDispatch  = (text,userId,postId,hostId,answerCheck,answerId,answerUserId,hostData,answerData) =>{
    return async (dispatch) => {
        let post
        let time = Date.now()
        let randomId = Math.round(Math.random()*10000000000)
        if(answerCheck){
            post = {
                id: randomId,
                textPost: text,
                postTime: time,
                countLike: 0,
                LikeArray: [],
                senderID: userId,
                mainPostId: postId,
                answerCheck: answerCheck,
                answerPostId: answerId,
                answerUserId: answerUserId
            }
        }else{
            post = {
                id: randomId,
                textPost: text,
                postTime: time,
                countLike: 0,
                LikeArray: [],
                senderID: userId,
                mainPostId: postId,
                answerCheck: answerCheck
            }
        }

       //console.log("user: " + userId ,"host: "+ hostId)
        let data = await setBranchPostDB(post,postId,hostId)
        let count = await countMainPost(postId,hostId)
        dispatch(setAnswerPost(post,hostData,answerData))
    }
}

export let setAllBranchPost = (userId,PostId) =>{
    return async (dispatch) => {
        let data = await getAllBranchPostDB(userId,PostId)
        dispatch(setAllBranchPostDispatch(data))
    }
}

export  default postReducer;