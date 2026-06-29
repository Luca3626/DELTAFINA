using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.IO;
using System.Threading;

namespace CommunicationLib.Helper
{
   public  class ErrorEventsLog
    {
        DirectoryInfo di;
        string path;
        private object threadLock;

        public ErrorEventsLog(string folderName)
        {
            di = new DirectoryInfo(System.Environment.GetFolderPath(Environment.SpecialFolder.Personal));
            this.path = di.ToString() + "\\"+folderName;
            if (!Directory.Exists(this.path))
            {
                Directory.CreateDirectory(this.path);
            }
            threadLock = new object();
        }
        /// <summary>
        /// 
        /// </summary>
        /// <param name="classification">Error or Event</param>
        /// <param name="Msg"></param>
        /// <param name="sender"></param>
        /// <param name="data"></param>
        public void writeToLog(string classification, string Msg, string sender, DateTime data)
        {
            try
            {
                //byte[] bytes = null;
                string txt;
                string _path = this.path + "\\" + "Log" + DateTime.Now.Year + "_" + DateTime.Now.Month + "_" + DateTime.Now.Day + ".Csv";
                txt = classification + "," + Msg + "," + sender + "," + data + "\n\r";
                //bytes = Encoding.Unicode.GetBytes(txt);
                lock (threadLock)
                {
                    FileStream fs = new FileStream(@_path,
                                                     FileMode.Append);
                    StreamWriter st = new StreamWriter(fs, Encoding.UTF8);
                    st.WriteLine(txt);
                    st.Close();
                    fs.Close();
                }
            }
            catch (Exception e)
            {
                System.Diagnostics.Debug.WriteLine(e.ToString());
            }
        }
    }
}
