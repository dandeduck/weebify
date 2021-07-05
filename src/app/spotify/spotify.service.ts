import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { combineLatest, Observable, Subscriber, zip } from 'rxjs';
import { map, mergeMap, subscribeOn } from 'rxjs/operators';
import { Artist } from './artist';
import { Datapoint } from './datapoint';
import { TimeRange } from './timeRange';
import { Track } from './track';

@Injectable({
  providedIn: 'root'
})

export class SpotifyService {
  private clientId = '900e245255804dca9adc46985c8befcf';
  private redirectUri = 'http://localhost:4200/weebinator';
  private token = '';
  private WEABU_GENRES : string[] = ['anime', 'j-pop', 'j-rock', 'otacore', 'jpop', 'j-rock', 'anime rock', 'j-poprock', 'j pop', 'okinawan pop'];
  
  constructor(private http: HttpClient) {
  }

  public authUrl() : string {
    return 'https://accounts.spotify.com/authorize' +
      '?response_type=token' +
      '&client_id=' + this.clientId +
      '&scope=' + 'user-top-read' +
      '&redirect_uri=' + this.redirectUri +
      '&show_dialog=' + 'true';
  }

  public setToken(token : string) {
    this.token = token;
  }

  private isWeeb(datapoint : Datapoint) : boolean {
    if (datapoint.artist.genres.some(genre => this.WEABU_GENRES.includes(genre)))
      return true;
    if (this.containsJapanese(datapoint.track) || this.containsJapanese(datapoint.artist))
      return true;

    return false;
  }

  private containsJapanese(data: Track | Artist) {
    return data.name.match(/[\u3000-\u303f\u3040-\u309f\u30a0-\u30ff\uff00-\uff9f\u4e00-\u9faf\u3400-\u4dbf]/);
  }

  public requestTimeAdjustedScore() : Observable<number>{
    let longScore = this.requestScoreForTopTracks(TimeRange.LONG);
    let mediumScrore = this.requestScoreForTopTracks(TimeRange.MEDIUM);
    let shortScore = this.requestScoreForTopTracks(TimeRange.SHORT);

    return combineLatest([longScore, mediumScrore, shortScore])
      .pipe(
        map(scores => this.calcScoreFromSummables(scores))
      );
  }

  public requestScoreForTopTracks(range : TimeRange) : Observable<number> {
    let tracks = this.requestTopTracks(range);
    let artists = tracks.pipe(mergeMap(data => this.requestArtists(data)));

    let combined = zip(tracks,artists).pipe(map(tracktists => {
      let tracks = tracktists[0];
      let artists = tracktists[1];
      
      return tracks.map((track, i) => this.combineTracktists(track, artists[i]))
    }));

    return combined.pipe(
      mergeMap(datapoints => this.requestWeabooScore(datapoints))
    );
  }

  private combineTracktists(track : Track, artist : Artist) : Datapoint {
    return {
      artist: artist,
      track: track
    }
  }

  private requestWeabooScore(datapoints : Datapoint[]) : Observable<number> {
    let score = 0;

    datapoints.forEach((point, i) => score += this.isWeeb(point) ? 1/(i+1) : 0);

    return new Observable( subscriber => {
      subscriber.next(this.calcScore(score, datapoints.length));
      subscriber.complete();
    }
    )
  }

  private calcScoreFromSummables(items : number[]) {
    let sum = 0;

    items.forEach((item, i) => sum+=item/(i+1));

    return this.calcScore(sum, items.length);
  }

  private calcScore(summedScore : number, amountOfItems : number) {
    let devisor = 0;
    
    for (let i = 1; i <= amountOfItems; ++i)
      devisor += 1/i;

    return summedScore / devisor;
  }

  private requestTopTracks(range : TimeRange) : Observable<Track[]> {
    let url = `https://api.spotify.com/v1/me/top/tracks?time_range=${range}&limit=50`;

    return this.request(url).pipe(
      map((data : any) => data.items.map(this.convertItemToTrack))
    );
  }

  private convertItemToTrack(item : any) : Track {
    return {
      artistId: item.artists[0].id,
      artistName: item.artists[0].name,
      name: item.name
    };
  }

  private requestArtists(tracks : Track[]) : Observable<Artist[]> {
    let url = 'https://api.spotify.com/v1/artists?ids=';

    tracks.forEach(track => url+=track.artistId + ',');
    url = url.slice(0, -1);

    return this.request(url)
      .pipe(
        map((data : any) => data.artists.map(this.convertItemToArtist))
      );
  }
  
  private convertItemToArtist(item : any) : Artist {
    return {
      genres: item.genres,
      name: item.name
    };
  } 

  private request(url : string) : Observable<any> {
    let headers = new HttpHeaders().append('Authorization', `Bearer ${this.token}`);

    return this.http.get(url, {headers: headers});
  }
}
