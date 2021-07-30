import React, {useEffect, useState} from 'react';
import style from './Pepe.module.css'
import {pepeNeuralWord} from "../../API/api";
import clownPepe from "../../file/images/clownPepe.png"
import info from "../../file/images/info.svg"

function Pepe(props) {

    const [text,setText] = useState('')
    const [modalText,setModalText] = useState('Напишите слово')
    const [error,setError] = useState('')
    const [answer,setAnswer] = useState(2)
    const [answerText,setAnswerText] = useState('')

    const sendWord = async () =>{
        let noUppercaseText = text.toLowerCase()
        let check = true

        for (let i = 0; i< text.length;i++){

            if((noUppercaseText[i].charCodeAt(0) < 'а'.charCodeAt(0))||(noUppercaseText[i].charCodeAt(0) > 'я'.charCodeAt(0))){
                check = false
            }
        }
        if(check && (noUppercaseText.length <= 20) && (noUppercaseText.length > 1)){
            let data = await pepeNeuralWord(noUppercaseText)
            console.log(data)
            setAnswerText(text)
            setText("")
            setAnswer(data)
        }else {
            if(!check){
                setError("недопустимые символы")
            }else {
                if (noUppercaseText.length <=1 ){
                    setError("слишком мало символов")
                }
                if (noUppercaseText.length > 20 ){
                    setError("слишком много символов")
                }

            }

        }
    }
    const changeValue = (e) =>{
        let char = e.target.value
        setError('')
        setText(char)
        setAnswerText('')
        setAnswer(2)
    }

    const pressEnter = (e) =>{
        if(e.key == "Enter"){
            sendWord()
            e.preventDefault();
        }
    }

    return(
        <div className={style.main}>
            <h3>Лягушка нейронка</h3>
            <p>Что такое хорошо, что такое плохо, по мнению пепе <b className={style.inf}><img src={info} alt=""/><div className={style.hidden_inf}>Слово должно быть написанно кирилицей и не превышать двадцати символов</div> </b></p>
            <div className={style.container}>
                <div className={style.col_1}>
                    <img src={clownPepe} alt="clownPepe"/>
                    <div className={style.answer}>{answerText}<br/> <b>{Math.round(answer) == 1 && "это хорошо"}{Math.round(answer) == 0 && "это плохо"}</b></div>
                    <div className={style.modal}>{error.length > 0 ? error : (answer == 2 ? modalText : 'я уверен на '+ Math.abs(answer - 0.5)*200 +'%')}</div>
                </div>
                <div className={style.col_2}>
                    <div className={style.containerInput}>
                        <input onKeyDown={pressEnter} placeholder={"Ваше слово"} type="text" value={text} onChange={changeValue} style={(error.length > 0 ? {borderBottom: "1px solid red"} : {borderBottom: "1px solid  #66a4ac"})}/>
                    </div>
                    <div onClick={sendWord} className={style.button}>отправить</div>
                </div>
            </div>

        </div>
    )


}




export default Pepe