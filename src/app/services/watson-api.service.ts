import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class WatsonAPIService {
  constructor(private http: HttpClient) {}

  postFile(fileToUpload: File, speechToTextOptions: any): Observable<any> {
    let endpoint = "https://api.us-south.speech-to-text.watson.cloud.ibm.com/instances/0b0d5106-3e8b-4555-97ee-856e42d87145/v1/recognize";
    let params = new HttpParams();
    if (speechToTextOptions.idioma) {
      params = params.append("model", speechToTextOptions.idioma);
    }
    if (speechToTextOptions.maxAlternativas) {
      if(speechToTextOptions.maxAlternativas >=6) speechToTextOptions.maxAlternativas = 5;
      if(speechToTextOptions.maxAlternativas <=0) speechToTextOptions.maxAlternativas = 1;
      params = params.append(
        "max_alternatives",
        speechToTextOptions.maxAlternativas
      );
    }
    if (speechToTextOptions.timeStamp) {
      params = params.append("timestamps", speechToTextOptions.timeStamp);
    }
    const headers = new HttpHeaders({
      "Content-Type": `audio/${fileToUpload.name.substring(fileToUpload.name.lastIndexOf('.')+1)}`,
      Authorization:
        "Basic " + btoa(`apikey:tHkkJ7C-aNXblWkgtXsQKn4aSLd4kyp1V6oZ5DJ2I21v`), // Insert WATSON API KEY
    });
    const formData: FormData = new FormData();
    formData.append("fileKey", fileToUpload, fileToUpload.name);
    return this.http
      .post(endpoint, formData, { params: params, headers: headers })
      .pipe((status) => {
        return status;
      });
  }
}
