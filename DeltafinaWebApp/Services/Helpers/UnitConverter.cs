using System;

namespace Services.Helpers
{
    public static class UnitConverter
    {

        public static double TonToKg(double ton, int round = -1)
        {
            if (round == -1)
                return ton * 1000;
            else
                return Math.Round(ton * 1000, round);
        }

        public static double KgToTon(double Kg, int round = -1)
        {
            if (round == -1)
                return Kg / 1000;
            else
                return Math.Round(Kg / 1000, round);
        }

        public static double QuintalToKg(double quintal, int round = -1)
        {
            if (round == -1)
                return quintal * 100;
            else
                return Math.Round(quintal * 100, round);
        }

        public static double QuintalToTon(double quintal, int round = -1)
        {
            if (round == -1)
                return quintal / 10;
            else
                return Math.Round(quintal / 10, round);
        }

        public static double KgToQuintal(double Kg, int round = -1)
        {
            if (round == -1)
                return Kg / 100;
            else
                return Math.Round(Kg / 100, round);
        }

        public static double GetVolumeRawMaterial(double weight, double specificWeight, int round = -1)
        {
            if (specificWeight > 0)
            {
                if (round == -1)
                    return weight / specificWeight;
                else
                    return Math.Round(weight / specificWeight, round);
            }
            else
                return 0;
        }

    }
}
