import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Country } from '../country';
import { GameplayComponent } from '../gameplay/gameplay.component';
import { MatRadioModule } from '@angular/material/radio';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [MatIconModule, MatButtonModule, GameplayComponent, MatRadioModule, ReactiveFormsModule],
  templateUrl: './game.component.html',
  styleUrl: './game.component.css'
})
export class GameComponent implements OnInit, OnChanges {
  @Input() jsonData: Country[] = [];
  play: boolean = false;
  selectedOption: string = "15"; // Valor por defecto
  selectopt: number = 15;
  questions = new FormControl('');
  constructor() {

  }

  ngOnInit(): void {
    this.selectopt = parseInt(this.selectedOption);
  }
  ngOnChanges(changes: SimpleChanges) {
    if (changes['jsonData'] && this.jsonData) {
      console.log(this.jsonData);  // Asegúrate de que los datos están disponibles
    }
  }
  playGame(): void {
    if (this.jsonData && this.jsonData.length > 0) {
      if (this.questions.value) {
       // alert(this.questions.value);
        this.selectopt = parseInt(this.questions.value);

      }

      this.play = true;
       let menu = document.getElementById("options-container") as HTMLElement;
     menu.hidden = true;
    }
  }

}
