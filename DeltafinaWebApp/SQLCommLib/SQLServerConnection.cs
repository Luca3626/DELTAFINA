using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Data;
using System.Data.SqlClient;


namespace SQLCommLib
{
    public class SQLServerConnection
    {
        //****************************************************************************************
        //string cmdStr;
        private SqlConnection conSQL;
        private SqlCommand cmd;
        private string errquery = "";

        public string errorMessage = "";

        #region open/close

        public bool open(string conStr)
        {
            conSQL = new SqlConnection();
            try
            {
                if (conSQL.State == ConnectionState.Closed)
                {
                    conSQL.ConnectionString = conStr;
                    conSQL.Open();
                    return true;
                }
                else if (conSQL.State == ConnectionState.Open)
                    return true;
                else return false;
            }
            catch(SqlException ex)
            {

                return false;
            }


        }

        public void close()
        {
            try
            {

                conSQL.Close();
                conSQL.Dispose();

            }
            catch (SqlException)
            {
            }
            catch (NullReferenceException)
            {
            }
        }

        #endregion

        #region utils

        public object testConnection(string queryStr, string conStr)
        {
            try
            {
                open(conStr);
                cmd = new SqlCommand();
                cmdConfig(cmd, queryStr, 500);

                return cmd.ExecuteScalar();
            }
            finally
            {
                close();
            }
        }

        public bool IS_CONNECTED
        {
            get
            {
                try
                {

                    if (conSQL.State == ConnectionState.Open)
                        return true;
                    else return false;
                }
                catch (NullReferenceException e1)
                {
                    errorMessage = e1.Message;
                    return false;
                }
            }
        }

        #endregion

        #region Config

        private void cmdConfig(SqlCommand cmd, string queryStr, int time)
        {
            try
            {
                cmd.CommandTimeout = time;
                cmd.Connection = conSQL;
                cmd.CommandText = queryStr;
            }
            catch (InvalidOperationException)
            {

                System.Diagnostics.Debug.WriteLine("Errore nella configurazione della connessione", "ERRORE");
            }
        }

        private void cmdConfig(SqlCommand cmd, string queryStr)
        {
            try
            {
                cmd.CommandTimeout = 1000;
                cmd.Connection = conSQL;
                cmd.CommandText = queryStr;
            }
            catch (InvalidOperationException)
            {
                System.Diagnostics.Debug.WriteLine("Errore nella configurazione della connessione", "ERRORE");
            }
        }

        #endregion

        #region Generic

        public bool execGenericQuery(string queryStr)
        {
            try
            {
                errorMessage = "";
                if (IS_CONNECTED)
                {
                    cmd = new SqlCommand();
                    cmdConfig(cmd, queryStr);
                    cmd.ExecuteNonQuery();

                    return true;
                }
                else return false;
            }
            catch (Exception eRRFD0)
            {
                errorMessage = "QUERY: " + queryStr + "ERRORE: " + eRRFD0.Message;
                System.Diagnostics.Debug.WriteLine("QUERY: " + queryStr + ". Errore di esecuzione del metodo \n" + eRRFD0, "ERRORE");
                return false;
            }
        }

        public bool execGenericQuery(string queryStr, string conStr)
        {
            try
            {


                open(conStr);
                cmd = new SqlCommand();
                cmdConfig(cmd, queryStr);
                cmd.ExecuteNonQuery();
                close();
                return true;


            }

            catch (Exception eRRFD0)
            {
                errorMessage = "QUERY: " + queryStr + "ERRORE: " + eRRFD0.Message;
                System.Diagnostics.Debug.WriteLine("QUERY: " + queryStr + ".Errore di esecuzione del metodo \n" + eRRFD0, "ERRORE");
                close();
                return false;
            }

        }

        #endregion

        #region ReadRows

        public SqlDataReader readRowsFromDb(string queryStr)
        {

            try
            {
                if (IS_CONNECTED)
                {
                    cmd = new SqlCommand();
                    cmdConfig(cmd, queryStr);
                    return cmd.ExecuteReader();
                }
                else return null;
            }

            catch (Exception eRRFD)
            {
                errorMessage = "QUERY: " + queryStr + "ERRORE: " + eRRFD.Message;
                System.Diagnostics.Debug.WriteLine(queryStr + "\nErrore di esecuzione del metodo \n" + eRRFD, "ERRORE");
                return null;
            }

        }

