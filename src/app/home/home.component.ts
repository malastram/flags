import { Component, OnInit } from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatTabsModule} from '@angular/material/tabs';
import {MatDividerModule} from '@angular/material/divider';
import { GameComponent } from '../game/game.component';
import { AboutComponent } from '../about/about.component';
import { ContactComponent } from '../contact/contact.component';
import { HttpClient, HttpClientModule } from '@angular/common/http'; // Importa HttpClientModule
import { Country } from '../country';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatToolbarModule,MatTabsModule,MatDividerModule,GameComponent, AboutComponent, ContactComponent, HttpClientModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})

export class HomeComponent implements OnInit {

jsonDataHome : Country[] = [];

constructor(private http: HttpClient){
  this.http.get<Country[]>('data.json').subscribe(data => {
    this.jsonDataHome = data; 
    console.log(this.jsonDataHome); 
  });
}

ngOnInit(): void {
  this.http.get<Country[]>('data.json').subscribe(data => {
    this.jsonDataHome = data; 
    console.log(this.jsonDataHome); 
  });}

}



