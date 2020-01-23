import React, { Component } from 'react';
import './App.css';
import { FormGroup, FormControl, InputGroup, Glyphicon } from 'react-bootstrap';
import Artist from './components/Artist';
import Albums from './components/Albums';
import logo from './logo.png';

// declare empty props
class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            accessToken: undefined,
            query: '',
            artist: null,
            id:'',
            albums: [],
        }
    }

// generate new access tokens every 3600s to send unlimited requests to Spotify's API
    getToken() {
        const GATEWAY_URL = 'https://t2xklefjcd.execute-api.us-east-1.amazonaws.com/prod/access-token';
        fetch(GATEWAY_URL, {
            method: 'GET',
            mode: 'cors'
        })
            .then((response) => {
                return response.json();
            })
            .then((json) => {
                console.log('new token received')
                this.setState({ accessToken: json.done.json.access_token });
                this.search();
            })
    }

// get query and declare request parameters
    async search() {
        const BASE_URL = 'https://api.spotify.com/v1/search?';
        let FETCH_URL = `${BASE_URL}q=${this.state.query}&type=artist&limit=1`;

        const myOptions = {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + this.state.accessToken
            },
            mode: 'cors',
            cache: 'default'
        };

// send the request to fetch the data        
        await fetch(FETCH_URL, myOptions)
            .then((response) => {
                return response.json();
            })

// request a new token if an error is returned
            .then((json) => {
                if (json.hasOwnProperty('error')) {
                    this.getToken();

// get only the first match in results list and assign to an artist prop
                } else {
                    const artist = json.artists.items[0];
                    this.setState({ artist });

// asign the artist id from json to state
                    const id = json.artists.items[0].id;
                    this.setState ({ id });
                }
            });
  
// request this artist's albums with his id
                let fetchAlbumsURL = `https://api.spotify.com/v1/artists/${this.state.id}/albums`;
                
// send the request to fetch the data
                fetch(fetchAlbumsURL, myOptions)
                    .then((response) => {
                        return response.json();
                    })
                    .then((json) => {

// if error request new token
                        if (json.hasOwnProperty('error')) {
                            console.log('Invalid token');
                            this.getToken();
                                    } else { 
                                        
// get albums from the json and assign them to an albums prop 
                    const albums = json.items;
                    this.setState({ albums });
                                    }
                                })           
                        }
                    

// print a form with a text input, search on enter
    render() {
        return (
            <div className="App">
                <img src={logo} alt="Logo" />
                <div className="App-title">Spotify search
                </div>
                <FormGroup>
                    <InputGroup>
                        <FormControl 
                            type="text"
                            placeholder="Search for any artist"
                            value={this.state.query}
                            onChange={event => { this.setState({ query: event.target.value }) }}
                            onKeyPress={event => {
                                if (event.key === 'Enter') {
                                    this.search();
                                }
                            }}
                            inputRef={ref => { this.input = ref; }}
                        />
                        <InputGroup.Addon
                            onClick={() => this.search()}>
                            <Glyphicon glyph="search">
                            </Glyphicon>
                        </InputGroup.Addon>
                    </InputGroup>
                </FormGroup>

                {
// If artist prop isn't null, render the data inside it
                    this.state.artist !== null
                        ?
                            <div className="artist-output">
                                <Artist
// get artist profile and pass variable through prop
                                    artist={this.state.artist}
                                />
                                <div className="albums">
                                    <Albums
// get artist id to search his albums and pass variable through prop
                                    albums={this.state.albums}
                                    />
                                </div>
                            </div>
                            : <div></div>
                            }

                        </div>
            
        )
    }
}

export default App;