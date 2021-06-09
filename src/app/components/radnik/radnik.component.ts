import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { Obrazovanje } from 'src/app/models/obrazovanje';
import { Radnik } from 'src/app/models/radnik';
import { Sektor } from 'src/app/models/sektor';
import { RadnikService } from 'src/app/services/radnik.service';
import { RadnikDialogComponent } from '../dialogs/radnik-dialog/radnik-dialog.component';

@Component({
  selector: 'app-radnik',
  templateUrl: './radnik.component.html',
  styleUrls: ['./radnik.component.css']
})
export class RadnikComponent implements OnInit, OnDestroy, OnChanges {

  displayedColumns = ['id','brojLk','ime','prezime','obrazovanje','sektor','actions'];
  dataSource : MatTableDataSource<Radnik>
  @Input() selektovanSektor: Sektor;
  subscription: Subscription;
  @ViewChild(MatSort, {static: false}) sort: MatSort;
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;

  constructor(private radnikService: RadnikService,
    private dialog: MatDialog) { }


  ngOnChanges(): void {
    if(this.selektovanSektor.id){
      this.loadData();
    }
  }



  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    //this.loadData();
  }

  loadData(){
    this.subscription = this.radnikService.getRadnikeZaSektor(this.selektovanSektor.id).subscribe(
      data => {
        this.dataSource = new MatTableDataSource(data);

        this.dataSource.filterPredicate = (data, filter: string) =>{
          const accumulator = (currentTerm, key) => {
            return key === 'obrazovanje' ? currentTerm + data.obrazovanje.naziv : currentTerm + data[key];
          }
          const dataStr = Object.keys(data).reduce(accumulator,'').toLowerCase();
          const transformedFilter = filter.trim().toLowerCase();
          return dataStr.indexOf(transformedFilter) !== -1;
        };

        this.dataSource.sortingDataAccessor = (data, property) => {
          switch(property) {
            case 'obrazovanje': return data.obrazovanje.naziv.toLowerCase();

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

  public openDialog(flag: number, id?: number, brojLk?: number, ime?: string, prezime?: string, obrazovanje?: Obrazovanje, sektor?: Sektor): void{
    const dialogRef = this.dialog.open(RadnikDialogComponent, {data: {id, brojLk, ime, prezime, obrazovanje, sektor}});
    dialogRef.componentInstance.flag = flag;
    if(flag===1){
      dialogRef.componentInstance.data.sektor = this.selektovanSektor;
    }
    dialogRef.afterClosed().subscribe(res => {
      if(res==1){
        this.loadData();
      }
    })
  }

  applyFilter(filterValue: string){
    filterValue=filterValue.trim();
    filterValue=filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

}




