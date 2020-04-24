import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: "root",
})
export class WatsonAPIService {
  constructor(private http: HttpClient) {}

  postFile(fileToUpload: File, speechToTextOptions: any): Observable<any> {
    let params = new HttpParams();
    if (speechToTextOptions.idioma) {
      params = params.append("model", speechToTextOptions.idioma);
    }
     else {
      params = params.append("model", "en-US_NarrowbandModel");
    }
    if (speechToTextOptions.maxAlternativas) {
      if (speechToTextOptions.maxAlternativas >= 6)speechToTextOptions.maxAlternativas = 5;
      if (speechToTextOptions.maxAlternativas <= 0)speechToTextOptions.maxAlternativas = 1;
      params = params.append("max_alternatives",speechToTextOptions.maxAlternativas);
    }
    if (speechToTextOptions.timeStamp) params = params.append("timestamps", speechToTextOptions.timeStamp);

    const headers = new HttpHeaders({
      "Content-Type": `audio/${fileToUpload.name.substring(fileToUpload.name.lastIndexOf(".") + 1)}`,
      "Authorization": "Basic " + btoa(`apikey:${environment.apiKeyWatson}`)  // Insert WATSON API KEY
    });

    const formData: FormData = new FormData();
    formData.append("fileKey", fileToUpload, fileToUpload.name);
    console.log("Extension File: ",`audio/${fileToUpload.name.substring(fileToUpload.name.lastIndexOf(".") + 1)}`);
    return this.http.post(environment.endpointWatson, fileToUpload, { params: params, headers: headers })
  }
}
