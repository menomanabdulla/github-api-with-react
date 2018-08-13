import React, { Component } from 'react';
import './App.css';


window.API = {
  fetchPopularRepos(language) {
    // "language" can be "javascript", "ruby", "python", or "all"
    const encodedURI = encodeURI(`https://api.github.com/search/repositories?q=stars:>1+language:${language}&sort=stars&order=desc&type=Repositories`)
    return fetch(encodedURI)
      .then((data) => data.json())
      .then((repos) => repos.items)
      .catch((error) => {
        console.warn(error)
        return null
      });
  }
}

class App extends Component {
  constructor(props){
    super(props)
    this.state= {
      popularRepo: []
    }
    console.log('------ hello from constructor -------')
  }

  componentDidMount(){
    console.log('------- component-did-mount ----------')
    window.API.fetchPopularRepos('all')
      .then((popularRepo)=>{
        console.log(popularRepo)
        this.setState({
          ...this.state,
          popularRepo
        })
      })
  }
  componentDidUpdate(){
    console.log('------- component-will-unmount ----------')
  }
  componentWillUnmount(){
    console.log('------- component did update ----------')
  }
  shouldComponentUpdate(){
   // console.log('------- Should-Component-Update ----------')
   return true
  }

  render() {
    console.log(this.state.popularRepo)
    return (
      <div className="App">
          <ul>
              {
                this.state.popularRepo.map((item,index)=>{

                  <li key={index}>{item}</li>
                })
              }
            </ul>
      </div>
    );
  }
}

export default App;
