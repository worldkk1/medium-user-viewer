import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';

import { contentHeaders } from '../common/headers';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  isDataLoaded: boolean = false;
  name: string;
  userImg: string;
  username: string;

  constructor(private http: Http) { }

  ngOnInit() {
    this.getUser();
  }

  getUser() {
    let authen_code = localStorage.getItem('authen_code');
    if (authen_code) {
      let body = JSON.stringify({ authen_code });
      this.http.post('http://localhost:3000/api/medium/user', body, { headers: contentHeaders })
        .subscribe(
          response => {
            console.log('res: '+JSON.stringify(response.json()));
            if (response.json()) {
              localStorage.setItem('user_id', response.json().id);
              this.name = response.json().name;
              this.userImg = response.json().imageUrl;
              this.username = response.json().username;
              console.log('response.json().imageUrl: '+response.json().imageUrl);
              // this.userImg = 'http://enadcity.org/enadcity/wp-content/uploads/2017/02/profile-pictures.png';
              this.isDataLoaded = true;
            }
          }
        );
    }
  }
}
