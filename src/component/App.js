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


class Loading extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      text : 'Loading'
    }
  }
  componentDidMount(){
    const stopper = this.state.text+'...'
   this.interval =  window.setInterval(()=>{
      this.state.text === stopper ?
      this.setState({text: 'Loading'}):
      this.setState((currentState)=>{
        return({
          text: currentState.text+'.'
        })
      })
    }
     ,300
    )
  }
  componentWillUnmount(){
    window.clearInterval(this.interval)
  }
  render(){
    return(
      <div className="loading-text">
        <p>{this.state.text}</p>
      </div>
    )
  }
}


class App extends Component {
  constructor(props){
    super(props)
    this.state= {
      popularRepo: [],
      loading: true
    }
    this.clickHandeler = this.clickHandeler.bind(this)
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

  clickHandeler(e){

    this.setState({
      ...this.state,
      loading: true
    })

    let data = e.currentTarget.dataset.name || 'all'
    window.API.fetchPopularRepos(data)
    .then((popularRepo)=>{
      this.setState({
        ...this.state,
        popularRepo,
        loading: false
      })
    })
  }

  render() {
    //console.log(this.state.popularRepo)
    const {loading,rep} = this.state
    if(loading){
      return(
        <Loading/>
      )
    }
    return (
      <div className="App">
            <ul className="repo-catagory-list">
                <li data-name='all' onClick={this.clickHandeler}>all</li>
                <li data-name="javascript" onClick={this.clickHandeler}>javascript</li>
                <li data-name="ruby" onClick={this.clickHandeler}>ruby</li>
                <li data-name="python" onClick={this.clickHandeler} >python</li>
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