import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../spotify/spotify.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})

export class LandingComponent implements OnInit {
  constructor(private spotify: SpotifyService) { 
  }
  
  ngOnInit(): void {  
  }

  authUrl() : string {
    return this.spotify.authUrl();
  }

}
