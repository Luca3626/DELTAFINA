using System;

namespace Services.Helpers
{
    /// <summary>
    /// Turni e giornata produttiva dell'impianto.
    /// Stessa convenzione usata dai totalizzatori di turno (22:00-06:00, 06:00-14:00,
    /// 14:00-22:00): la giornata produttiva inizia alle 06:00, quindi tutto quello che
    /// succede fra mezzanotte e le 06:00 appartiene alla giornata precedente.
    /// </summary>
    public static class WorkshiftHelper
    {
        public const string WORKSHIFT_NIGHT = "22:00-06:00";
        public const string WORKSHIFT_MORNING = "06:00-14:00";
        public const string WORKSHIFT_AFTERNOON = "14:00-22:00";

        /// <summary>
        /// Ora di inizio della giornata produttiva.
        /// </summary>
        public const int PRODUCTION_DAY_START_HOUR = 6;

        /// <summary>
        /// Giornata produttiva a cui appartiene l'istante indicato (sempre a mezzanotte).
        /// </summary>
        public static DateTime GetProductionDate(DateTime date)
        {
            if (date.Hour < PRODUCTION_DAY_START_HOUR)
                return date.AddDays(-1).Date;

            return date.Date;
        }

        /// <summary>
        /// Turno a cui appartiene l'istante indicato.
        /// </summary>
        public static string GetWorkshift(DateTime date)
        {
            if (date.Hour >= 6 && date.Hour < 14)
                return WORKSHIFT_MORNING;

            if (date.Hour >= 14 && date.Hour < 22)
                return WORKSHIFT_AFTERNOON;

            return WORKSHIFT_NIGHT;
        }
    }
}
