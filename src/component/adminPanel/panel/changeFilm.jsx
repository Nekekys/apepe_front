import React, {useState} from 'react';
import style from './../adminPanel.module.css'
import {Field, reduxForm} from "redux-form";


function AdminChangeForm (props) {

    const [arr,arrSet] = useState([])
    let Arr = [];


    const ObjPrevGenres = props.dataFilm[0].genres.map(e =>{
        return <div className={style.foemAdd_Genres_el}>{e}</div>
    })

    const ObjGenres = props.genres.map(e => {
        return <option>{e}</option>
    })


    const selectGenres = (e) => {
        let agg = e.target.value
        Arr.push(
            <div className={style.foemAdd_Genres_el}>
                {e.target.value}
            </div>
        )
        arrSet(arr => [...arr, Arr])
        props.ChangeGenre(genre => [...genre, agg])
    }

    let naname = props.dataFilm[0].name;

    return (
        <form className={style.formAdd} onSubmit={props.handleSubmit}>
            <span>Название:</span>
            <p>{props.dataFilm[0].name}</p>
            <Field  component={"input"} name={"name"} defoultValue={naname}  className={style.formAdd_input} type="text"/>
            <span>Описание:</span>
            <p>{props.dataFilm[0].description}</p>
            <Field  component={"textarea"}  rows={"3"} name={"description"}  className={style.formAdd_textArea} type="text"/>
            <span>Режиссёр:</span>
            <p>{props.dataFilm[0].stageDirector}</p>
            <Field  component={"input"} name={"producer"}  className={style.formAdd_input} type="text"/>
            <span>Ссылка:</span>
            <p>{props.dataFilm[0].src}</p>
            <Field  component={"input"} name={"src"}  className={style.formAdd_input} type="text"/>
            <div className={style.formAdd_box_con}>
                <span>Лучшее:</span>
                <Field  component={"input"} name={"best"}  className={style.formAdd_box} type="checkbox"/>
            </div>
            <div className={style.formAdd_box_con + ' ' + style.formAdd_numberDiv}>
                <span>Год:</span>
                <p>{props.dataFilm[0].year}</p>
                <Field  component={"input"} name={"year"} min={"1900"} max={"2025"} className={style.formAdd_number} type="number"/>
            </div>
            <div className={style.formAdd_box_con + ' ' + style.formAdd_numberDiv}>
                <span>Оценка фильма:</span>
                <p>{props.dataFilm[0].appraisal}</p>
                <Field  component={"input"} name={"appraisal"} min={"1"} max={"10"} className={style.formAdd_number} type="number" step={0.1}/>
            </div>
            <div className={style.formChangeGenres}>
                {ObjPrevGenres}
            </div>
            <select name="genres" className={style.formAdd_select} onChange={selectGenres} >
                <optgroup label="Жанры">
                    {ObjGenres}
                    {/*<option value="r1">Закуска Барская</option>
                    <option value="r2">Раки, фаршированные по-царски</option>
                    <option value="r3">Биточки в горшочке</option>*/}
                </optgroup>
            </select>
            <div className={style.foemAdd_Genres}>
                {arr}
            </div>
            <button  className={style.formAdd_button}>Добавить</button>
        </form>
    );
}

const AdminChangeReduxForm = reduxForm({
    form: 'addNewFilm'
})(AdminChangeForm)



function ChangeFilm(props) {

    const changeFilmData = props.filmData.filter(e => {
        return e.id == props.data
    })

    const [genre, setGenre] = useState([])

    const ChangeGenre = (e) => {
        setGenre(e)
    }

    const addFilmFun = (val) =>{

        let name = val.name
        if((name == '') || (name == undefined)){
            name = changeFilmData[0].name
        }
        let description = val.description;
        if((description == '') || (description == undefined)){
            description = changeFilmData[0].description
        }
        let producer = val.producer;
        if((producer == '') || (producer == undefined)){
            producer = changeFilmData[0].stageDirector
        }
        let best = val.best;
        let year = val.year;
        if((year == '') || (year == undefined)){
            year = changeFilmData[0].year
        }
        let appraisal = val.appraisal;
        if((appraisal == '') || (appraisal == undefined)){
            appraisal = changeFilmData[0].appraisal
        }
        let genreArr = genre;
        if(genreArr.length == 0){
            genreArr = changeFilmData[0].genres
        }
        let src = val.src;
        if((src == '') || (src == undefined) || (src == null)){
            src = changeFilmData[0].src
        }
        let id = changeFilmData[0].id
        if((name != '') && (description != '') && (producer != '') && (year != '') && (appraisal != '')){
            props.ChangeFilmState(year,name,description,appraisal,producer,best,genreArr,src,id);
            props.ChangeTransition();
        }
    }


    return(
        <div>
            <div className={style.container}>
                <div className={style.main_add}>
                    <AdminChangeReduxForm dataFilm={changeFilmData} onSubmit={addFilmFun} genres={props.genres} ChangeGenre={ChangeGenre} />
                </div>
            </div>
        </div>
    )
}




export default ChangeFilm