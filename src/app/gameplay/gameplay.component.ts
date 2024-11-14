import { Component, Input, OnInit } from '@angular/core';
import { Country } from '../country';
import { MatButton } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
@Component({
  selector: 'app-gameplay',
  standalone: true,
  imports: [MatButton, MatIconModule],
  // host:'',
  templateUrl: './gameplay.component.html',
  styleUrl: './gameplay.component.css'
})
export class GameplayComponent implements OnInit {
  @Input() countryData: Country[] = [];
  randomCountry: Country = { code: '', country: '' };
  @Input() questionsChild: number = 0;

  arrayAnswers: String[] = [];
  correctAnswer: String = '';
  page: number = 0;
  points: number = 0;
  restartGame: boolean = false;
  time: Number = 1000;

  ngOnInit(): void {
    this.generateFlag();
  }

  generateFlag() {
    this.arrayAnswers = []; //Vaciamos array
    this.randomCountry = this.countryData[Math.floor(Math.random() * this.countryData.length)]; //país al azar
    console.log(this.randomCountry);
    this.correctAnswer = this.randomCountry.country;  //será la respuesta correcta
    for (let i = 0; i < 5; i++) {
      if (i == 0) {
        this.arrayAnswers.push(this.correctAnswer); //añadimos al array la respuesta correcta
      }
      this.arrayAnswers.push(this.countryData[Math.floor(Math.random() * this.countryData.length)].country);
      i++;
    }
    this.arrayAnswers.sort(function () { return Math.random() - 0.5 });
    console.log(this.arrayAnswers);

  }

  confirm(answer: string): void {
    let color = "";
    if (answer == this.correctAnswer) {
      color = "green";
      this.points += 10;

    } else {
      color = "red";
    }

    let textButtons = Array.from(document.getElementsByClassName("mdc-button__label"));
    let buttons = Array.from(document.getElementsByClassName("answerButtons"));

    textButtons.forEach(element => {
      console.log(element.innerHTML + "   " + answer)
      if ((element.innerHTML).trim() == answer) {
        buttons.forEach(button => {
          button.setAttribute("disabled", "true");
        });
        element.parentElement?.classList.add(color);
        console.log("PROPERTIES:::  "+element.parentElement?.classList);
        
        setTimeout(() => {
          buttons.forEach(button => {
            button.removeAttribute("disabled");
          });
          element.parentElement?.classList.remove(color);
          this.page++;

          if (this.page < this.questionsChild) {
            this.generateFlag();

          } else {
            let buttons = Array.from(document.getElementsByTagName("button"));
            buttons.forEach(button => {
              button.disabled = true;
              let display = document.getElementsByClassName("image-container")[0];
              display.innerHTML = "<p>The game is over. You get " + this.points + " points!</p>";
            });
            this.restartGame = true;
          }
        }, 2000);
      }
    });
  }

  restart(): void {
    //reset de todos los valores
  //   let buttons = Array.from(document.getElementsByTagName("button"));
  //   buttons.forEach(button => {
  //     button.disabled = true;
  //   });

  //   this.randomCountry = { code: '', country: '' };
  //   this.arrayAnswers = [];
  //   this.correctAnswer = '';
  //   this.page = 0;
  //   this.points = 0;
  //   this.restartGame = false;
  //   this.generateFlag();
  
window.location.reload();
}


}
