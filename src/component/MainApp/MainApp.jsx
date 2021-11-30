import React, {useEffect, useState} from 'react';
import style from './MainApp.module.css'
import close from '../../file/images/closeIcon.svg'
import {NavLink, Redirect} from "react-router-dom";
import Post from "./Post/Post";
import ButtonSend from "../general/button/button";
import like from "../../file/images/like.svg"
import likeRed from "../../file/images/likeRed.svg"
import comment from "../../file/images/comment.svg"
import {textPostValidation} from "../general/validation/validation";
import preLoader from "../../file/preloader/RipplePreloader.svg";



function MainApp(props) {

    const [text,setText] = useState('')
    const [textModal,setTextModal] = useState('')
    const [id,setId] = useState(0)
    const [valid,setValid] = useState(false)
    const [validModal,setValidModal] = useState(false)
    const [modal,setModal] = useState(false)

    const [refresh,setRefresh] = useState(1)  // костыль пофиксил


    useEffect( ()=>{
        if(props.hostId) {
            props.setAllPostAsync(props.hostId)
        }else {
            if(props.userId) props.setAllPostAsync(props.userId)

        }
    },[props.userId])

    useEffect( ()=>{
        return ()=>{
            props.clearMainPost()
        }
    },[])

    const showModal = (e)=>{
        setId(e)
        setModal(true)
    }
    const UnShowModal = ()=>{
        setModal(false)
        setValidModal(false)
    }

    const pressLike = (postId,userId,hostId) =>{
        props.setLike(postId,userId,hostId)

    }

    let Posts


    if(props.postData){
        Posts = props.postData.map(e => {
            let checkLike = false
            for(let i = 0; i < e.LikeArray.length; i++){
                if(e.LikeArray[i] == props.userId){
                    checkLike = true
                }
            }

            let dataUser = (!props.hostId) ?  props.userData :  props.alienPageData

            return <div className={style.postContainerForAnimate}>
                <Post hostId={props.hostId} userData={dataUser} reply={true} modal={showModal} data={e} />
                <div className={style.podPost}>
                    {checkLike ?
                        <div onClick={() => pressLike(e.id,props.userId,props.hostId)} className={style.podPost_like}>
                            <img src={likeRed} alt="likeRed"/>
                            <span>{e.countLike != 0 && e.countLike}</span>
                        </div>
                        :
                        <div onClick={() => pressLike(e.id,props.userId,props.hostId)} className={style.podPost_like}>
                            <img src={like} alt="like"/>
                            <span>{e.countLike != 0 && e.countLike}</span>
                        </div>
                    }

                    <NavLink to={'/branchPost/'+ dataUser._id + '/' + e.id} className={style.podPost_comment}>
                        <img src={comment} alt="comment"/>
                        <span>{e.countAnswer != 0 && e.countAnswer}</span>
                    </NavLink>
                </div>
            </div>
        })
    }

    const changeValue = (e) =>{
        let localText = e.target.value
        setText(localText)
        setValid(false)
    }
    const changeValueModal = (e) =>{
        let localText = e.target.value
        setTextModal(localText)
        setValidModal(false)
    }

    const sendPostModal = () =>{

        let result = textPostValidation(textModal)
        if(result.boo){
            props.setComment(textModal,props.userId,id) //85749625 - userId
            setTextModal('')
            UnShowModal()
        }else {
            /*setValid(true)*/
            setValidModal(true)
            setTextModal('')
        }


    }

    const sendPost = () =>{
        let result = textPostValidation(text)
        if(result.boo){
            props.setPost(result.textWithoutSpaceReverse,props.userId)
        }else {
            setValid(true)
        }
        setText('')
    }

    const returnPost = () =>{
        for(let i = 0; i < props.postData.length; i++){
            if(props.postData[i].id == id){
                return props.postData[i]
            }
        }
    }

    const EnterKey = (e) =>{
        if(e.key == "Enter"){
            sendPost()
            e.preventDefault();
        }
    }

    if (props.hostId == props.userId) {
        return <Redirect to="/"/>
    } else {
        return (
            <div className={style.main}>
                {!props.hostId && <div className={style.input}>
                    <div className={style.avatar} style={({backgroundImage: `url("${props.userData.avatar}") `})}>
                        1234567
                    </div>
                    <div className={style.input__container}>
                        <label>
                        <textarea
                            style={(valid ? {borderRight: "2px solid red"} : {borderRight: "2px solid transparent"})}
                            onChange={changeValue} value={text} className={style.input__sam}
                            placeholder={"Что у вас нового?"} onKeyDown={EnterKey}/>
                        </label>
                        <span className={style.input__button}>
                        <div></div>
                       <ButtonSend click={sendPost} text={"Отправить"} paddingSize={"7px 15px"} fontSize={18}/>
                    </span>
                    </div>
                </div>}
                {props.preloader ? <div className={style.preloader}>
                        <img src={preLoader} alt="preloader"/>
                    </div>
                :
                    (Posts.length != 0 ? Posts.reverse()
                        :
                        <div className={style.dontPost}>Постов нет</div>)
                }
                {modal &&
                <div className={style.modalAdd}>
                    <div className={style.modalAdd_main}>
                        <div onClick={UnShowModal} className={style.modalAdd_close}>
                            <img src={close} alt=""/>
                        </div>
                        <div className={style.modalAdd_post}>
                            <Post reply={false} modal={showModal} data={returnPost()}/>
                            <div className={style.modalAdd_reply_polosa}>
                                <div></div>
                            </div>
                            <div className={style.modalAdd_input}>
                                <div className={style.modalAdd_avatar}>
                                    1234567
                                </div>
                                <div className={style.modalAdd__container}>
                                    <label>
                                        <textarea
                                            style={(validModal ? {borderRight: "2px solid red"} : {borderRight: "2px solid transparent"})}
                                            onChange={changeValueModal} value={textModal} className={style.input__sam}
                                            placeholder={"Написать в ответ"}/>
                                    </label>
                                    <span className={style.modalAdd__button}>
                                            <div></div>

                                            <ButtonSend click={sendPostModal} text={"Отправить"}
                                                        paddingSize={"7px 15px"} fontSize={18}/>
                                        </span>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
                }

            </div>
        )
    }

}




export default MainApp