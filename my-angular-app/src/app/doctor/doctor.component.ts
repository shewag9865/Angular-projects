import { Component, OnInit } from '@angular/core';
import { FormControl,FormGroup,Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-doctor',
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './doctor.component.html',
  styleUrl: './doctor.component.css'
})
export class DoctorComponent implements OnInit {
    submitted = false;
    isEditing = false;
    editingIndex: number | null = null;
  
    ApplicationForm = new FormGroup({
      firstName: new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z\s]*$/)]),
      lastName: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      phone: new FormControl('', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]),
      city: new FormControl('', [Validators.required])
    });
  
    submittedData: any[] = [];
  
    ngOnInit() {
      const data = localStorage.getItem('applications');
      if (data) {
        this.submittedData = JSON.parse(data);
      }
    }
  
    onSubmitted(): void {
      this.submitted = true;
  
      if (this.ApplicationForm.valid) {
        const formValue = this.ApplicationForm.value;
  
        if (this.isEditing && this.editingIndex !== null) {
          this.submittedData[this.editingIndex] = formValue; // Update the existing entry
          this.isEditing = false;
          this.editingIndex = null;
        } else {
          this.submittedData.push(formValue); // Add new entry
        }
  
        localStorage.setItem('applications', JSON.stringify(this.submittedData));
        alert('Application Submitted Successfully');
        console.log('Form data:', formValue);
        this.ApplicationForm.reset();
        this.submitted = false;
      } else {
        console.warn('Form is invalid');
      }
    }
  
    isInvalid(controlName: string): boolean {
      const control = this.ApplicationForm.get(controlName);
      return !!(control && control.invalid && (control.touched || this.submitted));
    }
  
    
    onAdd(index: number): void {
      this.isEditing = true;
      this.editingIndex = index;
      const data = this.submittedData[index];
      this.ApplicationForm.setValue({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phone: data.phone,
        city: data.password
      });
    }
  
    onEdit(index: number): void {
      this.isEditing = true;
      this.editingIndex = index;
      const data = this.submittedData[index];
      this.ApplicationForm.setValue({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phone: data.phone,
        city: data.password
      });
    }
  
    onDelete(index: number): void {
      this.submittedData.splice(index, 1);
      localStorage.setItem('applications', JSON.stringify(this.submittedData));
    }
  
    onExport(): void {
      const jsonData = JSON.stringify(this.submittedData, null, 2);
      const blob = new Blob([jsonData], { type: 'application/json' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = 'applications.json';
      link.click();
    }
  }
  


