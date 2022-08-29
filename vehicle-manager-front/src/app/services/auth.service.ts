import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs';

import gql from 'graphql-tag';

const TOKEN = 'VEHICLE_MANAGER_ACCESS_TOKEN';

const LOGIN = gql`
  mutation tokenAuth($username: String!, $password: String!) {
    tokenAuth(username:$username, password:$password) {
      token
    }
  }
`;

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private apollo: Apollo) { }

  public login(username: string, password: string): Observable<any> {
    return this.apollo.mutate({
      mutation: LOGIN,
      variables: {
        username: username.toLowerCase(),
        password
      }
    });
  }

  public saveToken(token: string): void {
    localStorage.setItem(TOKEN, token);
  }

  public getToken(): any {
    return localStorage.getItem(TOKEN);
  }

  public isAuthenticated(): boolean {
    const token = this.getToken();
    if (token == null || !token) {
      return false;
    }

    const helper = new JwtHelperService();
    return !helper.isTokenExpired(this.getToken());
  }

  public logOut(): void {
    localStorage.removeItem(TOKEN);
  }

}
