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
        console.log('site: '+site);
        if (site == 'medium') {
          this.route.queryParams.subscribe((params: Params) => {
              let code = params['code'];
              console.log('code: '+code);
              this.router.navigate(['pub']);
          });
        }
    });
  }

}
