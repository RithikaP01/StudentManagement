import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; // Import HttpClient instead of HttpClientModule
import { Observable } from 'rxjs';
import { Student } from '../models/student';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private apiUrl = 'https://localhost:7064/api/Students'; // Adjust the URL as needed

  // Inject HttpClient, not HttpClientModule
  constructor(private http: HttpClient) {}

  // Get all students with optional search and filter
  getStudents(search?: string, filter?: string): Observable<Student[]> {
    debugger;
    return this.http.get<Student[]>(`${this.apiUrl}?search=${search || ''}&filter=${filter || ''}`);
  }

  // Get a single student by ID
  getStudent(id: number): Observable<Student> {
    return this.http.get<Student>(`${this.apiUrl}/${id}`);
  }

  // Add a new student
  addStudent(student: Student): Observable<Student> {
    return this.http.post<Student>(this.apiUrl, student);
  }

  // Update an existing student
  updateStudent(id: number, student: Student): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, student);
  }

  // Delete a student
  deleteStudent(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
