 import React, {useEffect, useState} from 'react';
import style from './People.module.css'
import {NavLink, Redirect} from "react-router-dom";
import search from '../../file/images/loupe.svg';
import preLoader from "../../file/preloader/RipplePreloader.svg";
 import {textPostValidation} from "../general/validation/validation";

function People(props) {

    const [valueInput,setValueInput] = useState('')
    const [currentPage,setCurrentPage] = useState(10)
    /*const [preloader,setPreloader] = useState(true)*/

    const [redirectCheck,setRedirectCheck] = useState(false)
    const [valueSearchValid,setValueSearchValid] = useState('')

    const [validError,setValidError] = useState(false)

    useEffect(()=>{
       props.setPeopleAsync(10,currentPage - 10)
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

    },[props.peopleData])

    useEffect(()=>{

    },[])

    /*useEffect(()=> {
        if(props.peopleData.length == currentPage){
            setPreloader(false)
        }
    })*/

    const changeFriend = (id) =>{
        props.pressChangeFriend(props.user._id,id)

    }
    let peopleObj;
    if(props.user.friend){
        peopleObj = props.peopleData.map( e => {
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
                    <NavLink to={'/user/' + e._id} className={style.avatarContainer}>
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
    }


    const clickSearch = () =>{
        let text = textPostValidation(valueInput)
        if(text.boo){
            let stringT = ''
            for (let i = 0; i < text.textWithoutSpaceReverse.length;i++){
                stringT+= text.textWithoutSpaceReverse[i]
            }
            setValueSearchValid(stringT)
            setRedirectCheck(true)
        }else{
            setValidError(true)
            setValueInput('')
        }

    }

    const  changeInput = (e) =>{
        let text = e.target.value
        setValueInput(text)
        setValidError(false)
    }
    const EnterKey = (e) =>{
        if(e.key == "Enter"){
            clickSearch()
            e.preventDefault();
        }
    }
    const clickAddYet = () =>{
        props.setPeopleAsync(10,currentPage)
        setCurrentPage(currentPage+10)
    }

    if(redirectCheck){
        return <Redirect to={"/people/search/" + valueSearchValid}/>
    }else {
    return(
        <div className={style.main}>
            <div className={style.searchBox}  >
                <input onKeyDown={EnterKey} style={(validError ? {borderBottom: "1px solid red"}:{borderBottom: "1px solid #66a4ac"})} placeholder={"Введите имя человека"} value={valueInput} onChange={changeInput} type="text"/>
                <div onClick={clickSearch} className={style.search_button}>
                    <img  src={search} alt="search"/>
                    <span  style={(validError ? {borderLeft: "1px solid red"}:{borderLeft: "1px solid #66a4ac"})}>Поиск</span>
                </div>
            </div>
            <div className={style.container}>
                {peopleObj}
                {props.checkOnAllPeople && <div onClick={clickAddYet} className={style.addYetPeople}>Загрузить ещё</div>}
            </div>
            {props.preloader && <div className={style.preloader}><img src={preLoader} alt="preloader"/></div>}
        </div>

    )}


}




export default People