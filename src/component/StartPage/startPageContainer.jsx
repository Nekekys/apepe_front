import React from 'react';
import {compose} from "redux";
import {connect} from "react-redux";
import StartPage from "./startPage";
import {changeOnlineUser, isLoginIn, setUSerData} from "../../redux/authReduser";
import {axiosQweryCookies} from "../../API/api";






class StartPageContainer extends React.Component{
    /*constructor(props) {
        super(props);
        this.state = {login: '' };
    }

   async componentDidMount() {
       let data = await axiosQweryCookies()
       if(data.check){
           this.props.isLoginIn(true)
       }else{
           if(data.login){
               this.setState({login: data.login })
           }
       }
   }*/

    render(){
        return (
            <StartPage setUSerData={this.props.setUSerData} loginWithCookie={this.props.loginWithCookie}
                       isLoginIn={this.props.isLoginIn}  changeOnlineUser={this.props.changeOnlineUser}/>
        )
    }



}

let mapStateToProps = (state) => {
    return {

    }
}


export default compose(
    connect(mapStateToProps , {
        isLoginIn,setUSerData,changeOnlineUser
    })
)(StartPageContainer)

