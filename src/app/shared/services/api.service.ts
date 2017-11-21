import {
  Injectable
} from '@angular/core';
import {
  Observable
} from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import {
  Http, Headers
} from '@angular/http';

const API_PATH = 'http://localhost:4200/mate/';

@Injectable()
export class ApiService {

  constructor(private http: Http) {}

  get(path: string, params: URLSearchParams = new URLSearchParams()): Observable < any > {
    return this.http.get(`${API_PATH}${path}`, { headers: this.setHeaders()} )
      .catch(this.formatErrors.bind(this))
      .map((res: Response) => this.parseResponse(res));
  }

  post(path: string, body: Object, params: URLSearchParams = new URLSearchParams()): Observable < any > {
    return this.http.post(
        `${API_PATH}${path}`,
        body,
        { headers: this.setHeaders()}
      )
      .catch(this.formatErrors.bind(this))
      .map((res: Response) => this.parseResponse(res));
  }

  put(path: string, body: Object, params: URLSearchParams = new URLSearchParams()): Observable < any > {
    return this.http.put(
        `${API_PATH}${path}`,
        body,
        { headers: this.setHeaders()}
      )
      .catch(this.formatErrors.bind(this))
      .map((res: Response) => this.parseResponse(res));
  }

  delete(path: string, params: URLSearchParams = new URLSearchParams()): Observable < any > {
    return this.http.delete(
        `${API_PATH}${path}`,
        { headers: this.setHeaders()}
      )
      .catch(this.formatErrors.bind(this))
      .map((res: Response) => this.parseResponse(res));
  }

  private setHeaders(): Headers {
    return new Headers(); // {token: this.credentialService.getToken()});
  }

  private formatErrors(error: any) {
    return Observable.throw(this.parseResponse(error));
  }

  private parseResponse(response: Response) {
    if (response.headers.get('content-type').includes('application/json')) {
      return response.json();
    } else {
      return {
        status: response.status,
        text: response.statusText
      };
    }
  }

}
