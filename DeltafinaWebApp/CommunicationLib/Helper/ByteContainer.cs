using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace CommunicationLib
{
    public class ByteContainer
    {
        public delegate void ChangedEventHandler(object sender, EventArgs e);
        public event ChangedEventHandler Changed;
        int len;
        int numOfSet;
        private byte[] actBuf;
        private byte[] oldBuf;
        /// <summary>
        /// 
        /// </summary>
        /// <param name="a"></param>
        public ByteContainer(int len, int numOfSet)
        {
            actBuf = new byte[len];
            oldBuf = new byte[len];
            this.len = len;
            this.numOfSet = numOfSet;
        }
        public byte this[int pos]
        {

            get
            {
                try
                {
                    return actBuf[pos];

                }
                catch (Exception)
                {
                    return new byte();
                }
            }
            set
            {
                actBuf[pos] = value;
                if (oldBuf[pos] != value)
                {
                    try
                    {
                        //if (numOfSet == 3)
                        //    Console.Out.WriteLine("bool");

                        if(Changed!=null)
                        Changed(pos, new EventArgs());
                    }
                    catch(Exception e)
                    {
                        System.Diagnostics.Debug.WriteLine(e.Message);
                    }
                }
                oldBuf[pos] = value;
            }
        }
        public int LENGTH
        {
            get
            {
                return len;
            }
        }

        public int NUM_OF_SET
        {
            get { return numOfSet; }
        }
    }
}
