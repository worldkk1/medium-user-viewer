import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';

import { contentHeaders } from '../common/headers';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  bgColor: String = '#eee';
  constructor(private http: Http, private router: Router) { }

  ngOnInit() {
    // let body = document.getElementsByTagName('body')[0];
    // body.classList.add('bg1-animate');
    // document.getElementsByTagName('body')[0].style.backgroundColor = '#fff';
  }

  login(event, mode) {
    event.preventDefault();
    // console.log(mode);
    if (mode == 'medium') {
      // console.log('KK');
      this.http.post('http://localhost:3000/api/medium/init', '')
        .subscribe(
          response => {
            // console.log('res:'+JSON.stringify(response.json()));
            // console.log(response.json());
            window.location.href = response.json().url;
          },
          error => {
            // console.log('err: '+error.text());
          }
        );
    }
  }
}
