import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { SpotifyService } from '../spotify/spotify.service';
import { TimeRange } from '../spotify/timeRange';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})

export class ResultsComponent implements OnInit {
  weightedScore: Observable<number> = of(0);
  longScore: Observable<number> = of(0);
  mediumScore: Observable<number> = of(0);
  shortScore: Observable<number> = of(0);

  constructor(private spotify: SpotifyService) { }

  ngOnInit(): void {
    this.setToken()
    this.setProgressCircles();
  }

  private setToken(): void {
    const token = window.location.hash.split('&')[0].slice(1).split('=')[1];
    // this.clearUrl();

    if (token)
      this.spotify.setToken(token);
    else
      window.location.replace('/');
  }
  
  private clearUrl(): void {
    window.history.replaceState({}, document.title, "/weebinator");
  }

  private setProgressCircles(): void {
    this.weightedScore = this.spotify.requestTimeAdjustedScore().pipe(map(score => score*100));
    this.longScore =  this.spotify.requestScoreForTopTracks(TimeRange.LONG).pipe(map(score => score*100));
    this.mediumScore =  this.spotify.requestScoreForTopTracks(TimeRange.MEDIUM).pipe(map(score => score*100));
    this.shortScore = this.spotify.requestScoreForTopTracks(TimeRange.SHORT).pipe(map(score => score*100));
  }
}
