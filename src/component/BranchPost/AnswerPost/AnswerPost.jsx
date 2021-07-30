import React, {useEffect, useState} from 'react';
import style from './../branchPost.module.css'
import {NavLink} from "react-router-dom";
import {axiosGetDataUser} from "../../../API/api";
import {Link} from 'react-scroll'

function AnswerPost(props) {

    const [userData,setUserData] = useState({
       // name: "имя",
     //   lastName: "фамилия"
    })
    const [userAnswer,setUserAnswer] = useState('')

    const setPost = async () => {
        let user = await axiosGetDataUser(props.data.senderID)
        setUserData(user);
    }
    const setAnswerUser = async () => {
        let user = await axiosGetDataUser(props.data.answerUserId)
        setUserAnswer(user.name + " " + user.lastName);
    }

    useEffect( ()=>{
        setPost()
        if(props.data.answerCheck){
            setAnswerUser()
        }
    },[])

    let postTime = props.data.postTime
    let dataNow = Date.now()
    let dataPostObj = new Date(postTime)
    let dataString = ""
    if(dataNow - postTime < 1000*60){
        if(Math.trunc((dataNow - postTime)/1000) == 0){
            dataString = "сейчас"
        }else{
            dataString = "меньше минуты";
        }


    }else if(dataNow - postTime < 1000*60*60){
        dataString = Math.trunc((dataNow - postTime)/60000) + " мин назад";
    }else if(dataNow - postTime < 1000*60*60*24){
        if((Math.trunc((dataNow - postTime)/3600000) == 1)||(Math.trunc((dataNow - postTime)/3600000) == 21)){
            dataString = Math.trunc((dataNow - postTime)/3600000) + " час назад";
        }else if( (Math.trunc((dataNow - postTime)/3600000) > 21)||(Math.trunc((dataNow - postTime)/3600000) < 5)){
            dataString = Math.trunc((dataNow - postTime)/3600000) + " часа назад";
        }else{
            dataString = Math.trunc((dataNow - postTime)/3600000) + " часов назад";
        }

    }else  if(dataNow - postTime < 1000*60*60*24*365){
        if(dataPostObj.getMonth() < 9){
            dataString = dataPostObj.getDate() + "." + 0 + (dataPostObj.getMonth() + 1)
        }else{
            dataString = dataPostObj.getDate() + "." +  (dataPostObj.getMonth() + 1)
        }
    }else  if(dataNow - postTime > 1000*60*60*24*365){
        if(dataPostObj.getMonth() < 9){
            dataString = dataPostObj.getDate() + "." + 0 + (dataPostObj.getMonth() + 1) + "." + dataPostObj.getFullYear()
        }else{
            dataString = dataPostObj.getDate() + " " +  (dataPostObj.getMonth() + 1) + " " + dataPostObj.getFullYear()
        }
    }



    return(
        <div name={props.data.id} className={style.answerPost} style={(props.backlightPostId == props.data.id ? {borderRight: "1px solid #c2dde4",background: "linear-gradient(90deg, rgba(9,9,121,0) 78%, rgba(194,221,228,1) 100%)"} : {borderRight: "1px solid transparent"})}>
            <NavLink to={"/user/"+props.data.senderID} className={style.avatar}>
                <img src={userData && userData.avatar} alt=""/>
                {props.check && <span className={style.onlineCheck}></span>}
            </NavLink>
            <div className={style.postBody}>
                <div className={style.name}><NavLink to={"/user/"+props.data.senderID} className={style.name_text}>{userData ? (userData.name + " " + userData.lastName) : "имя фамилия"}</NavLink>
                    <div className={style.name_time}>{dataString}</div>
                    <div onClick={()=>props.answerPostFunction(props.data.id,props.data.senderID,userData.name)} className={style.name_answer_scroll}>ответить</div>
                </div>
                <div className={style.text}>
                    {props.data.answerCheck  &&
                    <Link onClick={()=>props.changeIdBacklightPost(props.data.answerPostId)} smooth={true}
                          offset={-250} to={props.data.answerPostId} duration={300}>{userAnswer + ", "}</Link>} {props.data.textPost}
                </div>
            </div>

        </div>
    )


}




export default AnswerPost