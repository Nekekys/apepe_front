import {getPeopleDB, getPeopleSearchDB} from "../API/api";


const SET_PEOPLE = 'SET_PEOPLE'
const ClEARE_PEOPLE = 'ClEARE_PEOPLE'
const COUNT_PEOPLE = 'COUNT_PEOPLE'

let initialState = {
    peopleData: [

    ],
    preloader: true,
    countPeopleData: 0,
    checkOnAllPeople: true
}



const peopleReducer = (state = initialState, action) =>  {

    switch (action.type) {
        case SET_PEOPLE:
           /* let peopleArr = state.peopleData
            for(let i = 0;i < action.people.length; i++){
                peopleArr.push(action.people[i])
            }*/
            if(action.people.length < 10){
                return {
                    ...state,
                    peopleData: state.peopleData.concat(action.people),
                    preloader: false,
                    countPeopleData: state.countPeopleData + action.people.length,
                    checkOnAllPeople: false
                }
            }else{
                return {
                    ...state,
                    peopleData: state.peopleData.concat(action.people),
                    preloader: false,
                    countPeopleData: state.countPeopleData + action.people.length
                }
            }

        case ClEARE_PEOPLE:
            return {
                ...state,
                peopleData: [],
                preloader: true,
                checkOnAllPeople: true
            }
        case COUNT_PEOPLE:
            return {
                ...state,
                countPeopleData: action.count
            }
        default:
            return state;
    };
};

export let setPeople = (people) =>{
    return {
        type: SET_PEOPLE,
        people
    }
}
export let clearPeopleState = () =>{
    return {
        type: ClEARE_PEOPLE
    }
}
export let countPeopleState = (count) =>{
    return {
        type: COUNT_PEOPLE,count
    }
}

export let setPeopleAsync = (countPeople,currentPage) =>{
    return async (dispatch) => {
        let data = await getPeopleDB(countPeople,currentPage)
        dispatch(setPeople(data))
    }
}

export let setPeopleSearchAsync = (searchString) =>{
    return async (dispatch) => {
        let data = await getPeopleSearchDB(searchString)
        dispatch(setPeople(data))
    }
}


export  default peopleReducer;