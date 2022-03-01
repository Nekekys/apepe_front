import React from 'react';
import './App.css';
import {BrowserRouter, HashRouter, Route} from "react-router-dom";
import {connect} from "react-redux";
import {compose} from "redux";

import Navigation from "./component/Navigation/Navigation";
import WithRouterMainAppContainer from "./component/MainApp/MainAppContainer";

import WithRouterBranchPostContainer from "./component/BranchPost/branchPostContainer";
import WithRouterFriendsContainer from "./component/FriendsPage/FriendsContainer";
import StartPageContainer from "./component/StartPage/startPageContainer";
import {axiosQweryCookies} from "./API/api";
import {changeOnlineUser, checkOnlineUser, isLoginIn, setUSerData} from "./redux/authReduser";
import WithRouterHeaderContainer from "./component/Header/HeaderContainer";
import PeopleContainer from "./component/PeoplePage/PeopleContainer";
import WithRouterPeopleSearchContainer from "./component/PeopleSearch/PeopleSearchContainer";
import SettingContainer from "./component/Setting/SettingContainer";
import PepeContainer from "./component/Pepe/PepeContainer";






class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {login: '',user_id: 0};
    }

    async componentDidMount() {
        let token = localStorage.getItem("token")
        let data = await axiosQweryCookies(token)
        if(data.check){
            this.props.isLoginIn(true)
            this.props.setUSerData(data.user)
            this.props.changeOnlineUser(data.user._id,true)
            this.setState({user_id: data.user._id})
        }else{
            this.props.isLoginIn(false)
            if(data.login){
                this.setState({login: data.login })
            }
        }
        this.timerID = setInterval(
            () => this.tick(),
            60000
        );
    }

    componentWillUnmount() {
       /*
        window.onbeforeunload = function(event) {
            event.preventDefault();
            this.props.changeOnlineUser(this.state.user_id,false)
            return false
        }*/
    }

    tick() {
        if((this.props.user)&&(this.props.isAuth)){
            this.props.checkOnlineUser(this.props.user._id)

        }
    }

    render() {

    return (
        <HashRouter basename={process.env.PUBLIC_URL}>
          <div className="App">
              {this.props.isAuth ?
                  <div className="app_main">
                    <WithRouterHeaderContainer />
                    <div className="container">
                        <div className="app_container">
                            <Navigation />
                            <div className="main">
                                <Route exact path="/" render={() => <WithRouterMainAppContainer/>} />
                                <Route exact path="/user/:id?" render={() => <WithRouterMainAppContainer/>} />
                                <Route exact path="/branchPost/:userId/:postId?" render={() => <WithRouterBranchPostContainer/>} />
                                <Route exact path="/friends" render={() => <WithRouterFriendsContainer/>} />
                                <Route exact path="/people" render={() => <PeopleContainer/>} />
                                <Route  path="/people/search/:searchString" render={() => <WithRouterPeopleSearchContainer/>} />
                                <Route exact path="/setting" render={() => <SettingContainer/>} />
                                <Route exact path="/pepe" render={() => <PepeContainer/>} />
                            </div>
                        </div>
                    </div>
                  </div>
                  :
                  <StartPageContainer loginWithCookie={this.state.login} />
              }

          </div>
        </HashRouter>
    );
  }
}



let mapStateToProps = (state) => {
  return {
      isAuth: state.isAuthM.isAuth,
      user: state.isAuthM.user
  }
};
export default compose(connect(mapStateToProps , {isLoginIn,setUSerData,changeOnlineUser,checkOnlineUser}))(App)