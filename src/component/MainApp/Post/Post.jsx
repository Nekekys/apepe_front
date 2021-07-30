import React from 'react';
import style from './../MainApp.module.css'
import {NavLink} from "react-router-dom";





function Post(props) {

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

    const clickAnswer = () =>{
        props.modal(props.data.id)
    }
    
    return(
        <div className={style.post}>
            <NavLink className={style.link} to={(props.hostId ? `/user/${props.hostId}` : `/`)}>
                <div className={style.post_avatarka}>
                    <img src={props.userData.avatar} alt="ava"/>
                    {props.hostId && (props.userData.online && <span className={style.online}></span>)}
                </div>
            </NavLink>
            <div className={style.post_main}>
                <div className={style.post_name_con}>
                    <NavLink className={style.link} to={(props.hostId ? `/user/${props.hostId}` : `/`)}>
                        <div className={style.post_name}>
                            {props.userData.name} {props.userData.lastName}
                        </div>
                    </NavLink>
                    <div className={style.post_name_time}>
                        {dataString}
                    </div>
                    {props.reply && <NavLink to={'/branchPost/'+ props.userData._id + '/' + props.data.id} onClick={clickAnswer} className={style.post_name_answer}>
                        ответить
                    </NavLink>}
                </div>
                <div className={style.post_text}>
                    {props.data.textPost}
                </div>
            </div>
        </div>
    )


}




export default Post