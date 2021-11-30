import React, {useEffect, useState} from 'react';
import {compose} from "redux";
import {connect} from "react-redux";
import MainApp from "./MainApp";
import {
    pressLike,
    setAllPost,
    setAllPostAsync,
    setComment,
    setPost,
    setLike,
    clearMainPost
} from "../../redux/postReduser";
import {withRouter} from "react-router-dom";



function MainAppContainer(props) {

    //console.log(props.match.params)

    return (
            <MainApp setPost={props.setPost} postData={props.postDataMain}
                     setComment={props.setComment} pressLike={props.pressLike}
                     userId={props.id} setLike={props.setLike}
                     setAllPost={props.setAllPost} setAllPostAsync={props.setAllPostAsync}
                     hostId={props.match.params.id} userData={props.userData}
                     alienPageData={props.alienPageData} preloader={props.preloader}
                     clearMainPost={props.clearMainPost}
                     />)

}



/*class MainAppContainer extends React.Component{

    render(){
        return (
            <MainApp setPost={this.props.setPost} postData={this.props.postDataMain}
                     setComment={this.props.setComment} pressLike={this.props.pressLike}
                     userId={this.props.auth} minusLike={this.props.minusLike}
                     setAllPost={this.props.setAllPost} setAllPostAsync={this.props.setAllPostAsync}
                     userId2={this.props.id}/>
        )
    }
}*/

let mapStateToProps = (state) => {
    return {
        postDataMain: state.post.mainPagePost,
        id: state.isAuthM.user._id,
        userData: state.isAuthM.user,
        alienPageData: state.friends.friendPage,
        preloader: state.post.preloader
    }
}


let WithRouterMainAppContainer = withRouter(MainAppContainer)

export default compose(
    connect(mapStateToProps , {
        setPost,setComment,pressLike,setAllPost,setAllPostAsync,setLike,clearMainPost
    })
)(WithRouterMainAppContainer)

