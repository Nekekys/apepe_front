import React, {useEffect, useState} from 'react';
import style from './Setting.module.css'
import {textPostValidation} from "../general/validation/validation";


function Setting(props) {


    const CHANGE_AVATAR = 'CHANGE_AVATAR',CHANGE_FON = 'CHANGE_FON',CHANGE_LOGIN = 'CHANGE_LOGIN',CHANGE_PASSWORD = 'CHANGE_PASSWORD'
    const [choice,setChoice] = useState(CHANGE_AVATAR)
    const [column,setColumn] = useState()
    const [uploadFile,setUploadFile] = useState()

    const [validate,setValidate] = useState(true)

    const [loginText,setLoginText] = useState('')
    const [passwordText,setPasswordText] = useState('')

    const [dropCheck,setDropCheck] = useState(false)
    const [dropUploadCheck,setDropUploadCheck] = useState(false)

    const [qwert,setQwert] = useState()
    const [checkRepeatFon,setCheckRepeatFon] = useState(false)

    const DragStartFun = (e) =>{
        e.preventDefault()
        setDropCheck(true)
        setValidate(true)
    }
    const DragLeaveFun = (e) =>{
        e.preventDefault()
        setDropCheck(false)

    }

    const DropFun = (e) =>{
        e.preventDefault()
        setUploadFile(e.dataTransfer.files[0])
        let file = e.dataTransfer.files[0]
        let reader = new FileReader();

        let name = e.dataTransfer.files[0].name
        let resolution = ""
        let check = true
        for(let i = name.length-1;i > 0 ;i--){
            if(check && name[i] != '.'){
                resolution+= name[i]
            }else{
                check = false
            }
        }
        if((resolution == "gnp")||(resolution == "gpj")||(resolution == "gepj")||(resolution == "GPJ")){
            reader.readAsDataURL(file)
            reader.onload = function (){
                setQwert(reader.result)
              /*  const data = new FormData();
                data.append("avatar", reader.result);
                props.changeUserAvatar(props.user._id,data)*/
               // props.changeUserAvatar(props.user._id,reader.result)
            }
            setDropUploadCheck(true)
        }else{
            setValidate(false)
        }
        setDropCheck(false)
    }

    const changeLoginText = (e) =>{
        let text = e.target.value
        setLoginText(text)
        setValidate(true)
    }

    const clickOnUploadLogin = () =>{
        let obj = textPostValidation(loginText)
        if(obj.boo){
            let text = ''
            for (let i = 0;i < obj.textWithoutSpaceReverse.length;i++){
                text+= obj.textWithoutSpaceReverse[i]
            }
            if((text != props.user.login)&&(text.length > 5)){
                props.changeLoginAsync(props.user._id,text)
                setLoginText('')
            }else {
                setValidate(false)
                setLoginText('')
            }
        }else{
            setValidate(false)
            setLoginText('')
        }
    }

    const changePasswordText = (e) =>{
        let text = e.target.value
        setPasswordText(text)
        setValidate(true)
    }
    const clickUploadFile = () =>{
        const data = new FormData();
       // data.append("avatar", uploadFile);
        if(choice == CHANGE_AVATAR){
            data.append("avatar", uploadFile);
            props.changeUserAvatar(props.user._id,data)
        }else{
            data.append("background", uploadFile);
            props.changeUserBackground(props.user._id,data)
        }
     //   props.changeUserAvatar(props.user._id,qwert)
        setDropUploadCheck(false)
        setQwert(null)
    }

    const clickOnUploadPassword = () =>{
        let obj = textPostValidation(passwordText)

        if(obj.boo){
            let text = ''
            for (let i = 0;i < obj.textWithoutSpaceReverse.length;i++){
                text+= obj.textWithoutSpaceReverse[i]
            }
            if((text != props.user.password)&&(text.length > 5)){
                props.changePasswordAsync(props.user._id,text)
                setPasswordText('')
            }else {
                setValidate(false)
                setPasswordText('')
            }
        }else{
            setValidate(false)
            setPasswordText('')
        }
    }


    const changeBackgroundRepeat = () =>{
        //checkRepeatFon

        props.changeCheckRepeatBackground(props.user._id,!checkRepeatFon)
        //setCheckRepeatFon(!checkRepeatFon)
    }

    useEffect(()=>{
        if(props.user.background){
            setCheckRepeatFon(props.user.background.repeatBackground)
        }
    },[props.user])


    const EnterKeyLogin = (e) =>{
        if(e.key == "Enter"){
            clickOnUploadLogin()
            e.preventDefault();
        }
    }

    const EnterKeyPassword = (e) =>{
        if(e.key == "Enter"){
            clickOnUploadPassword()
            e.preventDefault();
        }
    }

    useEffect(()=>{
        setColumn ( ()=>{
            switch (choice) {
                case CHANGE_AVATAR:
                    return  <div className={style.elem}>
                        <h1>Изменить аватарку</h1>
                        <div className={style.body}>
                            {dropCheck ?<div
                                    onDragStart={event => DragStartFun(event)}
                                    onDragLeave={event => DragLeaveFun(event)}
                                    onDragOver={event => DragStartFun(event)}
                                    onDrop={event => DropFun(event)}
                                    className={style.darg_area}>Отпустите изображение, чтобы загурузить</div>
                                :<div
                                    onDragStart={event => DragStartFun(event)}
                                    onDragLeave={event => DragLeaveFun(event)}
                                    onDragOver={event => DragStartFun(event)}
                                    className={style.darg_area_start}>{validate ? "Перетащите изображение, чтобы загурузить" : "Неверный формат"}</div>}
                        </div>
                        <img src={qwert} alt=""/>
                        {dropUploadCheck && <div className={style.button}>
                                <div onClick={clickUploadFile} className={style.btn}>Загрузить</div>
                            </div>}
                    </div>
                case CHANGE_FON:
                    return  <div className={style.elem}>
                        <h1>Изменить Фон</h1>
                        {!checkRepeatFon ? <span onClick={changeBackgroundRepeat} className={style.elem_background_check}>Сделать повторяющийся фон</span>
                        : <span onClick={changeBackgroundRepeat} className={style.elem_background_check}>Сделать не повторяющийся фон</span>}
                        <div className={style.body}>
                            {dropCheck ?<div
                                    onDragStart={event => DragStartFun(event)}
                                    onDragLeave={event => DragLeaveFun(event)}
                                    onDragOver={event => DragStartFun(event)}
                                    onDrop={event => DropFun(event)}
                                    className={style.darg_area}>Отпустите изображение, чтобы загурузить</div>
                                :<div
                                    onDragStart={event => DragStartFun(event)}
                                    onDragLeave={event => DragLeaveFun(event)}
                                    onDragOver={event => DragStartFun(event)}
                                    className={style.darg_area_start}>{validate ? "Перетащите изображение, чтобы загурузить" : "Неверный формат"}</div>}
                        </div>
                        <img src={qwert} alt=""/>
                        {dropUploadCheck && <div className={style.button}>
                            <div onClick={clickUploadFile} className={style.btn}>Загрузить</div>
                        </div>}
                    </div>
                case CHANGE_LOGIN:
                    return   <div className={style.elem}>
                        <h1>Изменить логин</h1>
                        <div className={style.body}>
                            <input style={(!validate ? {borderBottom: "1px solid red"} : {})}
                                   onChange={changeLoginText} value={loginText} onKeyDown={EnterKeyLogin}
                                   placeholder={"Ваш логин: " + props.user.login} className={style.input} type="text"/>
                        </div>
                        <div className={style.button}>
                            <div onClick={clickOnUploadLogin} className={style.btn}>Установить</div>
                        </div>

                    </div>
                case CHANGE_PASSWORD:
                    return   <div className={style.elem}>
                        <h1>Изменить пароль</h1>
                        <div className={style.body}>
                            <input style={(!validate ? {borderBottom: "1px solid red"} : {})}
                                   onChange={changePasswordText} value={passwordText} onKeyDown={EnterKeyPassword}
                                   placeholder={"Ваш пароль: " + props.user.password[0] + props.user.password[1] + props.user.password[2] + "*****"} className={style.input} type="text"/>
                        </div>
                        <div className={style.button}>
                            <div onClick={clickOnUploadPassword} className={style.btn}>Установить</div>
                        </div>
                    </div>
                default:
            }
        })


    },[choice,dropCheck,qwert,loginText,validate,passwordText,checkRepeatFon,props])

    const clickMenu = (name) =>{
        setChoice(name)
        setDropUploadCheck(false)
        setUploadFile(null)
        setQwert(null)
        setValidate(true)
    }

    return(
        <div className={style.main}>
            <div className={style.col_1}>
                <div onClick={()=>clickMenu(CHANGE_AVATAR)} className={style.item}>Изменить аватарку</div>
                <div onClick={()=>clickMenu(CHANGE_FON)} className={style.item}>Изменить фон</div>
                <div onClick={()=>clickMenu(CHANGE_LOGIN)} className={style.item}>Изменить логин</div>
                <div onClick={()=>clickMenu(CHANGE_PASSWORD)} className={style.item}>Изменить Пароль</div>
            </div>
            <div className={style.col_2}>
                {column}
            </div>
        </div>

    )


}




export default Setting