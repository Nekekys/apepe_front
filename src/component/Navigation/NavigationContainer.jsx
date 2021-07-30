import React from 'react';
import {compose} from "redux";
import {connect} from "react-redux";
import Navigation from "./Navigation";





class NavigationContainer extends React.Component{
   componentDidMount() {

   }

    render(){
        return (
            <Navigation   />
        )
    }



}

let mapStateToProps = (state) => {
    return {

    }
}


export default compose(
    connect(mapStateToProps , {

    })
)(NavigationContainer)

