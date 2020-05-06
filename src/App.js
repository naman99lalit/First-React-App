import React, {Component} from 'react';
import CardList from './CardList';
import {robots} from './robots';
import SearchBox from './SearchBox';
import './App.css';

// Now, In this App, we have to add a feature where a search box is there and based on it we have to display
// the robots. But, the problem is that how will the two components be able to talk to each other since they are seperate 
// from each other. Now , for this we use the term "State", which gives the description about the object and it helps in
// the functioning of various components.


//  For using State, we have to use the basic version of React, i.e. Using "Classes".
// Lets see the use of classes.I will comment out the code that we had written first
// const App = ()=>{
//      return (
//          <div className="tc">
//             <h1>Robo Friends</h1>
//             <SearchBox/>
//             <CardList robots = {robots}/>
//         </div>
//      );
// }


class App extends Component {
    constructor(){
        super()
        // We will create the state object now. The things inside the state can change.
        this.state = {
            robots: robots,
            searchfield: ''
        }
    }
    onSearchChange = (event) => {
        // Here we are assigning the searchfield with the values that we are getting from the function call
        this.setState({ searchfield: event.target.value })
        // console.log(filterRobots);
    }
    //  While using classes in react, we have to use render function to return the values
    render(){
        const filterRobots = this.state.robots.filter(robot =>{
            return robot.name.toLowerCase().includes(this.state.searchfield.toLowerCase());
        })
        return (
            <div className="tc">
               <h1 className="f1">Robo Friends</h1>
               <SearchBox searchChange={this.onSearchChange}/>
               <CardList robots = {filterRobots}/>
           </div>
        );
    }
}
export default App;