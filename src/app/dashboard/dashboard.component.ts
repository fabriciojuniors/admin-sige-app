import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../services/dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  dashboard : dashboard;

  constructor(private dashboardService : DashboardService) { }

  ngOnInit(): void {
    this.get();
  }

  get(){
    this.dashboardService.get().subscribe(
      value => {
        this.dashboard = value;
      }
    )
  }

}

export interface dashboard {
  ativos: number,
  ingressos_vendidos: number,
  recebimento: number,
  aguardando_aprovacao: number
}
