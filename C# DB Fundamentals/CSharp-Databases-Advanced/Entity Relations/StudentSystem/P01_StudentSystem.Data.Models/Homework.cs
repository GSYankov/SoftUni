using System;
using System.Collections.Generic;
using System.Text;

namespace P01_StudentSystem.Data.Models
{
    public class Homework
    {
        //HomeworkId
        //Content(string, linking to a file, not unicode)
        //ContentType(enum – can be Application, Pdf or Zip)
        //SubmissionTime
        //StudentId
        //CourseId

        public int HomeworkId { get; set; }
        public string Content { get; set; }
        public ContentType ContentType { get; set; }
        public DateTime SubmissionTime { get; set; }
        public int StudentId { get; set; }
        public Student Student { get; set; }
        public int CourseId { get; set; }
        public Course Course { get; set; }




    }
}
