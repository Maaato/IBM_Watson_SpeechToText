import { Component } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { WatsonAPIService } from "./services/watson-api.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  title = "Speech To Text - IBM Watson";
  speechToTextForm;
  fileToUpload: File = null;
  translateResponse;
  timestampsResponse;
  constructor(
    private formBuilder: FormBuilder,
    public watsonService: WatsonAPIService
  ) {
    this.speechToTextForm = this.formBuilder.group({
      idioma: "",
      maxAlternativas: "",
      timeStamp: Boolean,
    });
  }

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
  }

  onSubmit(speechToTextOptions) {
    this.watsonService
      .postFile(this.fileToUpload, speechToTextOptions)
      .subscribe(
        (data) => {
          this.translateResponse = data.results[0].alternatives;
          this.timestampsResponse = data.results[0].alternatives[0].timestamps;
        },
        (err) => {
          console.log("Error:", err);
        }
      );
  }
}
