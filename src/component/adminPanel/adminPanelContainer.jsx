import React from 'react';
import {compose} from "redux";
import {connect} from "react-redux";
import AdminPanel from "./adminPanel";
import {addNewFilm, ChangeFilmState} from "../../redux/postReduser";







class AdminPanelContainer extends React.Component{
   componentDidMount() {

   }

    render(){
        return (
            <AdminPanel count={this.props.count} ChangeFilmState={this.props.ChangeFilmState} filmData={this.props.filmData} genres={this.props.genres} addNewFilm={this.props.addNewFilm} />
        )
    }



}

let mapStateToProps = (state) => {
    return {
        filmData: state.Film.filmData,
        genres: state.Film.genres,
        count: state.Film.count
    }
}



export default compose(
    connect(mapStateToProps , {
        addNewFilm,ChangeFilmState
    })
)(AdminPanelContainer)

