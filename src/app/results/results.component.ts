import { Component, OnInit } from '@angular/core';
import { Scores } from '../spotify/scores';
import { SpotifyService } from '../spotify/spotify.service';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})

export class ResultsComponent implements OnInit {
  scores : Scores = {
    long: 0,
    medium: 0,
    short: 0,
    weighted: 0
  };

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
    this.spotify.requestScores().subscribe(scores => this.scores = scores);
  }

}
