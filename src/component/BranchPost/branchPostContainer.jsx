import React, {useEffect, useState} from 'react';
import {compose} from "redux";
import {connect} from "react-redux";
import BranchPost from "./branchPost";
import {withRouter} from "react-router-dom";
import {setAllBranchPost, setAllPostAsync, setAnswerPostDispatch, setIncCountAnswerPost} from "../../redux/postReduser";
import {axiosGetDataUser} from "../../API/api";
import {setUSerAsyncPage} from "../../redux/friendReduser";


function BranchPostContainer(props) {
//props.match.params.userId
    const [index,setIndex] = useState(0)

    useEffect( ()=>{
        if(props.match.params.userId == props.userData._id) {
            props.setAllPostAsync(props.userData._id)
            props.setAllBranchPost(props.userData._id,props.match.params.postId)
        }else {
            props.setAllPostAsync(props.match.params.userId)
            props.setAllBranchPost(props.match.params.userId,props.match.params.postId)
        }
    },[props.userData._id])

   /* useEffect( ()=>{

    },[props.branchPostData])*/

    useEffect( ()=>{

        for(let i = 0; i < props.postData.length; i++){
            if(props.match.params.postId == props.postData[i].id ){
                setIndex(i)
            }
        }
    },[props.postData])


    return (
        <BranchPost postId={props.match.params.postId} post={props.postData[index]}
                    setAnswerPostDispatch={props.setAnswerPostDispatch}
                    userData={props.userData} userId={props.match.params.userId}
                    hostData={props.hostData} branchPostData={props.branchPostData}
                    setIncCountAnswerPost={props.setIncCountAnswerPost}
                    />
    )


}

let mapStateToProps = (state) => {
    return {
        postData: state.post.mainPagePost,
        userData: state.isAuthM.user,
        hostData: state.friends.friendPage,
        branchPostData: state.post.branchPost
    }
}


let WithRouterBranchPostContainer = withRouter(BranchPostContainer)

export default compose(
    connect(mapStateToProps , {
        setAnswerPostDispatch,setAllPostAsync,setAllBranchPost,setIncCountAnswerPost
    })
)(WithRouterBranchPostContainer)

