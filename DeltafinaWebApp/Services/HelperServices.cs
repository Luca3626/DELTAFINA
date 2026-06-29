using Models.Archives;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services
{
    public class HelperServices
    {

        public static string ResultIdTextListToString(List<ResultIdText> value)
        {
            try
            {
                StringBuilder sb = new StringBuilder();

                bool isFirst = true;
                foreach (var item in value.OrderBy(x => x.Text.ToUpper()))
                {
                    if (isFirst)
                    {
                        sb.Append(item.Text.ToUpper());
                        isFirst = false;
                    }
                    else
                        sb.Append(", " + item.Text.ToUpper());
                }

                return sb.ToString();

            }
            catch (Exception)
            {

                return "";
            }
        }

    }
}
