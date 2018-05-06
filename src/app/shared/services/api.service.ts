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
import { MatSnackBar } from '@angular/material';

const API_PATH = 'http://localhost:4200/api/';

@Injectable()
export class ApiService {
  
  constructor(private http: Http, private snackBar: MatSnackBar) {}
  
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
    return new Headers({Authorization: "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjFlNmJlMDM4NWRiOGIxZTc0NzYwODdhZTc2MDk1OWRlNTU4YjFkNjExMGI0Yjk3MGU3OTJmZjE4ZjljMjQzODA5YjJkZGY5MjM3YmMwMjkzIn0.eyJhdWQiOiIxIiwianRpIjoiMWU2YmUwMzg1ZGI4YjFlNzQ3NjA4N2FlNzYwOTU5ZGU1NThiMWQ2MTEwYjRiOTcwZTc5MmZmMThmOWMyNDM4MDliMmRkZjkyMzdiYzAyOTMiLCJpYXQiOjE1MjU2MjMxNzIsIm5iZiI6MTUyNTYyMzE3MiwiZXhwIjoxNTU3MTU5MTcyLCJzdWIiOiIzIiwic2NvcGVzIjpbXX0.CzOgMK4cr2gRZ7NvLFfKhQ-ro9S3KrhXf4RxIATezKLbWDMEwf0y1iWv1BukEa-E06NER3O-mOetU4e9ybRnNWZ6hPd69iTfFUMBPWCiy2lR3AY-sba-MQrawC0vYgzUkEf_mY4yf8hTuzpD7etTBrKfu0hle4NkiXzr1c5PBnNian8PgS9ermKr3m397XKFj_Cs4M0IQ9mK0-IpYY7uGr7iCDOqZ1yrQWgEYaXymnmtqDVRUJWNiqg3Ht2UW7AjYAGW3Cii3liw1DsMnEk3DrYzKV7VKvrwIC3LCbass3zyAcWkhW3R-GxjycXf04OnMk0MTO3fMbezMV9FwyRIKQnGNQEnRLc_3Ghl3a1wMqrcavPW3gS9AiX6G9fjWrbuP96FPW3c-ojR0bf22PSGiakBKeangQ3OS0EzR7NH1Yqzuvvz3WePE1JDzBQyJKuJsxAd5y4iUy88ON7ooFFmJtSfaLyoMFBVP5TXOEW-ISEeGnihnwRjJMp6q0xH_WWpWmZCwZgCZQ9bqxCy_wtmRHRqIL7R7plk3nlBefbq4oXhhnKRgVEKJp8T_j6KiY052UpBo5Qqh1FgKxyPDxPk2FFq0Ucud1p2FgvRrwZDr6rQn1FfXQxtwXNgpaJMIHBb4ZtZdNYmTtE7s1eJDk4WNgsK73RLusJC_Wr8u7YzS2U"});
  }
  
  private formatErrors(error: any) {
    const parsedResponse: any = this.parseResponse(error);
    this.snackBar.open(`Wystąpił nieoczekiwany błąd`, null, {duration: 3000});
    console.error(`Wystąpił nieoczekiwany błąd: "${parsedResponse.exception} - ${parsedResponse.message}"`);
    return Observable.throw(parsedResponse);
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
