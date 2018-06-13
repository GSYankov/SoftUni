using System;
using System.Collections.Generic;


namespace P01_StudentSystem.Data.Models
{
    public class Student
    {
        //StudentId
        //Name(up to 100 characters, unicode)
        //PhoneNumber(exactly 10 characters, not unicode, not required)
        //RegisteredOn
        //Birthday(not required)

        public Student()
        {
            this.CourseEnrollments = new HashSet<StudentCourse>();
            this.HomeworkSubmissions = new HashSet<Homework>();
        }
        public int StudentId { get; set; }
        public string Name { get; set; }
        public string PhoneNumber { get; set; }
        public DateTime RegisteredOn { get; set; }
        public DateTime? Birthday { get; set; }

        public ICollection<StudentCourse> CourseEnrollments { get; set; }
        public ICollection<Homework> HomeworkSubmissions { get; set; }
    }
}
