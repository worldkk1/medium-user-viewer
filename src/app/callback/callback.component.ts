import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-callback',
  templateUrl: './callback.component.html',
  styleUrls: ['./callback.component.css']
})
export class CallbackComponent implements OnInit {

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe((queryParams: Params) => {
        let site = queryParams['site'];
        // console.log('site: '+site);
        if (site == 'medium') {
          this.route.queryParams.subscribe((params: Params) => {
            if (params['error']) {
              this.router.navigate(['login']);
            } else {
              let authen_code = params['code'];
              localStorage.setItem('authen_code', authen_code);
              this.router.navigate(['home']);
            }
          });
        }
    });
  }

}
