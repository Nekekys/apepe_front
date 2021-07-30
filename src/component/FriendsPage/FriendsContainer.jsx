import React from 'react';
import {compose} from "redux";
import {connect} from "react-redux";
import Friends from "./Friends";
import {withRouter} from "react-router-dom";
import {clearFriendState, setUSerAsync} from "../../redux/friendReduser";






class FriendsContainer extends React.Component{
   componentDidMount() {

   }

    render(){
        return (
            <Friends friends={this.props.friends} setUSerAsync={this.props.setUSerAsync} user={this.props.user}
                     clearFriendState={this.props.clearFriendState}/>
        )
    }



}

let mapStateToProps = (state) => {
    return {
        user: state.isAuthM.user,
        friends: state.friends.friendData
    }
}

let WithRouterFriendsContainer = withRouter(FriendsContainer)

export default compose(
    connect(mapStateToProps , {
        setUSerAsync,clearFriendState
    })
)(WithRouterFriendsContainer)

