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

const API_PATH = 'http://localhost:4200/api/';

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
    return new Headers({Authorization: "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjljMjYyYzM1ZDU5MDVmY2JhMWQwZjNkMWZmOTVlYjM4MWQyNDU5NTk2MjdlZjRmZTViNWE2ODEzMzI2ODA3OWU4MTgzNWFiMzk2Nzk3YmU0In0.eyJhdWQiOiIxIiwianRpIjoiOWMyNjJjMzVkNTkwNWZjYmExZDBmM2QxZmY5NWViMzgxZDI0NTk1OTYyN2VmNGZlNWI1YTY4MTMzMjY4MDc5ZTgxODM1YWIzOTY3OTdiZTQiLCJpYXQiOjE1MjUxODE3MzQsIm5iZiI6MTUyNTE4MTczNCwiZXhwIjoxNTU2NzE3NzM0LCJzdWIiOiIxIiwic2NvcGVzIjpbXX0.hWsI_BG2Y5xIrKuLkEGjnVYFDZu2AQR7d6rEnDj8S3TevQlrlwOkiAon32viQmTzUO4u7Pg4tW3iQ2ysgJyvWu1S07iR7qS8IVsXD5n8-H8MwyL470fgVdFS3FKe8SRytKnWSxQT2MbaJ6GtpvlBeWxo1zx5DbX2aj6dZElaf8Ne6MAbWJEMVJ9eApKspw-u3aQu02l23zQZWZsEm44D6YB5VlLG_bCINtu2Ei5O8nBqUcGi9inZJ610Su276bKk5UScR3tUQNMCScpnASId9eHjnpr3Y7Fff13mb9mLA5yH_NAuaq2aK_NiKLQpGu17NroK96Iw4s8k95SXUrL60VNFJ6F9p-PNUytZdeaURAgedDiG0TV97GlhgECxtgmKdO45CL1rwc-vFgxwp1K35PGFqz0Epw-GCP7jYk_NCYxrC5ShKCMzLLoObeprY8vdxIHx_gQorWQWkqHAnppsgPl_0ZZtzYzPUCjZmn8GmL_Z7_mePQN-Tg1Us9hhPUOS8TQbl1gtg3Hk56jOucrUVRpgXFEmN8Qh7yxJ_pWfsWYBzsIBadNaDQC7BGcMXduAYSBfnTBr7hpw_ByJ8MdVbVLEBTHgMHiw_Ze-NabMshX1lsMs6ZOWxOGLaKY2Bknj9tXAb-dkwlCPGBQrWuOXSfCpMDMAyzTV154g9ZanYHo"});
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