        public SqlDataReader readRowsFromDb(string queryStr, string conStr)
        {

            open(conStr);
            try
            {

                {
                    cmd = new SqlCommand();
                    cmdConfig(cmd, queryStr);
                    return cmd.ExecuteReader();

                }

            }

            catch (Exception eRRFD1)
            {
                errorMessage = "QUERY: " + queryStr + "ERRORE: " + eRRFD1.Message;
                System.Diagnostics.Debug.WriteLine(queryStr + "\nErrore di esecuzione del metodo \n" + eRRFD1, "ERRORE");
                return null;
            }

            finally
            {
                //close();
            }
        }

        #endregion

        #region readVal

        public Object readValueFromDb(string queryStr)
        {
            try
            {
                if (IS_CONNECTED)
                {

                    cmd = new SqlCommand();
                    cmdConfig(cmd, queryStr);
                    object ret = cmd.ExecuteScalar();
                    return ret;
                }
                else return null;
            }

            catch (Exception eRRFD2)
            {
                errorMessage = "QUERY: " + queryStr + "ERRORE: " + eRRFD2.Message;
                System.Diagnostics.Debug.WriteLine(queryStr + "\nErrore di esecuzione del metodo \n" + eRRFD2, "ERRORE");
                return null;
            }
        }

        public Object readValueFromDb(string queryStr, string conStr)
        {
            try
            {

                {
                    open(conStr);

                    cmd = new SqlCommand();
                    cmdConfig(cmd, queryStr);
                    return cmd.ExecuteScalar();
                }

            }
            catch (Exception eRRFD3)
            {
                errorMessage = "QUERY: " + queryStr + "ERRORE: " + eRRFD3.Message;
                System.Diagnostics.Debug.WriteLine(queryStr + "\nErrore di esecuzione del metodo \n" + eRRFD3, "ERRORE");
                return null;
            }
            finally
            {
                close();
            }
        }

        #endregion

        #region getMax

        public Object getMaxID(string tabName, string tabID)
        {
            string query = "";
            try
            {
                if (IS_CONNECTED)
                {

                    query = "SELECT COUNT( " + tabID + " )" +
                          " FROM " + tabName;
                    if ((int)readValueFromDb(query) == 0)
                        return 0;
                    else
                    {
                        query = "SELECT MAX( " + tabID + " )" +
                              "FROM " + tabName;
                        return readValueFromDb(query);
                    }
                }
                else return false;

            }
            catch (Exception eRRFD4)
            {
                errorMessage = "QUERY: " + query + "ERRORE: " + eRRFD4.Message;
                System.Diagnostics.Debug.WriteLine("Errore di esecuzione del metodo \n" + eRRFD4, "ERRORE");
                return null;
            }
        }

        public Object getMaxID(string tabName, string tabID, string conStr)
        {
            string query = "";
            open(conStr);
            try
            {

                {

                    query = "SELECT COUNT( " + tabID + " )" +
                          " FROM " + tabName;
                    if ((int)readValueFromDb(query) == 0)
                        return 0;
                    else
                    {
                        query = "SELECT MAX( " + tabID + " )" +
                              "FROM " + tabName;
                        return readValueFromDb(query);
                    }

                }

            }
            catch (Exception eRRFD4)
            {
                errorMessage = "QUERY: " + query + "ERRORE: " + eRRFD4.Message;
                System.Diagnostics.Debug.WriteLine("Errore di esecuzione del metodo \n" + eRRFD4, "ERRORE");
                return null;
            }
            finally
            {
                close();
            }
        }

        #endregion

        #region getNext

