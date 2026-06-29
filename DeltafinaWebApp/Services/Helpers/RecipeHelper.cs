
namespace Services.Helpers
{
    public static class RecipeHelper
    {

        public static string GetCode(bool prefix, int codeId, int length = 0)
        {
            string rValue = "";

            if (length > 0)
            {
                for (int i = 0; i < length - codeId.ToString().Length; i++)
                    rValue += "0";

                rValue += codeId.ToString();
            }
            else
                rValue = codeId.ToString();

            if (prefix)
            {
                //using (var ctx = new EF.CULTIVAR_SEMI_DBEntities())
                //{
                //    PrefixTypes type = anaContext.PrefixTypes.Where(x => x.Name.Equals("RECIPES")).First();
                //    rValue = type.Prefix + rValue;
                //}
                rValue = "R" + rValue;
            }

            return rValue;
        }

    }
}