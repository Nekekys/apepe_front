import React, {useEffect, useState} from 'react';
import style from './startPage.module.css'
import {Field, reduxForm} from "redux-form";
import close from '../../file/images/closeIcon.svg'
import info from '../../file/images/info.svg'
import {axiosLoginIn, axsiosPostReg} from "../../API/api";
import {changeOnlineUser} from "../../redux/authReduser";



function RegistrationForm (props) {

    return (
        <form className={style.LoginIn_form_container}  onSubmit={props.handleSubmit}>
            <div className={style.LoginIn_form_input + ' ' + style.reg_form_input}>
                <span>Зарегестрироватся в <w>apepe</w></span>
                <Field placeholder={"ваше имя"}  component={"input"} name={"name"} onChange={props.changeInputReg}
                       className={style.Registration_input + " " + style.input} type="text"/>
                <Field placeholder={"ваша фамилия"}  component={"input"} name={"lastName"} onChange={props.changeInputReg}
                       className={style.Registration_input + " " +style.input} type="text"/>
                <Field placeholder={"введите логин"}  component={"input"} name={"login"} onChange={props.changeInputReg}
                       className={style.Registration_input + " " + style.input} type="text"/>
                <Field placeholder={"введите почту"}  component={"input"} name={"email"} onChange={props.changeInputReg}
                       className={style.Registration_input + " " + style.input} type="text"/>
                <Field placeholder={"введите пароль"}  component={"input"} name={"password"} onChange={props.changeInputReg}
                       className={style.Registration_input + " " + style.input} type="password"/>
            </div>
            <button /*onClick={props.handleSubmit}*/ className={style.Form_Button}>Отправить</button>
        </form>
    );
}

function LoginInForm (props) {

    return (
        <form className={style.LoginIn_form_container}  onSubmit={props.handleSubmit}>
            <div className={style.LoginIn_form_input}>
                <span>Войти в <w>apepe</w></span>
                <Field  onChange={props.changeInputLogin} placeholder={"введите логин"}  component={"input"} name={"login"}  className={style.LoginIn_input_login + " " + style.input} type="text"/>
                <Field onChange={props.changeInputLogin} placeholder={"введите пароль"}  component={"input"} name={"password"}  className={style.LoginIn_input_password + " " + style.input} type="password"/>
            </div>
            <button className={style.Form_Button}>Отправить</button>
        </form>
    );
}

const LoginInReduxForm = reduxForm({
    form: 'LoginIn',
})(LoginInForm)
const RegistrationReduxForm = reduxForm({
    form: 'Registration'
})(RegistrationForm)


function StartPage(props) {

    const [loginIn,setLoginIn] = useState(false)
    const [Registration,setRegistration] = useState(false)
    const [infoModal,setInfoModal] = useState(false)

    const [validText,setValidText] = useState('')
    const [validTextReg,setValidTextReg] = useState('')




    const windowLoginIn = () =>{
        setLoginIn(!loginIn)
    }
    const windowRegistration = () =>{
        setRegistration(!Registration)
    }

    const windowInfo = () =>{
        setInfoModal(!infoModal)
    }

    const LoginIn = async (e) =>{

        if(e.login && e.password){
            if(e.login.length < 4 || e.password.length < 4 ){
                setValidText('Добавьте больше символов')
                //e.login = ''
            }else{
                //отправить

                let check = await axiosLoginIn(e.login,e.password)
                if(!check.check){
                    setValidText(check.err)
                    e.password = ''
                }else {
                    props.setUSerData(check.user)
                    props.changeOnlineUser(check.user._id,true)
                    localStorage.setItem("login",e.login)
                    localStorage.setItem("password",e.password)
                }
                props.isLoginIn(check.check)
            }
        }else {
            setValidText('Заполните все поля')
        }

    }

    const RegistrationFun = async (e) =>{
        if(e.login && e.password && e.email && e.name && e.lastName){
            if(e.login.length > 3 && e.password.length > 3 && e.email.length > 3 && e.name.length > 3 && e.lastName.length > 3){
                let check = await axsiosPostReg(e.login, e.password, e.email,e.name, e.lastName)
                if(check.check){
                    props.isLoginIn(check.check)
                    props.setUSerData(check.user)
                    localStorage.setItem("login",e.login)
                    localStorage.setItem("password",e.password)
                }else{
                    setValidTextReg(check.err)
                }
            }else{
                setValidTextReg('Добавьте больше символов(более трех)')
            }
        }else{
            setValidTextReg('Заполните все поля')
        }
    }


    const changeInputLogin = () =>{
        setValidText('')
    }
    const changeInputReg = () =>{
        setValidTextReg('')
    }



    return(
        <div className={style.main}>
            <div className={style.left_part}>
                <span className={style.logo}>apepe</span>
            </div>
            <div className={style.right_part}>
                <p className={style.text}>Социальная сеть для грустных Жабок <span onClick={windowInfo}><img src={info} alt=""/></span></p>
                <div onClick={windowLoginIn} className={style.loginIn + " " + style.btn }><span>Войти</span></div>
                <div onClick={windowRegistration} className={style.checkIn + " " + style.btn }><span>Регистрация</span></div>
            </div>
            <div className={style.loginIn_Window} style={(!loginIn ? {display: "none"} : {display: "flex"})}>
                <div className={style.loginIn_Window_main}>
                    <div onClick={windowLoginIn} className={style.close}>
                        <img src={close} alt=""/>
                    </div>
                    <LoginInReduxForm loginWithCookie={props.loginWithCookie} changeInputLogin={changeInputLogin} onSubmit={LoginIn}/>
                    <span className={style.validate_text}>{validText}</span>
                </div>
            </div>
            <div className={style.loginIn_Window  } style={(!Registration ? {display: "none"} : {display: "flex"})}>
                <div className={style.loginIn_Window_main + ' ' + style.regHeight}>
                    <div onClick={windowRegistration} className={style.close}>
                        <img src={close} alt=""/>
                    </div>
                    <RegistrationReduxForm changeInputReg={changeInputReg}  onSubmit={RegistrationFun}/>
                    <span className={style.validate_text}>{validTextReg}</span>
                </div>
            </div>
            <div className={style.modal_info} style={(!infoModal ? {display: "none"} : {display: "flex"})}>
                <div className={style.modal_info_main  }>
                    <div onClick={windowInfo} className={style.close}>
                        <img src={close} alt=""/>
                    </div>
                    <div className={style.modal_info_con}>
                        <h2>Информация</h2>
                        <p>Привет, меня зовут <span>Виталий<div className={style.modal_src}><a href="https://vk.com/animepoliceman">vk</a><a href="https://github.com/Nekekys">github</a></div></span>, эта социальная сеть была разработана мной в учебно-развлекательных целях.
                            Были использованы такие технологи как: React/Redux на стороне front-end'a, Node.js/Express на стороне Back-end'a, база данных - MongoDB. Лягушка нейронка была создана при помощи
                            Brain.js, она состоит из 20-ти нейронов и была обучена 10000-ми итераций.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}




export default StartPage