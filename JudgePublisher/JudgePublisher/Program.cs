using System;
using System.IO;
using System.IO.Compression;
using System.Collections.Generic;
using System.Linq;

namespace JudgePublisher
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var indexOfLastLevel = Directory.GetCurrentDirectory().LastIndexOf("\\");
            var prjName = Directory.GetCurrentDirectory().Substring(indexOfLastLevel + 1);
            HashSet<string> dirList = new HashSet<string>();
            copyFilesToTemp(prjName);
            createArchiveInCurrentFolder(prjName);
        }

        private static void copyFilesToTemp(string prjName)
        {
            if (Directory.Exists(Path.GetTempPath() + prjName))
            {
                deleteDirectoryAndFiles(Path.GetTempPath() + prjName);
            }

            var prjLocations = Directory.GetDirectories(Path.GetFullPath("."), "*", SearchOption.AllDirectories);
            var prjLocsNoVs = prjLocations.Where(l => l.Contains("\\bin") == false &&
                                                      l.Contains("\\obj") == false &&
                                                      l.Contains("\\.vs") == false).ToArray();

            foreach (string dirPath in prjLocsNoVs)
            {
                Directory.CreateDirectory(dirPath.Replace(Path.GetFullPath("."), Path.GetTempPath() + prjName));
            }

            var prjFiles = Directory.GetFiles(Path.GetFullPath("."), "*.*", SearchOption.AllDirectories);
            var filesNoVs = prjFiles.Where(l => l.Contains("\\bin") == false &&
                                                l.Contains("\\obj") == false &&
                                                l.Contains("\\.vs") == false &&
                                                l.Contains(".zip") == false).ToArray();

            foreach (string newPath in filesNoVs)
            {
                File.Copy(newPath, newPath.Replace(Path.GetFullPath("."), Path.GetTempPath() + prjName));
            }
        }

        private static void deleteDirectoryAndFiles(string path)
        {
            List<string> dirList = new List<string>(Directory.GetDirectories(path));
            dirList.Add(path);

            foreach (string d in dirList)
            {
                DirectoryInfo di = new DirectoryInfo(d);

                foreach (FileInfo file in di.GetFiles())
                {
                    file.Delete();
                }
                foreach (DirectoryInfo dir in di.GetDirectories())
                {
                    dir.Delete(true);
                }
            }
        }

        private static void createArchiveInCurrentFolder(string prjName)
        {
            var temp = Path.GetTempPath();
            var newFileName = $"\\{prjName}.zip";
            var tempFileDest = temp + newFileName;
            var tempFileDestBkp = temp + newFileName + ".bkp";

            try
            {
                ZipFile.CreateFromDirectory(temp + prjName, tempFileDest);
            }
            catch (IOException)
            {
                File.Delete(tempFileDest);
                ZipFile.CreateFromDirectory(temp + prjName, tempFileDest);
            }

            if (File.Exists(Directory.GetCurrentDirectory() + newFileName))
            {
                File.Delete(Directory.GetCurrentDirectory() + newFileName);
            }

            File.Copy(tempFileDest, Directory.GetCurrentDirectory() + newFileName);

        }

        //private static HashSet<string> traverseAllLevelDirs(string[] prjDirs)
        //{
        //    var dirList = new HashSet<string>();
        //    Queue<string> dirQueue = new Queue<string>(prjDirs);
        //    while (dirQueue.Count != 0)
        //    {
        //        string[] subDirs = Directory.GetDirectories(dirQueue.Peek());
        //        dirList.Add(dirQueue.Dequeue());
        //        foreach (string subDir in subDirs)
        //        {
        //            dirQueue.Enqueue(subDir);
        //        }
        //    }
        //    return dirList;
        //}

        //    private static HashSet<string> traverseFirstLevelDirs(string[] prjDirs)
        //    {
        //        var dirList = new HashSet<string>();
        //        foreach (string dir in prjDirs)
        //        {
        //            string[] subDirs = Directory.GetDirectories(dir);
        //            foreach (string sDir in subDirs)
        //            {
        //                if (sDir.EndsWith("\\bin") || sDir.EndsWith("\\obj"))
        //                {
        //                    dirList.Add(sDir);
        //                }
        //            }
        //        }
        //        return dirList;
        //    }
    }
}
