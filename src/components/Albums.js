import React, { Component } from 'react';
import Tracks from 'Tracks';

class Albums extends Component {

    render() {
        let albums = { id: '', name: '', release_date:'', external_uls: [{ spotify: '' }], images: [{ url: '' }]};


        albums = this.props.albums !== [] ? this.props.albums : albums;


        const listItems = albums.map((album) =>
                <li>
                    <div className="cover">
                        <h2>{album.name}</h2>
                        <img alt="Album" className="album-img" src={album.images[0].url}/>
                    </div>

                    <div className="info-container">
                        <div className="info">
                            <p>Release date: {album.release_date}</p>
                            <p>Total tracks: {album.total_tracks}</p>
                            <a rel="noopener noreferrer" target="_blank" href={album.external_urls.spotify}>View on Spotify</a>
                        </div>
                        <div className="tracks">    
                            <Tracks 
// Pass album id to Tracks component to fetch tracks
                                albumId = {album.id}
                            />
                        </div>
                    </div>
                </li>
        );
    return (
        <ul>
          {listItems}
        </ul>
    );

    }
}

export default Albums;
