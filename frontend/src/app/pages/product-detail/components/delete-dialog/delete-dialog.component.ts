import { Component, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { APIService } from '../../../../api/api.service';

@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.scss'],
})
export class DeleteDialogComponent {
  constructor(
    private apiService: APIService,
    private router: Router,
    public dialogRef: MatDialogRef<DeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,

  ) {}

  onConfirm(): void {
    const id = this.data.id;
    
    this.apiService.deleteProduct({productId: id}).subscribe({
      next: (response: any) => {
        this.router.navigate(['/']);
      },
      error: (error: any) => {
        console.log(error.error.message);
      },
    });
    this.dialogRef.close();
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
