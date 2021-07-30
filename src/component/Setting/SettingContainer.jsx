import React from 'react';
import {compose} from "redux";
import {connect} from "react-redux";
import Setting from "./Setting";
import {
    changeCheckRepeatBackground,
    changeLoginAsync, changePasswordAsync,
    changeUserAvatar,
    changeUserBackground
} from "../../redux/authReduser";






class SettingContainer extends React.Component{
   componentDidMount() {

   }

    render(){
        return (
            <Setting changeCheckRepeatBackground={this.props.changeCheckRepeatBackground} changeUserAvatar={this.props.changeUserAvatar}
                     user={this.props.user} changeUserBackground={this.props.changeUserBackground}
                     changeLoginAsync={this.props.changeLoginAsync} changePasswordAsync={this.props.changePasswordAsync}/>
        )
    }



}

let mapStateToProps = (state) => {
    return {
        user: state.isAuthM.user
    }
}


export default compose(
    connect(mapStateToProps , {
        changeUserAvatar,changeCheckRepeatBackground,changeUserBackground,changeLoginAsync,changePasswordAsync
    })
)(SettingContainer)

