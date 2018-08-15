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
      popularRepo: [],
      loading: true
    }
    console.log('------ hello from constructor -------')
  }

  componentDidMount(){
    console.log('------- component-did-mount ----------')
    window.API.fetchPopularRepos('all')
      .then((popularRepo)=>{
        this.setState({
          ...this.state,
          popularRepo,
          loading: false
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

  /*reposGroup(){
   this.state.popularRepo.map((item,index)=>{
      return <li key={index}>{item.name}</li>
      //console.log(item)
    })
    //console.log(this.state.popularRepo)
  }*/

  render() {
    //console.log(this.state.popularRepo)
    const {loading,rep} = this.state
    if(loading === true){
      return(

        <p className="loading-text">Loading</p>
      )
    }
    return (
      <div className="App">
            <ul>
            </ul>
            <ul className="repo-list">
              {
                this.state.popularRepo.map((repo,index)=>(
                  //console.log(item)
                  <li key={index}>
                    <div>repo name: {repo.name}</div>
                    <div> repo star: {repo.stargazers_count}</div>
                    <div>owner: {repo.owner.login}</div>
                  </li>
                ))
              }
            </ul>
      </div>
    );
  }
}

export default App;
