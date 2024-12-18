import { Component, signal } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/angular/standalone';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { IonFab, IonFabButton, IonIcon, IonCard } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { cloudUploadOutline } from 'ionicons/icons';
import { IonCardContent, IonButton, IonList, IonItem, IonLabel } from '@ionic/angular/standalone';
import { TeachablemachineService } from '../services/teachablemachine.service';
import { ViewChild, ElementRef } from '@angular/core';
import { PercentPipe } from '@angular/common';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: true,
  imports: [ PercentPipe, IonCardContent, IonButton, IonList, IonItem, IonLabel, IonFab, IonFabButton, IonIcon, IonCard, IonHeader, IonToolbar, IonTitle, IonContent, ExploreContainerComponent],
})
export class Tab1Page {

  @ViewChild('image', { static: false }) imageElement!: ElementRef<HTMLImageElement>;

  imageReady = signal(false)
  imageUrl = signal("")

  modelLoaded = signal(false);
  classLabels: string[] = []; 

  constructor(private teachablemachine: TeachablemachineService) {
    addIcons({ cloudUploadOutline });
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files.length > 0) {
        const file = input.files[0];
        const reader = new FileReader();

        reader.onload = () => {
          this.imageUrl.set(reader.result as string)
          this.imageReady.set(true)
        };

        reader.readAsDataURL(file);
    }
}

  async ngOnInit() {
    await this.teachablemachine.loadModel()
    this.classLabels = this.teachablemachine.getClassLabels()
    this.modelLoaded.set(true)
  }

  predictions: any[] = [];

  async predict() {
    try {
        const image = this.imageElement.nativeElement;
        this.predictions = await this.teachablemachine.predict(image);
    } catch (error) {
        console.error(error);
        alert('Error al realizar la predicción.');
    }
  }

}
