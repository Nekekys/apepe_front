import React, {useState} from 'react';
import style from './adminPanel.module.css'
import {Field, reduxForm} from "redux-form";
import Panel from "./panel/panel";
import AddFilm from "./panel/addFilm";
import ChangeFilm from "./panel/changeFilm";


function AdminForm (props) {

    return (
        <form className={style.AdminIn}  onSubmit={props.handleSubmit}>
            <span>Логин:</span>
            <Field  component={"input"} name={"login"}  className={style.Admin_input_login} type="text"/>
            <span>Пароль:</span>
            <Field  component={"input"} name={"password"}  className={style.Admin_input_password} type="password"/>
            <button /*onClick={props.handleSubmit}*/ className={style.Admin_Button}>Отправить</button>
        </form>
    );
}

const AdminReduxForm = reduxForm({
    form: 'Admin'
})(AdminForm)




function AdminPanel(props) {


    const [transition,transitionSet] = useState('panel')

    const AdminVvod = (e) => {
        if((e.login == 'admin')&&(e.password == 'admin')){
            transitionSet('panel')
        }
    }
    const ChangeTransition = () =>{
        transitionSet('panel')
    }

    const ChangeTransitionAdd = () =>{
        transitionSet('add')
    }



    if(transition == 'entrance'){
        return(
            <div>
                <div className={style.container}>
                    <div className={style.main}>
                        <AdminReduxForm onSubmit={AdminVvod} />
                    </div>
                </div>
            </div>
        )
    }else if(transition == 'panel'){
        return <Panel ChangeFilmState={props.ChangeFilmState} filmData={props.filmData} ChangeTransitionAdd={ChangeTransitionAdd} genres={props.genres}/>
    }else if(transition == 'add'){
        return <AddFilm count={props.count} ChangeTransition={ChangeTransition} genres={props.genres} addNewFilm={props.addNewFilm} />
    }/*else if(transition == 'change'){
        return <ChangeFilm ChangeTransition={ChangeTransition} dataFilm={dataFilm} genres={props.genres} addNewFilm={props.addNewFilm}/>}*/




}




export default AdminPanel