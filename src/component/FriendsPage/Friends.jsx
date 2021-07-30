 import React, {useEffect, useState} from 'react';
import style from './Friends.module.css'
import {NavLink} from "react-router-dom";
import search from '../../file/images/loupe.svg'

 import preLoader from "../../file/preloader/RipplePreloader.svg";

function Friends(props) {



    const [preloader,setPreloader] = useState(true)

    const [searchText,setSearchText] = useState('')
    const [checkSearch,setCheckSearch] = useState(false)

    useEffect(()=>{
        if(props.user.friend){
            for(let i = 0; i < props.user.friend.length; i++ ){
                props.setUSerAsync(props.user.friend[i])
            }
        }
    },[props.user])


    useEffect(()=>{
        if(props.user.friend){
            if(props.friends.length == props.user.friend.length){
                setPreloader(false)
            }
        }
    },[props])

    useEffect(()=> {
        if(searchText.length > 0){
            setCheckSearch(true)
        }else {
            setCheckSearch(false)
        }
    })

    useEffect(()=>{
        return ()=>{
            props.clearFriendState()
        }
    },[])

    const  changeSearchValue = (e) =>{
        let text = e.target.value
        setSearchText(text)
    }



    let friendData = []
    if(props.friends){
        let k = -1
        friendData = props.friends.map(e => {
            k++
            return (
                    <NavLink className={style.element} to={`/user/${e._id}`} >
                        <div className={style.avatarCon}
                             style={({backgroundImage: `url("${e.avatar}") `})}>
                            {e.online && <span className={style.online}></span>}
                            <div className={style.onlineCheck}></div>
                        </div>
                        <div className={style.element_name}>{e.name + " " + e.lastName}</div>
                    </NavLink>
            )
        })
    }
    if(checkSearch){
        let friendDataSearch =  props.friends.filter( function(e){
            let search_str = searchText.toLowerCase()
            let name = e.name.toLowerCase()
            let lastName = e.lastName.toLowerCase()
            let fullName = name + " " + lastName
            return (name.search(search_str) != -1)||(lastName.search(search_str) != -1)||(fullName.search(search_str) != -1)
            /* if((name.search(search_str) != -1)||(lastName.search(search_str) != -1)||(fullName.search(search_str) != -1)){
                 return true
             }*/
        })
        friendData = friendDataSearch.map(e => {
            return (
                <NavLink className={style.element} to={`/user/${e._id}`} >
                    <div className={style.avatarCon}
                         style={({backgroundImage: `url("${e.avatar}") `})}>
                        {e.online && <span className={style.online}></span>}
                        <div className={style.onlineCheck}></div>
                    </div>
                    <div className={style.element_name}>{e.name + " " + e.lastName}</div>
                </NavLink>
            )
        })
       /* friendData = props.friends.map(e => {
            let search_str = searchText.toLowerCase()
            let name = e.name.toLowerCase()
            let lastName = e.lastName.toLowerCase()
            let fullName = name + " " + lastName
            if((name.search(search_str) != -1)||(lastName.search(search_str) != -1)||(fullName.search(search_str) != -1)){
                return (
                    <NavLink className={style.element} to={`/user/${e._id}`} >
                        <div className={style.avatarCon}
                             style={({backgroundImage: `url("${e.avatar}") `})}>
                            {e.online && <span className={style.online}></span>}
                            <div className={style.onlineCheck}></div>
                        </div>
                        <div className={style.element_name}>{e.name + " " + e.lastName}</div>
                    </NavLink>
                )
            }
        })*/

    }

    return(
        <div className={style.main}>
            <div className={style.head}>
                <input placeholder={"Поиск"} value={searchText} onChange={changeSearchValue} type="text"/>
                <div className={style.search_button}>
                    <img src={search} alt="search"/>
                </div>
            </div>



            {preloader ?
                <div className={style.preloader}>
                    <img src={preLoader} alt="preloader"/>
                </div>
            :
                <div className={style.body}>
                    {friendData.length != 0 ?
                        (friendData)
                        :
                        <div className={style.dontPost}>{checkSearch ? "Никого не найдено": "У вас нет друзей :((("}</div>}
                </div>
            }

        </div>

    )


}




export default Friends