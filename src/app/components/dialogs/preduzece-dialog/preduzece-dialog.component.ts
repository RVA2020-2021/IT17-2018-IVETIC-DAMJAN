import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Preduzece } from 'src/app/models/preduzece';
import { PreduzeceService } from 'src/app/services/preduzece.service';

@Component({
  selector: 'app-preduzece-dialog',
  templateUrl: './preduzece-dialog.component.html',
  styleUrls: ['./preduzece-dialog.component.css']
})
export class PreduzeceDialogComponent implements OnInit {

  public flag: number;
  constructor(public snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<PreduzeceDialogComponent>,
    @Inject (MAT_DIALOG_DATA) public data: Preduzece,
    public preduzeceService: PreduzeceService) { }

    public add(): void{
      this.preduzeceService.addPreduzece(this.data).subscribe(()=>{
        this.snackBar.open('Uspesno dodato preduzece: ' + this.data.naziv, 'OK', {
          duration: 2500
        })
      }),
      (error: Error) => {
        console.log(error.name + ' ' + error.message);
        this.snackBar.open('Doslo je do greske prilikom dodavanja preduzeca ', 'zatvori', {
          duration: 2500
        })
      }
    }

    public update(): void{
      this.preduzeceService.updatePreduzece(this.data).subscribe(()=> {
        this.snackBar.open('Uspesno modifikovano preduzece: ' + this.data.naziv, 'OK', {
          duration: 2500
        })
      }),
      (error: Error) => {
        console.log(error.name + ' ' + error.message);
        this.snackBar.open('Doslo je do greske prilikom izmene preduzeca ', 'zatvori', {
          duration: 2500
        })
      }
    }


    public delete(): void{
      this.preduzeceService.deletePreduzece(this.data.id).subscribe(()=> {
        this.snackBar.open('Uspesno izbrisano preduzece: ' + this.data.naziv, 'OK', {
          duration: 2500
        })
      }),
      (error: Error) => {
        console.log(error.name + ' ' + error.message);
        this.snackBar.open('Doslo je do greske prilikom brisanja preduzeca ', 'zatvori', {
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
