import React from 'react';
import {compose} from "redux";
import {connect} from "react-redux";
import Header from "./Header";
import {changeOnlineUser, clearNotification, isLoginIn, pressChangeFriend} from "../../redux/authReduser";
import {withRouter} from "react-router-dom";
import {clearFriendState, setUSerAsyncPage} from "../../redux/friendReduser";





class HeaderContainer extends React.Component{
   componentDidMount() {

   }

    render(){
        return (
            <Header hostPageUserData={this.props.hostPageUserData} setUSerAsyncPage={this.props.setUSerAsyncPage}
                    userData={this.props.userData} params={this.props.location}
                    isLoginIn={this.props.isLoginIn}  pressChangeFriend={this.props.pressChangeFriend}
                    clearFriendState={this.props.clearFriendState} changeOnlineUser={this.props.changeOnlineUser}
                    clearNotification={this.props.clearNotification}/>
        )
    }



}

let mapStateToProps = (state) => {
    return {
        userData: state.isAuthM.user,
        hostPageUserData: state.friends.friendPage
    }
}

let WithRouterHeaderContainer = withRouter(HeaderContainer)

export default compose(
    connect(mapStateToProps , {
        isLoginIn,setUSerAsyncPage,pressChangeFriend,clearFriendState,changeOnlineUser,clearNotification
    })
)(WithRouterHeaderContainer)

