import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Obrazovanje } from 'src/app/models/obrazovanje';
import { ObrazovanjeService } from 'src/app/services/obrazovanje.service';

@Component({
  selector: 'app-obrazovanje-dialog',
  templateUrl: './obrazovanje-dialog.component.html',
  styleUrls: ['./obrazovanje-dialog.component.css']
})
export class ObrazovanjeDialogComponent implements OnInit {

  public flag: number;

  constructor(public snackBar: MatSnackBar,
              public dialogRef: MatDialogRef<ObrazovanjeDialogComponent>,
              @Inject (MAT_DIALOG_DATA) public data: Obrazovanje,
              public obrazovanjeService: ObrazovanjeService
    ) { }

    public add(): void{
      this.obrazovanjeService.addObrazovanje(this.data).subscribe(()=>{
        this.snackBar.open('Uspesno dodato obrazovanje: ' + this.data.naziv, 'OK', {
          duration: 2500
        })
      }),
      (error: Error) => {
        console.log(error.name + ' ' + error.message);
        this.snackBar.open('Doslo je do greske prilikom dodavanja obrazovanja ', 'zatvori', {
          duration: 2500
        })
      }
    }

    public update(): void{
      this.obrazovanjeService.updateObrazovanje(this.data).subscribe(()=> {
        this.snackBar.open('Uspesno modifikovano obrazovanje: ' + this.data.naziv, 'OK', {
          duration: 2500
        })
      }),
      (error: Error) => {
        console.log(error.name + ' ' + error.message);
        this.snackBar.open('Doslo je do greske prilikom izmene obrazovanja ', 'zatvori', {
          duration: 2500
        })
      }
    }


    public delete(): void{
      this.obrazovanjeService.deleteObrazovanje(this.data.id).subscribe(()=> {
        this.snackBar.open('Uspesno izbrisano obrazovanje: ' + this.data.naziv, 'OK', {
          duration: 2500
        })
      }),
      (error: Error) => {
        console.log(error.name + ' ' + error.message);
        this.snackBar.open('Doslo je do greske prilikom brisanja obrazovanja ', 'zatvori', {
          duration: 2500
        })
      }
    }

    public cancel(): void{
      this.dialogRef.close();
      this.snackBar.open('Odustali ste ', 'zatvori', {
        duration: 1000
      })
    }

  ngOnInit(): void {
  }

}
