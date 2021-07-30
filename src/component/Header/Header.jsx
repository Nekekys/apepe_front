import React, {useEffect, useState} from 'react';
import style from './Header.module.css'
import outIcon from '../../file/images/logout.svg'
import {axiosLoginOut} from "../../API/api";

function Header(props) {

    const [check,setCheck] = useState(false)
    const [checkFriend,setCheckFriend] = useState(false)

    let test1 = false; // user page
    let test2 = false;
    let test3 = false; // branchPost host
    let test4 = false;
    let newUserId = '';

    useEffect(()=>{
        let path = props.params.pathname
        let word = ''
        for(let i = 0; i < path.length; i++){
            if(path[i] !== '/'){
                word = word + path[i]
            }else{
                if(word == 'user'){
                    //setCheckUserPage(true)
                    test1 = true
                }
                if(word == 'branchPost'){
                    test3 = true

                }

                if(test3){
                    if(word == String(props.userData._id)){
                        test4 = true
                    }
                    newUserId = word

                }
                word = ''
            }
        }
        if((test1)&&(props.userData.friend)){
            for(let i = 0; i < props.userData.friend.length; i++){
                if(props.userData.friend[i] == word){
                    test2 = true;
                   /// setCheckFriend(true)
                   // console.log(checkFriend)
                }
            }
        }
        if((test3)&&(!test4)&&(props.userData.friend)){

            for(let i = 0; i < props.userData.friend.length; i++){
                if(props.userData.friend[i] == newUserId){
                    test2 = true;
                    /// setCheckFriend(true)
                    // console.log(checkFriend)
                }
            }
        }
        if(test1){
            props.setUSerAsyncPage(word)
        }
        if(!test4 && test3){
            props.setUSerAsyncPage(newUserId)
        }
        setCheck(test1)
        //if()
        if((!test4)&&(test3)){
            setCheck(true)
        }
        setCheckFriend(test2)
    },[props.params,props.userData])



    const onOutButtonClick = async () =>{
        let result = await axiosLoginOut()
        props.isLoginIn(false)
        props.clearFriendState()
        props.changeOnlineUser(props.userData._id,false)

    }
    const changeFriend = () =>{
        props.pressChangeFriend(props.userData._id,props.hostPageUserData._id)
    }



    return(
        <div className={style.main} style={(
            check ? (props.hostPageUserData.background &&
            (props.hostPageUserData.background.repeatBackground ?
                {backgroundImage: `url("${(props.hostPageUserData.background && props.hostPageUserData.background.url)}") `,backgroundSize: "contain"}
            :
                {backgroundImage: `url("${(props.hostPageUserData.background && props.hostPageUserData.background.url)}") `})
           ):
                (props.userData.background &&
                    (props.userData.background.repeatBackground ?
                        {backgroundImage: `url("${(props.userData.background && props.userData.background.url)}") `,backgroundSize: "contain"}
                        :
                        {backgroundImage: `url("${(props.userData.background && props.userData.background.url)}") `})
                )
        )}>
        {/*<div className={style.main} style={({backgroundImage: `url("https://cdn.igromania.ru/mnt/news/c/5/a/d/4/0/74239/f1332090f94100aa_1200xH.jpg") `})}>*/}
            <div onClick={onOutButtonClick} className={style.outIcon}>
                <img src={outIcon} alt="out"/>
            </div>
            <div className={style.content}>
                {check ?
                    <div className={style.avatarka}
                         style={({backgroundImage: `url("${props.hostPageUserData.avatar}") `})}></div>
                    :
                    <div className={style.avatarka}
                         style={({backgroundImage: `url("${props.userData.avatar}") `})}></div>
                }
                <div className={style.name}>
                    {check ?
                        <span>{props.hostPageUserData.name + " " + props.hostPageUserData.lastName}</span>
                        :
                        <span>{props.userData.name + " " + props.userData.lastName}</span>
                    }
                    {check && (!checkFriend ?
                            <div onClick={changeFriend} className={style.name_buttonFriend}>Добавить в друзья</div>
                            :
                            <div onClick={changeFriend}
                                 className={style.name_buttonFriend + " " + style.name_buttonFriend_delete}>Удалить из
                                друзей</div>
                    )}
                </div>
            </div>
        </div>
    )


}




export default Header