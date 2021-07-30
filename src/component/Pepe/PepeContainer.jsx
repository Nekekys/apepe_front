import React from 'react';
import {compose} from "redux";
import {connect} from "react-redux";
import Pepe from "./Pepe";
import {pepeNeuralWord} from "../../API/api";







class PepeContainer extends React.Component{
   componentDidMount() {

   }

    render(){
        return (
            <Pepe pepeNeuralWord={this.props.pepeNeuralWord} />
        )
    }



}

let mapStateToProps = (state) => {
    return {
        userData: state.isAuthM.user
    }
}



export default compose(
    connect(mapStateToProps , {
        pepeNeuralWord
    })
)(PepeContainer)

