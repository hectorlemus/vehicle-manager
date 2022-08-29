import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs';

import gql from 'graphql-tag';

const VEHICLES = gql`
  query userVehicles {
    userVehicles {
      id
      plates
      lat
      lng
    }
  }
`;

@Injectable({
  providedIn: 'root'
})
export class VehicleService {

  constructor(private apollo: Apollo) { }

  public getVehicles(): Observable<any> {
    return this.apollo.query({
      query: VEHICLES,
      fetchPolicy: 'no-cache',
    });
  }

}
