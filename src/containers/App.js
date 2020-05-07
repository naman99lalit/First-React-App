import React, {Component} from 'react';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import './App.css';
import Scroll from '../components/Scroll';
import ErrorBoundary from '../components/ErrorBoundary';

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

// The activities that are called here are in the order:
// 1. constructor
// 2. render
// 3. componentDidMount
// 4. render (because we are making changes in the componentDidMount and render changes everytime)

class App extends Component {
    constructor(){
        super()
        // We will create the state object now. The things inside the state can change.
        this.state = {
            robots: [],
            searchfield: ''
        }
    }

    componentDidMount() {
        // Here we are fetching data from the website
        fetch('https://jsonplaceholder.typicode.com/users').then(response =>{
            return response.json();
        }).then(users=>{
            this.setState({robots: users});
        })
    }

    onSearchChange = (event) => {
        // Here we are assigning the searchfield with the values that we are getting from the function call
        this.setState({ searchfield: event.target.value })
        // console.log(filterRobots);
    }
    //  While using classes in react, we have to use render function to return the values
    render(){
        const { robots, searchfield} = this.state;
        const filterRobots = this.state.robots.filter(robot =>{
            return robot.name.toLowerCase().includes(searchfield.toLowerCase());
        })
        if(!robots.length){
            return <h3>Loading..</h3>
        }else{
            return (
                <div className="tc">
                <h1 className="f1">Robo Friends</h1>
                <SearchBox searchChange={this.onSearchChange}/>
                <Scroll>
                    {/* Error Boundary is used to check for errors for a component */}
                    <ErrorBoundary>
                    <CardList robots = {filterRobots}/>
                    </ErrorBoundary>
                </Scroll>
            </div>
            );
        }
    }
}
export default App;