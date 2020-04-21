import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormBuilder, ReactiveFormsModule } from "@angular/forms";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HttpClientModule } from "@angular/common/http";
import { WatsonAPIService } from "./services/watson-api.service";

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [FormBuilder, WatsonAPIService],
  bootstrap: [AppComponent],
})
export class AppModule {}
