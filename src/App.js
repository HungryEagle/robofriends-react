import React, {Component} from "react";
import CardList from "./CardList";
import SearchBox from "./SearchBox";
import './App.css';
import Scroll from "./Scroll";
import ErrorBoundary from "./ErrorBoundary";
//state -> description of your app
//Props never change.
//props are simply things come out of the state. The child when receives
//the state it gets the props out of it. 
/*
    The parent sends the state and the child receives the props i.e. robots
*/

class App extends Component{
    constructor(){
        super()
        //because this app has a state this is a smart component
        this.state = {
            robots: [],
            searchfield: ''
        }    
    }

    componentDidMount(){
        fetch('https://jsonplaceholder.typicode.com/users')
        .then(res=>res.json())
        .then(users=>this.setState({robots: users}))
    }

    onSearchChange = (event) => {
        this.setState({searchfield: event.target.value})       
    }

    render(){
        const filteredRobots = this.state.robots.filter(robot =>{
            return robot.name.toLowerCase().includes(this.state.searchfield.toLowerCase())
        }) 
        if(this.state.robots.length===0){
            return <h1>Loading</h1>
        }else{
            return(
                <div className="tc">
                    <h1 className="f2">Robo Friends</h1>
                    <SearchBox searchChange={this.onSearchChange}/>
                    <Scroll>
                        <ErrorBoundary>
                            <CardList robots={filteredRobots}/>
                        </ErrorBoundary>
                    </Scroll>   
                </div> 
            );
        }   
        
    }

}

export default App;