import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AddressService {

  constructor(private http: HttpClient) { }

  getListOfCities(): Observable<Object> {
    return this.http.get('https://dc.tintoc.net/app/api-customer/public/provinces?size=100');
  }

  getListOfDistrictsByCityId(cityId: string) {
    return this.http.get(`https://dc.tintoc.net/app/api-customer/public/districts?provinceId.equals=${cityId}`);
  }

  getListOfWardsByDistrictId(districtId: string) {
    return this.http.get(`https://dc.tintoc.net/app/api-customer/public/wards?districtId.equals=${districtId}`);
  }

}
