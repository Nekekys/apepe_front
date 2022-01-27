import React, {useEffect, useState} from 'react';
import style from './branchPost.module.css'
import Post from "../MainApp/Post/Post";
//import arrowDown from '../../file/images/download.svg'

import close from '../../file/images/closeIcon.svg'
import AnswerPost from "./AnswerPost/AnswerPost";
import {Link, animateScroll as scroll} from 'react-scroll'
import {NavLink} from "react-router-dom";
import ButtonSend from "../general/button/button";
import {textPostValidation} from "../general/validation/validation";

import preLoader from "../../file/preloader/RipplePreloader.svg"
import {setAllPostAsync} from "../../redux/postReduser";


function BranchPost(props) {


    const [scrollCheck,scrollCheckSet] = useState(false)

    const [textUnderInput,setTextUnderInput] = useState('Написать в ветку')
    const [replyToTheChatCheck,setReplyToTheChatCheck] = useState(false)
    const [idReply,setIdReply] = useState(0)
    const [idReplyUser,setIdReplyUser] = useState(0)
    const [idReplyUserName,setIdReplyUserName] = useState('')

    const [textArea,setTextArea] = useState('')
    const [valid,setValid] = useState(false)

    const [backlightPostId,setBacklightPostId] = useState(0)
    const [answerData,setAnswerData] = useState({})


    const [preloader,setPreloader] = useState(true)


    window.onscroll = () =>{
        if (window.pageYOffset > 400){
            scrollCheckSet(true)
        }else{
            scrollCheckSet(false)
        }
       /* setTimeout(()=>{
            setBacklightPostId(0)
        },2000)*/
    }


    useEffect(()=>{
        if((props.post)){
            if((props.branchPostData.length > 0)||props.post.countAnswer == 0){
                setPreloader(false)
            }else{
                setPreloader(true)
            }
        }else{
            setPreloader(true)
        }
    },[props])


    const answerPostFunction = (postId,userId,name,lastName) =>{

        scroll.scrollToBottom();
        if(postId != props.post.id){
            setIdReply(postId)
            setIdReplyUser(userId)
            setIdReplyUserName(name)
            setReplyToTheChatCheck(true)
            setAnswerData({
                name,lastName
            })
            setTextUnderInput('Написать в ответ')
        }else{
            setIdReply(0)
            setReplyToTheChatCheck(false)
            setIdReplyUserName('')
            setTextUnderInput('Написать в ветку')
        }


    }

    const sendPostFun = () =>{

        let result = textPostValidation(textArea)
        if(result.boo){
            props.setAnswerPostDispatch(result.textWithoutSpaceReverse,props.userData._id,props.postId,props.userId,replyToTheChatCheck,idReply,idReplyUser,props.userData,answerData)
            props.setIncCountAnswerPost(props.postId)
            scroll.scrollToBottom(50);
        }else {
            setValid(true)
        }

        setTextArea('')
    }

    const EnterKey = (e) =>{
        if(e.key == "Enter"){
            sendPostFun()
            e.preventDefault()
        }
    }

    const writeTextarea = (e) =>{
        let text = e.target.value
        setTextArea(text)
        setValid(false)
    }

    const changeIdBacklightPost = (id)=>{
        setBacklightPostId(id)
    }


    let answerPostObj
    let k = 0
    if(props.branchPostData){
        answerPostObj = props.branchPostData.map( elem => {
            let check = (props.userData._id == elem.senderID)
            k++
            return <AnswerPost key={k}  backlightPostId={backlightPostId} check={check}
                               answerPostFunction={answerPostFunction}
                               data={elem} changeIdBacklightPost={changeIdBacklightPost}/>
        })
    }
   /* let answerPostObj = props.post.AnswerArray.map( (e) =>{
       return <AnswerPost answerPostFunction={answerPostFunction} data={e}/>

    })*/



    return(
        <div className={style.main} name="target_scroll_up">
            {scrollCheck &&
                <Link to="target_scroll_up" className={style.scrollArrow} spy={true} smooth={true} duration= {500} offset={-250}>
                    <img src={"https://image.flaticon.com/icons/png/512/892/892499.png"} alt="up"/>
                </Link>
            }
            <div className={style.head}>
                <div className={style.headDiv}>
                    <span>Ветка</span>
                    <Link spy={true} smooth={true} duration= {500} to="target_scroll"
                          className={style.downArrow}><img src={"https://image.flaticon.com/icons/png/512/892/892499.png"} alt="down"/></Link>
                </div>
                {props.post && (
                    props.hostData._id != props.userId ?
                        <Post reply={true} hostId={props.userId} userData={props.userData} modal={answerPostFunction} data={props.post}/>
                        :
                        <Post reply={true} hostId={props.userId} userData={props.hostData} modal={answerPostFunction} data={props.post}/>
                )}

                {/*{props.post && <Post reply={true} userData={props.userData} modal={answerPostFunction} data={props.post}/>}*/}
                <span>Ответы</span>
            </div>
            {preloader ? <div className={style.preloader}>
                    <img src={preLoader} alt="preloader"/>
                </div>
                :
                <div className={style.posts}>
                {answerPostObj}
            </div>}
            <div name="target_scroll" className={style.inputMain}>
                <span>
                    {textUnderInput}
                    {replyToTheChatCheck && <>, <NavLink to={'/'}>{idReplyUserName}</NavLink>
                        <div onClick={()=> answerPostFunction(props.post.id)} className={style.inputMain_close}>
                            <img src={close} alt=""/>
                        </div>
                    </>}

                </span>
                <textarea style={(valid ? {borderBottom: "1px solid red"} : {})} onChange={writeTextarea}
                          value={textArea} placeholder={"текст"} onKeyDown={EnterKey}/>
                <div className={style.inputMain_button}>
                    <ButtonSend click={sendPostFun} fontSize={22} paddingSize={5} text="отправить" />
                </div>
            </div>
        </div>
    )


}




export default BranchPost