import React from 'react';
import {compose} from "redux";
import {connect} from "react-redux";
import People from "./People";
import {withRouter} from "react-router-dom";
import {clearPeopleState, setPeopleAsync} from "../../redux/peopleReduser";
import {pressChangeFriend} from "../../redux/authReduser";







class PeopleContainer extends React.Component{
   componentDidMount() {

   }


    render(){
        return (
            <People user={this.props.user}  setPeopleAsync={this.props.setPeopleAsync}
                    peopleData={this.props.peopleData} clearPeopleState={this.props.clearPeopleState}
                    pressChangeFriend={this.props.pressChangeFriend} preloader={this.props.preloader}
                    checkOnAllPeople={this.props.checkOnAllPeople}/>
        )
    }



}

let mapStateToProps = (state) => {
    return {
        user: state.isAuthM.user,
        peopleData: state.people.peopleData,
        preloader: state.people.preloader,
        checkOnAllPeople: state.people.checkOnAllPeople
    }
}

let WithRouterFriendsContainer = withRouter(PeopleContainer)

export default compose(
    connect(mapStateToProps , {
        setPeopleAsync,clearPeopleState,pressChangeFriend
    })
)(WithRouterFriendsContainer)

