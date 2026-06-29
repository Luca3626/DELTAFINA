using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace CommunicationLib
{
    class RetainTags
    {


        public static object getValue(string TagName,string conStr)
        {
            //SQLCommLib.SQLServerConnection conSql = new SQLCommLib.SQLServerConnection() ;
            //try
            //{
            //    return conSql.readValueFromDb("SELECT TagValue FROM tblRetainPLC WHERE TagName='"+TagName+"'", conStr);
            //}
            //catch
            //{
            //    return null;
            //}
            //finally
            //{
            //    conSql = null;
            //}
            return null;
        }

        public static bool setValue(string TagName, object TagValue,string conStr)
        {
            //SQLCommLib.SQLServerConnection conSql = new SQLCommLib.SQLServerConnection();
            //try
            //{
            //    if (!conSql.updateRowsInDb("tblRetainPLC", new object[] { TagValue }, new string[] { "TagValue" }, " WHERE TagName='" + TagName + "'", conStr))
            //    {
            //        return conSql.insertRowToDb("tblRetainPLC", new object[] { TagName, TagValue }, conStr);
            //    }
            //    else
            //    {
            //        return true;
            //    }

            //}
            //catch
            //{
            //    return false;
            //}
            //finally
            //{
            //    conSql = null;
            //}

            return false;
        }

    }
}
