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
  transcriptAlternatives;
  transcriptResult;
  timestampsResponse;
  constructor(
    private formBuilder: FormBuilder,
    public watsonService: WatsonAPIService
  ) {
    this.speechToTextForm = this.formBuilder.group({
      idioma: "",
      maxAlternativas: "",
      //timeStamp: Boolean,
    });
  }

  async handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
  }

  onSubmit(speechToTextOptions) {
    this.watsonService
      .postFile(this.fileToUpload, speechToTextOptions)
      .subscribe(
        (data) => {
          this.transcriptAlternatives = data.results; 
        },
        (err) => {
          console.log("Error:", err);
        }
      );
  }
}
