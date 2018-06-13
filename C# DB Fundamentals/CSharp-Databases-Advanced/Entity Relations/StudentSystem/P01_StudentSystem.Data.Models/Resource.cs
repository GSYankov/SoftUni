using System;
using System.Collections.Generic;
using System.Text;

namespace P01_StudentSystem.Data.Models
{
    public class Resource
    {
        //ResourceId
        //Name(up to 50 characters, unicode)
        //Url(not unicode)
        //ResourceType(enum – can be Video, Presentation, Document or Other)
        //CourseId

        public int ResourceId { get; set; }
        public string Name { get; set; }
        public string Url { get; set; }
        public ResourceType ResourceType { get; set; }
        public int CourseId { get; set; }
        public Course Course { get; set; }



    }
}
