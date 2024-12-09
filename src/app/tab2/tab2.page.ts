import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/angular/standalone';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonSelect, IonSelectOption, IonTextarea,IonButton, IonList, IonItem, IonLabel } from '@ionic/angular/standalone'
import { ReactiveFormsModule } from '@angular/forms';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ProviderService } from '../services/provider.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: true,
  imports: [ ReactiveFormsModule, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonSelect, IonSelectOption, IonTextarea,IonButton, IonList, IonItem, IonLabel, IonHeader, IonToolbar, IonTitle, IonContent, ExploreContainerComponent]
})
export class Tab2Page {

  myForm: FormGroup = new FormGroup({
    score: new FormControl("", Validators.required),
    opinion: new FormControl("", Validators.required)
  });

  collectionName = 'reviews';

  dataList: any[] = [];

  constructor(private providerService: ProviderService){}

  onSubmit() {
    this.providerService.createDocument(this.collectionName, this.myForm.value).then(() => {
        this.myForm.reset()
    });
  }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.providerService.readCollection(this.collectionName).subscribe((data) => {
        this.dataList = data;
    });
}

}
