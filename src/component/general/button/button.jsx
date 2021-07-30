import React from 'react';
import cssStyle from './button.module.css'

function ButtonSend(props) {
    let style = {
        fontSize: props.fontSize,
        padding: props.paddingSize
    }
    return <div onClick={props.click} className={cssStyle.btn} style={style}>
        {props.text}
    </div>
}


export default ButtonSend