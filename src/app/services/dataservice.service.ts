import {HttpClient} from '@angular/common/http'
import {Injectable} from '@angular/core'
import {Observable} from 'rxjs'
import {Posts} from '../Model/posts'

@Injectable({
  providedIn: 'root',
})
export class DataserviceService {
  url: string = 'https://jsonplaceholder.typicode.com'
  constructor(private httpclnt: HttpClient) {}

  Getdata(): Observable<Posts[]> {
    return this.httpclnt.get<Posts[]>(this.url + '/posts')
  }
  additem(itmform: Posts) {
    return this.httpclnt.post(this.url + '/posts', itmform)
  }
  deleteitem(id: number) {
    return this.httpclnt.delete(this.url + '/posts/' + id)
  }
  getitembyid(id: number): Observable<Posts> {
    return this.httpclnt.get<Posts>(this.url + '/posts/' + id)
  }
  Edititembyid(id: number, item: Posts) {
    return this.httpclnt.put(this.url + '/posts/' + id, item)
  }
}
