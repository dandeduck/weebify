import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../spotify/spotify.service';
import { TimeRange } from '../spotify/timeRange';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})

export class ResultsComponent implements OnInit {
  weightedScore = 0;
  longScore = 0;
  mediumScore = 0;
  shortScore = 0;

  constructor(private spotify: SpotifyService) { }

  ngOnInit(): void {
    this.setToken()
    this.setProgressCircles();
  }

  private setToken(): void {
    const token = window.location.hash.split('&')[0].slice(1).split('=')[1];
    this.clearUrl();

    if (token)
      this.spotify.setToken(token);
    else
      window.location.replace('/login');
  }
  
  private clearUrl(): void {
    window.history.replaceState({}, document.title, "/");
  }

  private setProgressCircles(): void {
    this.spotify.requestTimeAdjustedScore().subscribe(score => this.weightedScore = score * 100);
    this.spotify.requestScoreForTopTracks(TimeRange.LONG).subscribe(score => this.longScore = score * 100);
    this.spotify.requestScoreForTopTracks(TimeRange.MEDIUM).subscribe(score => this.mediumScore = score * 100);
    this.spotify.requestScoreForTopTracks(TimeRange.SHORT).subscribe(score => this.shortScore = score * 100);
  }
}
