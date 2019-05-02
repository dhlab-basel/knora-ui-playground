import { Component, OnInit } from '@angular/core';
import { ApiResponseData, ApiResponseError, LoginResponse, UserResponse } from '@knora/api';
import { KnoraApiService } from 'src/knora-api.service';

@Component({
  selector: 'kuip-authentication-pg',
  templateUrl: './authentication-pg.component.html',
  styleUrls: ['./authentication-pg.component.scss']
})
export class AuthenticationPgComponent implements OnInit {

  constructor (public knoraApiService: KnoraApiService) {
    console.log(knoraApiService);
  }

  ngOnInit() {

  }

  login(username: string, password: string) {

    this.knoraApiService.knoraApiConnection.v2.auth.login(username, password).subscribe(
      (result: ApiResponseData<LoginResponse>) => {
        console.log(result.body);
        this.getUser();
      },
      (error: ApiResponseError) => {
        console.error(error);
        if (error.status === 401) {
          // alert('no');
        }
      }
    );

  }

  getUser() {

    this.knoraApiService.knoraApiConnection.admin.users.getUserByEmail('root@example.com').subscribe(
      (result: ApiResponseData<UserResponse>) => {
        console.log(result.body.user.givenName);
      },
      (error) => console.error(error)
    );

  }

  logout() {
    this.knoraApiService.knoraApiConnection.v2.auth.logout().subscribe();
  }

}
