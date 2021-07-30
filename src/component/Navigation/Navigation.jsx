import React from 'react';
import style from './Navigation.module.css'
import {NavLink} from "react-router-dom";
import home from '../../file/images/home.svg'
import friends from '../../file/images/friends.svg'
import people from '../../file/images/group.svg'
import setting from '../../file/images/settings.svg'
import frog from '../../file/images/frog-head.svg'

function Navigation(props) {

    return(
        <div className={style.navigation_container}>
            <div className={style.navigation}>
                <div className={style.logo}>
                    apepe
                </div>
                <NavLink className={style.link} to={'/'}> <img src={home} alt="home"/><span>Домой</span>  </NavLink>
                <NavLink className={style.link} to={'/friends'}> <img src={friends} alt="friends"/><span>Друзья</span></NavLink>
                <NavLink className={style.link} to={'/people'}> <img src={people} alt="people"/><span>Люди</span></NavLink>
                <NavLink className={style.link} to={'/setting'}> <img src={setting} alt="setting"/><span>Настройки</span></NavLink>
                <NavLink className={style.link} to={'/pepe'}> <img src={frog} alt="pepe"/> <span>Пепе</span></NavLink>
            </div>
        </div>

    )


}




export default Navigation