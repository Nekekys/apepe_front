import React from 'react';
import {compose} from "redux";
import {connect} from "react-redux";
import People from "./PeopleSearch";
import {withRouter} from "react-router-dom";
import {clearPeopleState, setPeopleSearchAsync} from "../../redux/peopleReduser";
import {pressChangeFriend} from "../../redux/authReduser";







class PeopleSearchContainer extends React.Component{
   componentDidMount() {

   }


    render(){
        return (
            <People user={this.props.user}  setPeopleSearchAsync={this.props.setPeopleSearchAsync}
                    peopleData={this.props.peopleData} clearPeopleState={this.props.clearPeopleState}
                    pressChangeFriend={this.props.pressChangeFriend} searchString={this.props.match.params.searchString}
                    preloader={this.props.preloader}/>
        )
    }



}

let mapStateToProps = (state) => {
    return {
        user: state.isAuthM.user,
        peopleData: state.people.peopleData,
        preloader: state.people.preloader
    }
}

let WithRouterPeopleSearchContainer = withRouter(PeopleSearchContainer)

export default compose(
    connect(mapStateToProps , {
        setPeopleSearchAsync,clearPeopleState,pressChangeFriend
    })
)(WithRouterPeopleSearchContainer)

