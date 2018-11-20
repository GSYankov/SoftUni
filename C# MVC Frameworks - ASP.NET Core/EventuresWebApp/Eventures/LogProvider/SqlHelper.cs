using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Data.SqlClient;
using Eventures.Models;

namespace CSCoreLogging.LogProvider
{
    public class SqlHelper
    {
        private string ConnectionString { get; set; }

        public SqlHelper(string connectionStr)
        {
            ConnectionString = "Server=.;Database=Eventures;Trusted_Connection=True;MultipleActiveResultSets=true";
        }

        private bool ExecuteNonQuery(string commandStr, List<SqlParameter> paramList)
        {
            bool result = false;
            using (SqlConnection conn = new SqlConnection(ConnectionString))
            {
                if (conn.State != System.Data.ConnectionState.Open)
                {
                    conn.Open();
                }

                using (SqlCommand command = new SqlCommand(commandStr, conn))
                {
                    command.Parameters.AddRange(paramList.ToArray());
                    int count = command.ExecuteNonQuery();
                    result = count > 0;
                }
            }
            return result;
        }

        public bool InsertLog(EventLog log)
        {
            string command = $@"INSERT INTO [dbo].[EventLog] ([EventID],[LogLevel],[Message],[CreatedTime]) VALUES (@EventID, @LogLevel, @Message, @CreatedTime)";
            List<SqlParameter> paramList = new List<SqlParameter>
            {
                new SqlParameter("EventID", log.EventId),
                new SqlParameter("LogLevel", log.LogLevel),
                new SqlParameter("Message", log.Message),
                new SqlParameter("CreatedTime", log.CreatedTime)
            };
            return ExecuteNonQuery(command, paramList);
        }
    }
}
