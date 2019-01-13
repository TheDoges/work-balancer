import {
  Injectable
} from '@angular/core';
import {
  Observable
} from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import {
  Http, Headers, ResponseContentType
} from '@angular/http';
import { MatSnackBar } from '@angular/material';
import { CredentialService} from './credential.service';
import { LoadingService } from './loading.service';
import { saveAs } from 'file-saver/FileSaver';

const API_PATH = 'http://localhost:4200/api/';

@Injectable()
export class ApiService {
  
  constructor(private http: Http, private credentialService: CredentialService, private snackBar: MatSnackBar, private loadingService: LoadingService) {}
  
  get(path: string, params: URLSearchParams = new URLSearchParams()): Observable < any > {
    const key = this.generateBusyKey();
    this.loadingService.show(key);
    return this.http.get(`${API_PATH}${path}`, { headers: this.setHeaders()} )
    .finally(() => this.loadingService.hide(key))
    .catch(this.formatErrors.bind(this))
    .map((res: Response) => this.parseResponse(res));
  }
  
  post(path: string, body: Object, params: URLSearchParams = new URLSearchParams()): Observable < any > {
    const key = this.generateBusyKey();
    this.loadingService.show(key);
    return this.http.post(
      `${API_PATH}${path}`,
      body,
      { headers: this.setHeaders()}
    )
    .finally(() => this.loadingService.hide(key))
    .catch(this.formatErrors.bind(this))
    .map((res: Response) => this.parseResponse(res));
  }
  
  put(path: string, body: Object, params: URLSearchParams = new URLSearchParams()): Observable < any > {
    const key = this.generateBusyKey();
    this.loadingService.show(key);
    return this.http.put(
      `${API_PATH}${path}`,
      body,
      { headers: this.setHeaders()}
    )
    .finally(() => this.loadingService.hide(key))
    .catch(this.formatErrors.bind(this))
    .map((res: Response) => this.parseResponse(res));
  }
  
  delete(path: string, params: URLSearchParams = new URLSearchParams()): Observable < any > {
    const key = this.generateBusyKey();
    this.loadingService.show(key);
    return this.http.delete(
      `${API_PATH}${path}`,
      { headers: this.setHeaders()}
    )
    .finally(() => this.loadingService.hide(key))
    .catch(this.formatErrors.bind(this))
    .map((res: Response) => this.parseResponse(res));
  }

  getApiUrl(): string {
    return API_PATH;
  }

  download(path: string) {
    const key = this.generateBusyKey();
    this.loadingService.show(key);
    return this.http.get(`${API_PATH}${path}`, { headers: this.setHeaders(), responseType: ResponseContentType.Blob} )
    .finally(() => this.loadingService.hide(key))
    .catch(this.formatErrors.bind(this))
    .subscribe((response: any) => {
      const contentDispositionHeader: string = response.headers.get('Content-Disposition');
      const parts: string[] = contentDispositionHeader.split(';');
      const filename = parts[1].split('=')[1].slice(1,-1);
      const blob = new Blob([response._body], { type: 'text/plain' });
      saveAs(blob, filename);
    })
  }
  
  private setHeaders(): Headers {
    return new Headers({Authorization: this.credentialService.getToken()});
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

  private generateBusyKey(): string {
    return (Math.random()*10e16).toString(36);
  }
  
}
