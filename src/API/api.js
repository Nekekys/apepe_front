import * as axios from "axios";

const instance = axios.create({
    baseURL: "https://evening-headland-35927.herokuapp.com/",//"https://evening-headland-35927.herokuapp.com/",//"http://localhost:3001/",//
    //baseURL: "http://localhost:3001/",
    responseType: "text"
});

export const  axiosLoginIn = (login,password) =>{
    let dat = instance.post('/LoginIn', {
        login: login,
        password: password
    },{withCredentials: true})
        .then(function (response) {
            return response.data
        })
    return dat
}

export const  axiosQweryCookies = (login,password) =>{
    let dat = instance.post('/cookie',{login,password})   //withCredentials: true - для куки
        .then(function (response) {
            return response.data
        })
    return dat
}


export const  axsiosPostReg = (login, password, email,name, lastName) =>{
    let dat = instance.post('/registration', {
        login: login,
        password: password,
        email: email,
        name: name,
        lastName: lastName
    },{withCredentials: true})
        .then(function (response) {
            return response.data
        })
    return dat
}

export const  axiosGetPost = (id) =>{
    let dat = instance.get(`/getPost/${id}`)
        .then(function (response) {
            return response.data
        })
    return dat
}


export const  setPostDB = (id,post) =>{
    let dat = instance.post(`/setPost/${id}`, {post})
        .then(function (response) {
            return response.data
        })
    return dat
}

export const  pressLikePost = (userId,postId,hostId) =>{
    if(!hostId){
        hostId = postId
    }
    let data = instance.get(`/pressLikePost/${userId}/${postId}/${hostId}`)
            .then(function (response) {
                return response.data
            })
    return data

}


export const  axiosGetDataUser = (userId) =>{
    let user = instance.get(`/getUser/${userId}`)   //withCredentials: true - для куки
        .then(function (response) {
            return response.data
        })
    return user
}
export const  axiosAddOrRemoveFriend = (userId,hostId) =>{
    let check = instance.get(`/addOrRemoveFriend/${userId}/${hostId}`)   //withCredentials: true - для куки
        .then(function (response) {
            return response.data
        })
    return check
}

export const  axiosSetOnline = (userId,check) =>{
    let data = instance.get(`/setOnline/${userId}/${check}`)
        .then(function (response) {
            return response.data
        })
    return data
}

export const setBranchPostDB = (post,branchId,userId) =>{
    let data = instance.post(`/setBranchPost/${userId}/${branchId}`, {post})
        .then(function (response) {
            return response.data
        })
    return data
}

export const subscriptionBranchPostDB = (branchId,userId) =>{
    let data = instance.get(`/subscriptionBranchPost/${userId}/${branchId}`)
        .then(function (response) {
            return response.data
        })
    return data
}

export const countMainPost = (branchId,userId) =>{
    let data = instance.get(`/countMainPost/${userId}/${branchId}`)
        .then(function (response) {
            return response.data
        })
    return data
}

export  const getAllBranchPostDB = (userId,PostId) =>{
    let data = instance.get(`/getBranchPost/${userId}/${PostId}`)
        .then(function (response) {
            return response.data
        })
    return data
}

export  const getPeopleDB = (countPeople,currentPage) =>{
    let data = instance.get(`/people/${countPeople}/${currentPage}`)
        .then(function (response) {
            return response.data
        })
    return data
}
export  const getPeopleSearchDB = (searchString) =>{
    let data = instance.get(`/peopleSearch/${searchString}`)
        .then(function (response) {
            return response.data
        })

    return data
}
export  const setUploadAvatarDB = (id,file) =>{

    let data = instance.post(`/upload/${id}`, file)
        .then(function (response) {
            return response.data
        })

    return data
}
export  const setUploadBackgroundDB = (id,file) =>{

    let data = instance.post(`/uploadBackground/${id}`, file)
        .then(function (response) {
            return response.data
        })

    return data
}

export  const changeCheckRepeatBackgroundDB = (id,check) =>{
    let data = instance.get(`/changeBackground/${id}/${check}`)
        .then(function (response) {
            return response.data
        })

    return data
}

export  const changeLoginWithDB = (id,login) =>{
    let data = instance.get(`/changeLogin/${id}/${login}`,{withCredentials: true})
        .then(function (response) {
            return response.data
        })

    return data
}
export  const changePasswordWithDB = (id,password) =>{
    let data = instance.get(`/changePassword/${id}/${password}`,{withCredentials: true})
        .then(function (response) {
            return response.data
        })

    return data
}

export  const checkOnlineUserWithNode = (id) =>{
    let data = instance.get(`/onlineCheck/${id}`)
        .then(function (response) {
            return response.data
        })

    return data
}

export  const pepeNeuralWord = (word) =>{
    let data = instance.post(`/neuralAnswer`,{word})
        .then(function (response) {
            return response.data
        })
    return data
}



export const  axiosClearNotification = (id) =>{
    let dat = instance.post('/clearNotification', {
        id: id
    })
        .then(function (response) {
            return response.data
        })
    return dat
}