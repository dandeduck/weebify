import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { SpotifyService } from '../spotify/spotify.service';
import { TimeRange } from '../spotify/timeRange';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnInit {
  hasErrored = false;
  weightedScore: Observable<number> = new Observable(s => s.next(0));
  longScore: Observable<number> = new Observable(s => s.next(0));
  mediumScore: Observable<number> = new Observable(s => s.next(0));
  shortScore: Observable<number> = new Observable(s => s.next(0));

  constructor(private spotify: SpotifyService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    const token = window.location.hash.split('&')[0].slice(1).split('=')[1];

    if (token)
      this.spotify.setToken(token);
    else
      this.hasErrored = true;

    this.setProgressCircles();
  }

  private setProgressCircles() {
    this.weightedScore = this.spotify.requestTimeAdjustedScore();
    this.longScore = this.spotify.requestScoreForTopTracks(TimeRange.LONG);
    this.mediumScore =  this.spotify.requestScoreForTopTracks(TimeRange.MEDIUM);
    this.shortScore = this.spotify.requestScoreForTopTracks(TimeRange.SHORT);
  }
}
