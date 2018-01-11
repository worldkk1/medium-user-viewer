import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs/Rx';

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
  isMenuOpened: boolean = false;
  subscription: Subscription;
  isLogout: boolean = true;

  constructor(private http: Http, private router: Router) { }

  ngOnInit() {
    document.getElementsByTagName('body')[0].style.backgroundColor = '#f4f4f4';
    this.getUser();
  }

  getUser() {
    let authen_code = localStorage.getItem('authen_code');
    if (authen_code) {
      let body = JSON.stringify({ authen_code });
      this.http.post('http://localhost:3000/api/medium/user', body, { headers: contentHeaders })
        .subscribe(
          response => {
            // console.log('res: '+JSON.stringify(response.json()));
            if (response.json()) {
              localStorage.setItem('user_id', response.json().id);
              this.name = response.json().name;
              this.userImg = response.json().imageUrl;
              this.username = response.json().username;
              this.isDataLoaded = true;
            }
          },
          error => {
            // console.log('err: '+JSON.stringify(error.json()));
            if (error.json()) {
              if (error.json().code === 6000) {
                window.location.href = error.json().url;
              } else {
                this.router.navigate(['/login']);
              }
            } else {
              this.router.navigate(['/login']);
            }
          }
        );
    }
  }

  openMenu() {
    this.isMenuOpened = !this.isMenuOpened;
    // console.log('this.isMenuOpenesd: '+this.isMenuOpened);
  }

  logout() {
    this.isLogout = false;
    localStorage.clear();
    let isTimeDone = false;
    let timer = Observable.timer(2000,1000);
    this.subscription = timer.subscribe(t => {
        if (!isTimeDone) {
          isTimeDone = true;
          this.isLogout = true;
          this.subscription.unsubscribe();
          this.router.navigate(['/login']);
        }
    });
  }
}
