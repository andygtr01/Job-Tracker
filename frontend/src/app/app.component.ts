import { Component, OnInit } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  titulo = 'Job Tracker';
  temaEscuro = false;

  ngOnInit(): void {
    const salvo = localStorage.getItem('temaEscuro');
    this.temaEscuro = salvo === 'true';
    this.aplicarTema();
  }

  alternarTema(): void {
    this.temaEscuro = !this.temaEscuro;
    localStorage.setItem('temaEscuro', String(this.temaEscuro));
    this.aplicarTema();
  }

  private aplicarTema(): void {
    document.body.classList.toggle('tema-escuro', this.temaEscuro);
  }
}