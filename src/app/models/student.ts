export class Student {
    studentId!: number;
    name!: string;
     subjectId!: number;
    grade!: number;
     remarks!: string;
     subject?: Subject;
}

export interface Subject {
    subjectId: number;
    name?: string;
  }
