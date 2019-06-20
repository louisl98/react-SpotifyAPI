import React, { Component } from 'react';
import {Howl} from 'howler';
class Tracks extends Component {

    constructor(props) {
        super(props);
        this.state = {
            accessToken: undefined,
            tracks: [],
        }
    }

        async componentDidMount(){

        // get new token to access it through local state

        const GATEWAY_URL = 'https://t2xklefjcd.execute-api.us-east-1.amazonaws.com/prod/access-token';
        
        await fetch(GATEWAY_URL, {
            method: 'GET',
            mode: 'cors'
        })

        .then((response) => {
            return response.json();
        })

        .then((json) => {
            console.log('new token received')
            this.setState({ accessToken: json.done.json.access_token });
        })    

        // fetch data

        let FETCH_URL = `https://api.spotify.com/v1/albums/${this.props.albumId}/tracks`;
     
        fetch(FETCH_URL, {method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + this.state.accessToken
        },
        mode: 'cors',
        cache: 'default'})

            .then((response) => {
                return response.json();
            })

            .then((json) => {
                    this.setState({ tracks: json.items });
            });
        }

        // for each existing track in array show name & duration
        // convert ms duration to minutes and seconds
        render(){

        const tracks = this.state.tracks.map(track => (
            
            <li>
                <h4><span>▶</span> {track.name} </h4> 

                <p>({Math.floor(track.duration_ms / 60000) + ":" + (((track.duration_ms % 60000) / 1000).toFixed(0) < 10 ? '0' : '') + ((track.duration_ms % 60000) / 1000).toFixed(0)})</p>
            </li>
                ));  
              
                const sound = new Howl({
                    src: ["test.mp3"],
                    preload: true,
                    autoplay: true
                });
        
                sound.play();
            
        return(         

            <ul>
                {tracks}
            </ul>
        )
    }
}

export default Tracks;