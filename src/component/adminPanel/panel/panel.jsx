import React, {useState} from 'react';
import style from './../adminPanel.module.css'
import {Field, reduxForm} from "redux-form";
import PanelElement from "./panelElement";
import plus from "./../../../file/images/plus.svg"
import ChangeFilm from "./changeFilm";



function Panel(props) {

    const [panel,setPanel] = useState(true)
    const [change,setChange] = useState(0)


    const changeFilm = (e) =>{
        setPanel(false)
        setChange(e)
    }

    const changeFilmPanel = () =>{
        setPanel(true)
    }

    const PanelElObj = props.filmData.map(e =>{
        return <PanelElement changeFilm={changeFilm} data={e} />
    })

    const addFilm = () =>{
        props.ChangeTransitionAdd()
    }

    if(panel){
        return(
            <div>
                <div className={style.container}>
                    <div className={style.main_panel}>
                        {PanelElObj}
                        <div onClick={addFilm} className={style.add}>
                            <img src={plus} alt=""/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }else{
       return <ChangeFilm ChangeFilmState={props.ChangeFilmState} ChangeTransition={changeFilmPanel} filmData={props.filmData} data={change}  genres={props.genres} />
    }

}




export default Panel