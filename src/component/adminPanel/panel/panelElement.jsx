import React, {useState} from 'react';
import style from './../adminPanel.module.css'





function PanelElement(props) {

    const dataEl = () => {
        let data = props.data.id
        props.changeFilm(data)
    }

    return(
        <div className={style.elem_panel}>
            <h4>{props.data.name}</h4>
            <span className={style.panel_button_del}>удалить</span>
            <span onClick={dataEl} className={style.panel_button_change}>изменить</span>
        </div>
    )
}




export default PanelElement