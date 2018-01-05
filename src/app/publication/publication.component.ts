import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';

import { contentHeaders } from '../common/headers';

@Component({
  selector: 'app-publication',
  templateUrl: './publication.component.html',
  styleUrls: ['./publication.component.css']
})
export class PublicationComponent implements OnInit {
  private pubs;
  private pubsCon;

  constructor(private http: Http) { }

  ngOnInit() {
    this.listPub();
  }

  listPub() {
    let authen_code = localStorage.getItem('authen_code');
    let user_id = localStorage.getItem('user_id');
    console.log('user_id: '+user_id);
    let body = JSON.stringify({authen_code, user_id});
    if (user_id) {
      this.http.post('http://localhost:3000/api/medium/pub', body, { headers: contentHeaders })
        .subscribe(
          response => {
            if (response.json()) {
              let resPubs = response.json().data;
              let dataPubs = [];

              this.pubs = response.json().data; // all pubs, comment off below for filter pubs
              // this.pubsCon = response.json().pubsCon;
              // if (this.pubsCon) {
              //   for (let i in this.pubsCon) {
              //     let pub = resPubs.find(x => x.id == this.pubsCon[i].id);
              //     Object.assign(pub, {role: this.pubsCon[i].role});
              //     console.log('pub: '+JSON.stringify(pub));
              //     dataPubs.push(pub);
              //   }
              // }
              // this.pubs = dataPubs;
            }
          }
        );
    }
  }

  openPub(event, url) {
    event.preventDefault();
    if (url) {
      window.location.href = url;
    }
  }
}
