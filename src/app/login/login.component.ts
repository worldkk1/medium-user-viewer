import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private http: Http) { }

  ngOnInit() {
  }

  login(event, mode) {
    event.preventDefault();
    console.log(mode);
    if (mode == 'medium') {
      console.log('KK');
      // this.http.post('');
    }
  }
}
