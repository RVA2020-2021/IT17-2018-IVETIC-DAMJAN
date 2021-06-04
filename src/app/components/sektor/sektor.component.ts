import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { Preduzece } from 'src/app/models/preduzece';
import { Sektor } from 'src/app/models/sektor';
import { SektorService } from 'src/app/services/sektor.service';
import { SektorDialogComponent } from '../dialogs/sektor-dialog/sektor-dialog.component';

@Component({
  selector: 'app-sektor',
  templateUrl: './sektor.component.html',
  styleUrls: ['./sektor.component.css']
})
export class SektorComponent implements OnInit, OnDestroy {

  displayedColumns = ['id','naziv','oznaka','preduzece','actions'];
  dataSource : MatTableDataSource<Sektor>
  subscription: Subscription;
  selektovanSektor: Sektor;
  @ViewChild(MatSort, {static: false}) sort: MatSort;
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;

  constructor(private sektorService: SektorService,
              private dialog: MatDialog) { }


  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(){
    this.subscription = this.sektorService.getAllSektori().subscribe(
      data => {
        this.dataSource = new MatTableDataSource(data);

        this.dataSource.filterPredicate = (data, filter: string) =>{
          const accumulator = (currentTerm, key) => {
            return key === 'preduzece' ? currentTerm + data.preduzece.naziv : currentTerm + data[key];
          }
          const dataStr = Object.keys(data).reduce(accumulator,'').toLowerCase();
          const transformedFilter = filter.trim().toLowerCase();
          return dataStr.indexOf(transformedFilter) !== -1;
        };

        this.dataSource.sortingDataAccessor = (data, property) => {
          switch(property) {
            case 'preduzece': return data.preduzece.naziv.toLowerCase();

            default: return data[property];
          }
        };

        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      }
    ),
    (error: Error) => {
      console.log(error.name + ' ' + error.message);
   }
  }

  public openDialog(flag: number, id?: number, naziv?: string, oznaka?: string, preduzece?: Preduzece): void{
    const dialogRef = this.dialog.open(SektorDialogComponent, {data: {id, naziv, oznaka, Preduzece}});
    dialogRef.componentInstance.flag = flag;
    dialogRef.afterClosed().subscribe(res => {
      if(res==1){
        this.loadData();
      }
    })
  }

  selectRow(row){
    this.selektovanSektor = row;
  }

  applyFilter(filterValue: string){
    filterValue=filterValue.trim();
    filterValue=filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

}
