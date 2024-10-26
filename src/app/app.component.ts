import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http'; // Import HttpClient and HttpClientModule
import { RouterOutlet } from '@angular/router';
import { Student } from './models/student'; // Adjust the path to your Student model

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterOutlet, HttpClientModule], // Add HttpClientModule here
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  searchTerm: string = '';
  filterOption: string = '';
  students: Student[] = [];
  filteredStudents: Student[] = [];

  ngOnInit() {
    this.fetchStudents();
  }

  constructor(private httpClient: HttpClient) { }

  fetchStudents() {
    const apiUrl = 'http://localhost:7064/api/Students'; // Your API URL
    this.httpClient.get<Student[]>(`${apiUrl}?search=${this.searchTerm}&filter=${this.filterOption}`).subscribe(
      (data) => {
        this.students = data;
        this.filteredStudents = data;
      },
      (error) => {
        console.error('Error fetching students:', error);
      }
    );
  }

  filterStudents() {
    this.filteredStudents = this.students.filter(student => {
      const matchesSearch = this.searchTerm
        ? student.name.toLowerCase().includes(this.searchTerm.toLowerCase())
        : true;

      const matchesFilter = this.filterOption
        ? (this.filterOption === 'PASS' && student.grade >= 75) ||
          (this.filterOption === 'FAIL' && student.grade < 75)
        : true;

      return matchesSearch && matchesFilter;
    });
  }
}
