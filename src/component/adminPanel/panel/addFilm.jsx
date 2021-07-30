import React, {useState} from 'react';
import style from './../adminPanel.module.css'
import {Field, reduxForm} from "redux-form";


function AdminAddForm (props) {

    const [arr,arrSet] = useState([])
    let Arr = []


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



    return (
        <form className={style.formAdd} onSubmit={props.handleSubmit}>
            <span>Название:</span>
            <Field  component={"input"} name={"name"}  className={style.formAdd_input} type="text"/>
            <span>Описание:</span>
            <Field  component={"textarea"}  rows={"3"} name={"description"}  className={style.formAdd_textArea} type="text"/>
            <span>Режиссёр:</span>
            <Field  component={"input"} name={"producer"}  className={style.formAdd_input} type="text"/>
            <span>Ссылка:</span>
            <Field  component={"input"} name={"src"}  className={style.formAdd_input} type="text"/>
            <div className={style.formAdd_box_con}>
                <span>Лучшее:</span>
                <Field  component={"input"} name={"best"}  className={style.formAdd_box} type="checkbox"/>
            </div>
            <div className={style.formAdd_box_con + ' ' + style.formAdd_numberDiv}>
                <span>Год:</span>
                <Field  component={"input"} name={"year"} min={"1900"} max={"2025"} className={style.formAdd_number} type="number"/>
            </div>
            <div className={style.formAdd_box_con + ' ' + style.formAdd_numberDiv}>
                <span>Оценка фильма:</span>
                <Field  component={"input"} name={"appraisal"} min={"1"} max={"10"} className={style.formAdd_number} type="number" step={0.1}/>
            </div>
            <div className={style.formAdd_box_con}>
                <span>Постер:</span>
                {/*<Field  component={"input"} onChange={onChange}  className={style.formAdd_photo} type="file"/>*/}
                <input type="file" onChange={props.onChangeFile} name={"photo_1_1"}/>
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

const AdminAddReduxForm = reduxForm({
    form: 'addNewFilm'
})(AdminAddForm)


function AddFilm(props) {

    const [imageAsFile, setImageAsFile] = useState('')
    const [check, setCheck] = useState(false)
    const [genre, setGenre] = useState([])


    const onChangeFile = (e) =>{
        const image = e.target.files[0];
        setImageAsFile((imageFile ) => image)
    }

    const ChangeGenre = (e) => {
        setGenre(e)
    }

    const addFilmFun = (val) =>{
        let name = val.name;
        let description = val.description;
        let producer = val.producer;
        let best = val.best;
        let year = val.year;
        let appraisal = val.appraisal;
        let genreArr = genre;
        let src = val.src;
        let id = props.count;
        let poster = imageAsFile;
        if((name != '') && (description != '') && (producer != '') && (year != '') && (appraisal != '') && (genreArr.length != 0) && (src != '')){
            props.addNewFilm(year,name,description,appraisal,producer,best,genreArr,src,id,poster);
            props.ChangeTransition();
        }
    }


/*
    const onChangeFile1 = (e) =>{
        const image = e.target.files[0];
        setImageAsFile((imageFile ) => image)
    }*/


    return(
        <div>
            <div className={style.container}>
                <div className={style.main_add}>
                    <AdminAddReduxForm onChangeFile={onChangeFile} onSubmit={addFilmFun} genres={props.genres} ChangeGenre={ChangeGenre} />
                </div>
            </div>
        </div>
    )
}




export default AddFilm