        public int getNextID(string tabName, string tabID)
        {
            string query = "";
            try
            {
                if (IS_CONNECTED)
                {

                    query = "SELECT COUNT( " + tabID + " )" +
                          " FROM " + tabName;
                    if ((int)readValueFromDb(query) == 0)
                        return 1;
                    else
                    {
                        query = "SELECT MAX( " + tabID + " )" +
                              "FROM " + tabName;
                        return int.Parse(readValueFromDb(query).ToString()) + 1;
                    }
                }
                else return -1;

            }
            catch (Exception eRRFD4)
            {
                errorMessage = "QUERY: " + query + "ERRORE: " + eRRFD4.Message;
                System.Diagnostics.Debug.WriteLine("Errore di esecuzione del metodo \n" + eRRFD4, "ERRORE");
                return -1;
            }
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="tabName"></param>
        /// <param name="tabID"></param>
        /// <param name="WhereCondition">Format : WHERE condition</param>
        /// <returns></returns>
        public int getNextID_C(string tabName, string tabID, string WhereCondition)
        {
            string query = "";
            try
            {
                if (IS_CONNECTED)
                {

                    query = "SELECT COUNT( " + tabID + " )" +
                          " FROM " + tabName + " " + WhereCondition;
                    if ((int)readValueFromDb(query) == 0)
                        return 1;
                    else
                    {
                        query = "SELECT MAX( " + tabID + " )" +
                              "FROM " + tabName + " " + WhereCondition;
                        return int.Parse(readValueFromDb(query).ToString()) + 1;
                    }
                }
                else return -1;

            }
            catch (Exception eRRFD4)
            {
                errorMessage = "QUERY: " + query + "ERRORE: " + eRRFD4.Message;
                System.Diagnostics.Debug.WriteLine("Errore di esecuzione del metodo \n" + eRRFD4, "ERRORE");
                return -1;
            }
        }

        public int getNextID(string tabName, string tabID, string conStr)
        {
            string query = "";
            open(conStr);
            try
            {

                {

                    query = "SELECT COUNT( " + tabID + " )" +
                          " FROM " + tabName;
                    if ((int)readValueFromDb(query) == 0)
                        return 1;
                    else
                    {
                        query = "SELECT MAX( " + tabID + " )" +
                              "FROM " + tabName;
                        return int.Parse(readValueFromDb(query).ToString()) + 1;
                    }

                }

            }
            catch (Exception eRRFD4)
            {
                errorMessage = "QUERY: " + query + "ERRORE: " + eRRFD4.Message;
                System.Diagnostics.Debug.WriteLine("Errore di esecuzione del metodo \n" + eRRFD4, "ERRORE");
                return -1;
            }
            finally
            {
                close();
            }
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="tabName"></param>
        /// <param name="tabID"></param>
        /// <param name="WhereCondition">Format : WHERE condition</param>
        /// <param name="conStr"></param>
        /// <returns></returns>
        public int getNextID_C(string tabName, string tabID, string WhereCondition, string conStr)
        {
            string query = "";
            open(conStr);
            try
            {

                {

                    query = "SELECT COUNT( " + tabID + " )" +
                          " FROM " + tabName + " " + WhereCondition; ;
                    if ((int)readValueFromDb(query) == 0)
                        return 1;
                    else
                    {
                        query = "SELECT MAX( " + tabID + " )" +
                              "FROM " + tabName + " " + WhereCondition; ;
                        return int.Parse(readValueFromDb(query).ToString()) + 1;
                    }

                }

            }
            catch (Exception eRRFD4)
            {
                errorMessage = "QUERY: " + query + "ERRORE: " + eRRFD4.Message;
                System.Diagnostics.Debug.WriteLine("Errore di esecuzione del metodo \n" + eRRFD4, "ERRORE");
                return -1;
            }
            finally
            {
                close();
            }
        }

        #endregion

        #region Shift

        public void shiftID(string tableName, string tableID, int tableRef, int shiftQty)
        {
            //TableName : Tabella da modificare
            //TableID : indice intero da modificare
            //TableRef : Valore dell'indice oltre il quale fare lo "shift"
            //ShiftQty : valore che indica di quando fare lo shift
            if (IS_CONNECTED)
            {
                string query;
                query = "UPDATE " + tableName +
                      " SET " + tableID + " = " + tableID + " + " + shiftQty +
                      " WHERE " + tableID + " >= " + tableRef;
                execGenericQuery(query);
            }
        }

        public void shiftID(string tableName, string tableID, int tableRef, int shiftQty, string conStr)
        {
            //TableName : Tabella da modificare
            //TableID : indice intero da modificare
            //TableRef : Valore dell'indice oltre il quale fare lo "shift"
            //ShiftQty : valore che indica di quando fare lo shift
            string query;

            query = "UPDATE " + tableName +
                  " SET " + tableID + " = " + tableID + " + " + shiftQty +
                  " WHERE " + tableID + " >= " + tableRef;
            execGenericQuery(query, conStr);
        }

        #endregion

        #region GetName

        public Object getNameID(string tableName, string tableID, string columnName, string name)
        {
            try
            {
                if (IS_CONNECTED)
                {
                    string query;
                    cmd = new SqlCommand();
                    query = " SELECT COUNT( " + tableID + " )" +
                          " FROM " + tableName +
                          " WHERE " + columnName + " = '" + name + "' ";
                    if ((int)readValueFromDb(query) == 0)
                        return -1;
                    else
                    {
                        query = " SELECT " + tableID +
                              " FROM " + tableName +
                              " WHERE " + columnName + " = '" + name + "' ";
                        return readValueFromDb(query);
                    }
                }
                else return null;

            }
            catch (Exception eRRFD5)
            {
                System.Diagnostics.Debug.WriteLine("Errore di esecuzione del metodo \n" + eRRFD5, "ERRORE");
                return null;
            }
        }

        public Object getNameID(string tableName, string tableID, string columnName, string name, string conStr)
        {
            open(conStr);
            try
            {

                {
                    string query;
                    cmd = new SqlCommand();
                    query = " SELECT COUNT( " + tableID + " )" +
                          " FROM " + tableName +
                          " WHERE " + columnName + " = '" + name + "' ";
                    if ((int)readValueFromDb(query) == 0)
                        return -1;
                    else
                    {
                        query = " SELECT " + tableID +
                              " FROM " + tableName +
                              " WHERE " + columnName + " = '" + name + "' ";
                        return readValueFromDb(query);
                    }
                }

            }
            catch (Exception eRRFD5)
            {
                System.Diagnostics.Debug.WriteLine("Errore di esecuzione del metodo \n" + eRRFD5, "ERRORE");
                return null;
            }
            finally
            {
                close();
            }
        }

        #endregion

        #region Insert

        public bool insertRowToDb(string tableName, Object[] value)
        {

            try
            {

                {
                    cmd = new SqlCommand();
                    string query = "INSERT INTO " + tableName +
                            " VALUES ( ";
                    for (int i = 0; i < value.Length; i++)
                    {
                        if (ControlData.IsDate(value[i]) & value[i].ToString().Contains("/"))
                            query = query + " '" + value[i].ToString().Replace(".", ":") + "',";
                        else if (ControlData.IsNumeric(value[i]))
                            query = query + value[i].ToString().Replace(",", ".") + ",";
                        else
                            query = query + "'" + value[i]/*.ToString().Substring(0, value[i].ToString().Length - 1) */+ "',";
                    }
                    query = query.Substring(0, query.Length - 1);
                    query = query + ")";
                    errquery = query;
                    cmdConfig(cmd, query);
                    cmd.ExecuteNonQuery();

                    return true;
                }

            }
            catch (Exception eRRFD6)
            {
                errorMessage = "QUERY: " + errquery + "ERRORE: " + eRRFD6.Message;
                System.Diagnostics.Debug.WriteLine(errquery + "\nErrore di esecuzione del metodo \n" + eRRFD6);
                return false;
            }
        }

        public bool insertRowToDb_Forms(string tableName, Object[] value)
        {

            try
            {

                {
                    cmd = new SqlCommand();
                    string query = "INSERT INTO " + tableName +
                            " VALUES ( ";
                    for (int i = 0; i < value.Length; i++)
                    {
                        if (ControlData.IsDate(value[i]) & value[i].ToString().Contains("/"))
                            query = query + " '" + value[i].ToString().Replace(".", ":") + "',";
                        else if (ControlData.IsNumeric(value[i]))
                            query = query + value[i].ToString().Replace(",", ".") + ",";
                        else
                            query = query + "'" + value[i].ToString().Substring(0, value[i].ToString().Length - 1) + "',";
                    }
                    query = query.Substring(0, query.Length - 1);
                    query = query + ")";
                    cmdConfig(cmd, query);
                    cmd.ExecuteNonQuery();
                    return true;
                }

            }
            catch (Exception eRRFD6)
            {
                errorMessage = "QUERY: " + errquery + "ERRORE: " + eRRFD6.Message;
                System.Diagnostics.Debug.WriteLine("Errore di esecuzione del metodo \n" + eRRFD6, "ERRORE");
                return false;
            }
        }

        public bool insertRowToDb(string tableName, Object[] value, string conStr)
        {

            open(conStr);


            try
            {

                {
                    cmd = new SqlCommand();
                    string query = "INSERT INTO " + tableName +
                           " VALUES ( ";
                    for (int i = 0; i < value.Length; i++)
                    {
                        if (ControlData.IsDate(value[i]) & value[i].ToString().Contains("/"))
                            query = query + " '" + value[i].ToString().Replace(".", ":") + "',";
                        else if (ControlData.IsNumeric(value[i]))
                            query = query + value[i].ToString().Replace(",", ".") + ",";
                        else
                            query = query + "'" + value[i].ToString()/*.Substring(0, value[i].ToString().Length - 1)*/ + "',";
                    }
                    query = query.Substring(0, query.Length - 1);
                    query = query + ")";
                    errquery = query;
                    cmdConfig(cmd, query);
                    cmd.ExecuteNonQuery();
                    return true;
                }

            }
            catch (Exception eRRFD7)
            {
                errorMessage = "QUERY: " + errquery + "ERRORE: " + eRRFD7.Message;
                System.Diagnostics.Debug.WriteLine(errquery + "\nErrore di esecuzione del metodo \n" + eRRFD7, "ERRORE");
                return false;
            }
            finally
            {
                close();
            }
        }

        public bool insertRowToDb_Forms(string tableName, Object[] value, string conStr)
        {

            open(conStr);


            try
            {

                {
                    cmd = new SqlCommand();
                    string query = "INSERT INTO " + tableName +
                           " VALUES ( ";
                    for (int i = 0; i < value.Length; i++)
                    {
                        if (ControlData.IsDate(value[i]) & value[i].ToString().Contains("/"))
                            query = query + " '" + value[i].ToString().Replace(".", ":") + "',";
                        else if (ControlData.IsNumeric(value[i]))
                            query = query + value[i].ToString().Replace(",", ".") + ",";
                        else
                            query = query + "'" + value[i].ToString().Substring(0, value[i].ToString().Length - 1) + "',";
                    }
                    query = query.Substring(0, query.Length - 1);
                    query = query + ")";
                    cmdConfig(cmd, query);
                    cmd.ExecuteNonQuery();
                    return true;
                }

            }
            catch (Exception eRRFD7)
            {
                errorMessage = "QUERY: " + errquery + "ERRORE: " + eRRFD7.Message;
                System.Diagnostics.Debug.WriteLine("Errore di esecuzione del metodo \n" + eRRFD7, "ERRORE");
                return false;
            }
            finally
            {
                close();
            }
        }

        #endregion

        #region Update

        public bool updateRowsInDb(string tableName, Object[] value, string[] columns, string filterQuery)
        {
            string query = "";
            try
            {

                {
                    cmd = new SqlCommand();
                    if (value.Length == columns.Length)
                    {
                        query = " UPDATE " + tableName +
                            " SET ";
                        for (int i = 0; i < value.Length; i++)
                        {
                            query = query + columns[i] + " = ";
                            if (ControlData.IsDate(value[i]) & value[i].ToString().Contains("/"))
                                query = query + " '" + value[i].ToString().Replace(".", ":") + "',";
                            else if (ControlData.IsNumeric(value[i]))
                                query = query + value[i].ToString().Replace(",", ".") + ",";
                            else
                                query = query + "'" + value[i].ToString()/*.Substring(0, value[i].ToString().Length - 1)*/  + "',";
                        }
                        query = query.Substring(0, query.Length - 1);
                        query = query + " " + filterQuery;
                        cmdConfig(cmd, query);
                        return  cmd.ExecuteNonQuery() > 0;
                        
                    }


                    else
                    {
                        System.Diagnostics.Debug.WriteLine("il numero di valori non coincide con il numero di colonne ");
                        return false;
                    }
                }

            }
            catch (Exception eRRFD8)
            {
                errorMessage = "QUERY: " + query + "ERRORE: " + eRRFD8.Message;
                System.Diagnostics.Debug.WriteLine("Errore di esecuzione del metodo \n" + eRRFD8, "ERRORE");
                return false;
            }

        }

        public bool updateRowsInDb_Forms(string tableName, Object[] value, string[] columns, string filterQuery)
        {
            string query = "";
            try
            {

                {
                    cmd = new SqlCommand();
                    if (value.Length == columns.Length)
                    {
                        query = " UPDATE " + tableName +
                            " SET ";
                        for (int i = 0; i < value.Length; i++)
                        {
                            query = query + columns[i] + " = ";
                            if (ControlData.IsDate(value[i]) & value[i].ToString().Contains("/"))
                                query = query + " '" + value[i].ToString().Replace(".", ":") + "',";
                            else if (ControlData.IsNumeric(value[i]))
                                query = query + value[i].ToString().Replace(",", ".") + ",";
                            else
                                query = query + "'" + value[i].ToString().Substring(0, value[i].ToString().Length - 1) + "',";
                        }
                        query = query.Substring(0, query.Length - 1);
                        query = query + " " + filterQuery;
                        cmdConfig(cmd, query);
                        return cmd.ExecuteNonQuery() > 0;
                    }


                    else
                    {
                        System.Diagnostics.Debug.WriteLine("il numero di valori non coincide con il numero di colonne ", "ERRORE");
                        return false;
                    }
                }

            }
            catch (Exception eRRFD8)
            {
                errorMessage = "QUERY: " + query + "ERRORE: " + eRRFD8.Message;
                System.Diagnostics.Debug.WriteLine("Errore di esecuzione del metodo \n" + eRRFD8, "ERRORE");
                return false;
            }

        }

        public bool updateRowsInDb(string tableName, Object[] value, string[] columns, string filterQuery, string conStr)
        {
            string query = "";
            open(conStr);
            try
            {

                {
                    cmd = new SqlCommand();
                    if (value.Length == columns.Length)
                    {
                        query = " UPDATE " + tableName +
                            " SET ";
                        for (int i = 0; i < value.Length; i++)
                        {
                            query = query + columns[i] + " = ";
                            if (ControlData.IsDate(value[i]) & value[i].ToString().Contains("/"))
                                query = query + " '" + value[i].ToString().Replace(".", ":") + "',";
                            else if (ControlData.IsNumeric(value[i]))
                                query = query + value[i].ToString().Replace(",", ".") + ",";
                            else
                                query = query + "'" + value[i].ToString()/*.Substring(0, value[i].ToString().Length - 1)*/ + "',";
                        }
                        query = query.Substring(0, query.Length - 1);
                        query = query + " " + filterQuery;
                        cmdConfig(cmd, query);
                        return cmd.ExecuteNonQuery() > 0;
                    }
                    else
                    {
                        System.Diagnostics.Debug.WriteLine("il numero di valori non coincide con il numero di colonne ");
                        return false;
                    }
                }

            }
            catch (Exception eRRFD8)
            {
                errorMessage = "QUERY: " + query + "ERRORE: " + eRRFD8.Message;
                System.Diagnostics.Debug.WriteLine("Errore di esecuzione del metodo \n" + eRRFD8, "ERRORE");
                return false;
            }
            finally
            {
                close();
            }

        }

        public bool updateRowsInDb_Forms(string tableName, Object[] value, string[] columns, string filterQuery, string conStr)
        {
            string query = "";
            open(conStr);
            try
            {

                {
                    cmd = new SqlCommand();
                    if (value.Length == columns.Length)
                    {
                        query = " UPDATE " + tableName +
                            " SET ";
                        for (int i = 0; i < value.Length; i++)
                        {
                            query = query + columns[i] + " = ";
                            if (ControlData.IsDate(value[i]) & value[i].ToString().Contains("/"))
                                query = query + " '" + value[i].ToString().Replace(".", ":") + "',";
                            else if (ControlData.IsNumeric(value[i]))
                                query = query + value[i].ToString().Replace(",", ".") + ",";
                            else
                                query = query + "'" + value[i].ToString().Substring(0, value[i].ToString().Length - 1) + "',";
                        }
                        query = query.Substring(0, query.Length - 1);
                        query = query + " " + filterQuery;
                        cmdConfig(cmd, query);
                        return cmd.ExecuteNonQuery() > 0;
                    }
                    else
                    {
                        System.Diagnostics.Debug.WriteLine("il numero di valori non coincide con il numero di colonne ", "ERRORE");
                        return false;
                    }
                }

            }
            catch (Exception eRRFD8)
            {
                errorMessage = "QUERY: " + query + "ERRORE: " + eRRFD8.Message;
                System.Diagnostics.Debug.WriteLine("Errore di esecuzione del metodo \n" + eRRFD8, "ERRORE");
                return false;
            }
            finally
            {
                close();
            }

        }

        #endregion

        #region fillDataSet

        public int fillDataSet(String queryStr, ref DataSet ds)
        {
            SqlDataAdapter da = new SqlDataAdapter();
            try
            {
                if (IS_CONNECTED)
                {
                    cmd = new SqlCommand();
                    cmdConfig(cmd, queryStr);
                    return da.Fill(ds);
                }
                else
                    return -1;
            }
            catch
            {
                return -1;
            }
        }

        public DataSet fillDataSet(String queryStr)
        {
            SqlDataAdapter da = new SqlDataAdapter();
            DataSet ds = new DataSet();
            try
            {
                if (IS_CONNECTED)
                {
                    cmd = new SqlCommand();
                    cmdConfig(cmd, queryStr);
                    da.Fill(ds);

                    return ds;
                }
                else
                    return null;
            }
            catch
            {
                return null;
            }
        }

        public DataTable fillDataTable(String query)
        {
            SqlDataAdapter da = new SqlDataAdapter();
            DataTable dt = new DataTable();
            try
            {
                if (IS_CONNECTED)
                {
                    try
                    {
                        cmd = new SqlCommand();
                        cmdConfig(cmd, query);
                        da.SelectCommand = cmd;
                        da.Fill(dt);
                    }
                    catch (Exception)
                    {

                        
                    }

                    return dt;
                }
                else
                    return null;
            }
            catch
            {
                return null;
            }
        }
        #endregion

        #region ReadSingleRow

        public object[] readSingleRow(String query, String conStr)
        {
            object[] row;
            DataTable dt = null;
            try
            {
                open(conStr);
                dt = fillDataTable(query);
                close();
                if (dt != null)
                {
                    if (dt.Rows.Count != 0)
                    {
                        row = dt.Rows[0].ItemArray;
                    }
                    else
                    {
                        errorMessage = "Row Empty";
                        row = new object[0];
                    }
                }
                else
                {
                    errorMessage = "DataTable Empty";
                    row = new object[0];
                }
            }
            catch (Exception e)
            {
                errorMessage = e.Message;
                row = new object[0];
            }
            try
            {
                dt.Dispose();
            }
            catch
            {
            }
            dt = null;
            return row;
        }

        public object[] readSingleRow(String query)
        {
            object[] row;
            DataTable dt = null;
            try
            {

                dt = fillDataTable(query);

                if (dt != null)
                {
                    if (dt.Rows.Count != 0)
                    {
                        row = dt.Rows[0].ItemArray;
                    }
                    else
                    {
                        errorMessage = "Row Empty";
                        row = new object[0];
                    }
                }
                else
                {
                    errorMessage = "DataTable Empty";
                    row = new object[0];
                }
            }
            catch (Exception e)
            {
                errorMessage = e.Message;
                row = new object[0];
            }
            try
            {
                dt.Dispose();
            }
            catch
            {
            }
            dt = null;
            return row;
        }

        #endregion

    }
}
