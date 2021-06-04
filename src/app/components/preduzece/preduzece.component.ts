import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { Preduzece } from 'src/app/models/preduzece';
import { PreduzeceService } from 'src/app/services/preduzece.service';
import { PreduzeceDialogComponent } from '../dialogs/preduzece-dialog/preduzece-dialog.component';

@Component({
  selector: 'app-preduzece',
  templateUrl: './preduzece.component.html',
  styleUrls: ['./preduzece.component.css']
})
export class PreduzeceComponent implements OnInit, OnDestroy {

  displayedColumns = ['id', 'naziv', 'opis',  'pib', 'sediste', 'actions'];
  dataSource: MatTableDataSource<Preduzece>

  constructor(private preduzeceService: PreduzeceService,
              private dialog: MatDialog) { }
  subscription: Subscription;


  ngOnInit(): void {
    this.loadData();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  public loadData() {
    this.subscription = this.preduzeceService.getAllPreduzeca().subscribe(
      data => {
        this.dataSource = new MatTableDataSource(data);
      }
    ),
    (error: Error) => {
       console.log(error.name + ' ' + error.message);
    }
  }

  public openDialog(flag: number, id?: number, naziv?: string, opis?: string, pib?:number, sediste?: string): void{
    const dialogRef = this.dialog.open(PreduzeceDialogComponent, {data: {id, naziv, opis, pib, sediste}});
    dialogRef.componentInstance.flag = flag;
    dialogRef.afterClosed().subscribe(res => {
      if(res==1){
        this.loadData();
      }
    })
  }

}
