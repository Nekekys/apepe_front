 import React, {useEffect, useState} from 'react';
import style from './PeopleSearch.module.css'
import {NavLink, Redirect} from "react-router-dom";
import search from '../../file/images/loupe.svg';
import preLoader from "../../file/preloader/RipplePreloader.svg";
 import {textPostValidation} from "../general/validation/validation";

function PeopleSearch(props) {

    const [valueInput,setValueInput] = useState('')
    const [currentPage,setCurrentPage] = useState(10)
    //const [preloader,setPreloader] = useState(false)


    const [valueSearchValid,setValueSearchValid] = useState('')

    const [validError,setValidError] = useState(false)

    useEffect(()=>{
       props.setPeopleSearchAsync(props.searchString)
        setValueInput(props.searchString)
        return ()=>{
            props.clearPeopleState()

        }
    },[])


    useEffect(()=>{
        if(props.peopleData.length > 0){
            if(props.peopleData.length < currentPage){
                setCurrentPage(props.peopleData.length)
            }
        }
        console.log(props.peopleData)
    },[props.peopleData])


/*
    useEffect(()=> {

        if(props.peopleData.length == currentPage){
            setPreloader(false)
        }

    })*/

    const changeFriend = (id) =>{
        props.pressChangeFriend(props.user._id,id)

    }

    let peopleObj = props.peopleData.map( e => {
        let check = false
        let show = true
        for(let i = 0; i < props.user.friend.length;i++){
            if(e._id == props.user.friend[i]){
                check = true
            }
        }
        if(e._id == props.user._id){
            show = false
        }
        return (
            <div className={style.item}>
                <NavLink to={'/user/' + e._id} className={style.avatarContainer} >
                    <img src={e.avatar} alt="ava"/>
                    {e.online && <span className={style.online}></span>}
                </NavLink>
                <div className={style.nameBox}>
                    <NavLink to={'/user/' + e._id} className={style.name}>
                        {e.name + " " + e.lastName}
                    </NavLink>
                    <div className={style.addFriendButton}>
                        {show && (!check ?
                            <div onClick={() => changeFriend(e._id)} className={style.name_buttonFriend}>Добавить в друзья</div>
                            :
                            <div onClick={() => changeFriend(e._id)} className={style.name_buttonFriend + " " + style.name_buttonFriend_delete}>Удалить из
                                друзей</div>
                        )}

                    </div>
                </div>
            </div>
        )
    })



    const  changeInput = (e) =>{
        let text = e.target.value
        setValueInput(text)
        setValidError(false)
    }

    const clickSearch = (e) =>{

        let text = textPostValidation(valueInput)
        if(text.boo){
            let stringT = ''
            for (let i = 0; i < text.textWithoutSpaceReverse.length;i++){
                stringT+= text.textWithoutSpaceReverse[i]
            }
            setValueSearchValid(stringT)
            props.clearPeopleState()
            props.setPeopleSearchAsync(stringT)
           // setRedirectCheck(true)
           // props.setPeopleSearchAsync(props.searchString)
        }else{
            setValidError(true)
            setValueInput('')
            e.preventDefault()
        }

    }

    return(
        <div className={style.main}>
            <div className={style.searchBox}>
                <input style={(validError ? {borderBottom: "1px solid red"}:{borderBottom: "1px solid #66a4ac"})} placeholder={"Введите имя человека"} value={valueInput} onChange={changeInput} type="text"/>
                <NavLink to={"/people/search/" + valueInput} onClick={clickSearch} className={style.search_button}>
                    <img src={search} alt="search"/>
                    <span style={(validError ? {borderLeft: "1px solid red"}:{borderLeft: "1px solid #66a4ac"})}>Поиск</span>
                </NavLink>
                <NavLink to={'/people'} className={style.backButton} style={(validError ? {borderLeft: "1px solid red"}:{borderLeft: "1px solid #66a4ac"})}>Назад</NavLink>
                <div  className={style.searchString}>
                    Результат поиска: <i>{props.searchString}</i>
                </div>
            </div>
            <div className={style.container}>
                {peopleObj.length > 0 ? peopleObj
                :
                (!props.preloader && <div className={style.dontPeople}>Никого не найдено</div>)}
            </div>
            {props.preloader && <div className={style.preloader}><img src={preLoader} alt="preloader"/></div>}
        </div>

    )


}




export default PeopleSearch