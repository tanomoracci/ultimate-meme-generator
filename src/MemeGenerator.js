import React, { Component } from 'react'

export default class MemeGenerator extends Component {
    constructor() {
        super();
        this.state = {
            topText: '',
            bottomText: '',
            randomImage: 'http://i.imgflip.com/1bij.jpg',
            allMemesImgs: [],
        };
    this.handleChange = this.handleChange.bind(this);  
    this.handleSubmit = this.handleSubmit.bind(this);  
    }

    componentDidMount() {
        fetch("https://api.imgflip.com/get_memes")
        .then(response => response.json())
        .then(response => {
        const { memes } = response.data;
        this.setState({ allMemesImgs: memes })
        })
      }

    handleChange (event) {
        const {name, value} = event.target;
        this.setState({[name]:value});
    }

    handleSubmit (event){
        event.preventDefault();
        const randNum = Math.floor(Math.random() * this.state.allMemesImgs.length);
        const randMemeImg = this.state.allMemesImgs[randNum].url;
        this.setState({randomImage: randMemeImg});
        console.log(randMemeImg);

    }

    render() {
        return (
            <div className='container'>

                    
                 <form className="meme-form" onSubmit={this.handleSubmit}>
                 <input
          type="text"
          name="topText"
          placeholder="Top Text"
          value={this.state.topText}
          onChange={this.handleChange}
        />
        <input
          type="text"
          name="bottomText"
          placeholder="Bottom Text"
          value={this.state.bottomText}
          onChange={this.handleChange}
        />
                     <button variant="contained" color="secondary">Generate a new MEME</button>
                  </form>

        <div className='meme'>
            <img src={this.state.randomImage} className='imagen' alt='the ultimate meme'></img>
            <h2 className='top'>{this.state.topText}</h2>
            <h2 className='bottom'>{this.state.bottomText}</h2>

        </div>  
            </div>
            
        )
    }
}
