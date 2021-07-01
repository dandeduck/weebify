import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../spotify/spotify.service';
import { TimeRange } from '../spotify/timeRange';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {
  constructor(private spotify: SpotifyService) { 
    
  }

  ngOnInit(): void {
    this.spotify.setToken('BQAYvDooKrA18aSfuwo5DPHXt7nNrGvmXmSfYkZGQ2E-vFcUqagHOtqsY5_hBjBy3tljHkD_FBaTwdJzMrS3ffrRyW8l1IjWtp7ekI13jjfEFE2_Hmm9alczAPJh4-Yhav6CaHRwr0Nss3_YHMCqXGbs3DM-MgD5ayoGPWVwhRk');
    
    this.spotify.requestTimeAdjustedScore().subscribe(score => console.log(score));
    this.spotify.requestScoreForTopTracks(TimeRange.LONG).subscribe(score => console.log(score));
    this.spotify.requestScoreForTopTracks(TimeRange.MEDIUM).subscribe(score => console.log(score));
    this.spotify.requestScoreForTopTracks(TimeRange.SHORT).subscribe(score => console.log(score));
  }

  authUrl() : string {
    return this.spotify.authUrl();
  }

}
