import { Routes } from '@angular/router';
import { VagaListComponent } from './components/vaga-list/vaga-list.component';
import { VagaFormComponent } from './components/vaga-form/vaga-form.component';
import { VagaDetailComponent } from './components/vaga-detail/vaga-detail.component';

export const routes: Routes = [
  { path: '', component: VagaListComponent },
  { path: 'nova', component: VagaFormComponent },
  { path: 'editar/:id', component: VagaFormComponent },
  { path: 'vaga/:id', component: VagaDetailComponent },
  { path: '**', redirectTo: '' }
];
