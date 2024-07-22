import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { Product } from '../Model/product'

@Injectable({
  providedIn: 'root',
})
export class DataserviceService {
  url: string = 'http://localhost:5123/api/User'
  constructor(private httpclnt: HttpClient) {}

  Getdata(): Observable<Product[]> {
    return this.httpclnt.get<Product[]>(this.url + '/getallproduct')
  }
  additem(itmform: any) {
    return this.httpclnt.post(this.url + '/addproduct', itmform)
  }
  deleteitem(id: number) {
    return this.httpclnt.delete(this.url + '/DeleteProduct/' + id)
  }
  getitembyid(id: number): Observable<Product> {
    return this.httpclnt.get<Product>(this.url + '/getproductbyid/' + id)
  }
  Edititembyid(id: number, item: any) {
    return this.httpclnt.put(this.url + '/EditProduct/' + id, item)
  }
}
