import React, { Component } from 'react';

class Artist extends Component {
    render() {
// declare an empty array of artist objects
        let artist = { id: '', name: '', followers: { total: '' }, images: [{ url: '' }], genres: [] };

// if the 'artist' prop  isn't empty, assign the data from state to artist array
        artist = this.props.artist !== null ? this.props.artist : artist;

        return (
// Display artist image and info
            <div className="artist">
                <img
                    alt="Artist"
                    className="artist-img"
                    src={artist.images[0].url}
                />
                <div className="artist-info">
                    <div className="artist-name">{artist.name}
                    </div>
                    <div className="artist-followers">
                       Followers: {artist.followers.total}
                    </div>
                    <div className="artist-genres">
                        <p>Genres:</p>
                        {
                            artist.genres.map((genre, k) => {
// Display genres by mapping on each object of the array  + remove coma for the last genre item
                                genre = genre !== artist.genres[artist.genres.length - 1]
                                              ? ` ${genre},` 
                                              : ` ${genre}`
                                return (
                                    <span key={k}> {genre}</span>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        )
    }

}

export default Artist;