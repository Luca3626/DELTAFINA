using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace SQLCommLib
{
    public class ControlData
    {
        static bool tmpBool;
        static double tmpDouble;
        static int tmpInt;
        static short tmpShort;

        public static bool IsDate(object value)
        {
            try
            {
                //MODIFICATO: 07/10/2016
                return value != null && bool.TryParse(value.ToString(), out tmpBool);
                //DateTime.Parse(value.ToString());
                //return true;
            }
            catch
            {
                return false;
            }
        }
        public static bool IsNumeric(object value)
        {
            try
            {
                return value != null && double.TryParse(value.ToString(), out tmpDouble);
                //Double.Parse(value.ToString());
                //return true;
            }
            catch
            {
                return false;
            }
        }
        public static bool IsNumericNaN(object value)
        {
            try
            {
                return value != null && double.IsNaN(double.Parse(value.ToString()));
                //Double.Parse(value.ToString());
                //return true;
            }
            catch
            {
                return false;
            }
        }
        public static bool IsPosNumeric(object value)
        {
            //double d;
            try
            {
                tmpBool = double.TryParse(value.ToString(), out tmpDouble);
                return tmpBool && tmpDouble > 0;
                //d = Double.Parse(value.ToString());
                //if (d >= 0)
                //    return true;
                //else
                //    return false;
            }
            catch
            {
                return false;
            }
        }
        public static bool IsPosInt(object value)
        {
            //int d;
            try
            {
                tmpBool = int.TryParse(value.ToString(), out tmpInt);
                return tmpBool && tmpInt > 0;
                //d = int.Parse(value.ToString());
                //if (d >= 0)
                //    return true;
                //else
                //    return false;
            }
            catch
            {
                return false;
            }
        }
        public static bool IsPosShort(object value)
        {
            //short d;
            try
            {
                tmpBool = short.TryParse(value.ToString(), out tmpShort);
                return tmpBool && tmpShort > 0;
                //d = short.Parse(value.ToString());
                //if (d >= 0)
                //    return true;
                //else
                //    return false;
            }
            catch
            {
                return false;
            }
        }

        public static bool IsToLong(object value, int n)
        {
            if (value.ToString().Length > n)
                return true;
            else return false;
        }
        public static bool IsPhoneNumber(object value)
        {
            return IsPosNumeric(value);
        }
        public static int indexOf(string[] value, string text)
        {
            int i;
            int ret = -1;
            for (i = 0; i < value.Length; i++)
                if (value[i] == text)
                {
                    ret = i;
                    break;
                }
            return ret;
        }
        public static bool isNull(object value)
        {
            try
            {
                value = float.Parse(value.ToString());
                return false;
            }
            catch
            {
                return true;
            }
        }
    }
}
