using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Core
{
    class Languages
    {
        // ...


        // Generic Alarms 
        public static string[] allarme_temperatura_olio = { "ALLARME TEMPERATURA OLIO", "ALLARME TEMPERATURA OLIO", "ALLARME TEMPERATURA OLIO" };
        public static string[] allarme_pressione_sansa_decanter = { "ALLARME PRESSIONE SANSA DECANTER", "ALLARME PRESSIONE SANSA DECANTER", "ALLARME PRESSIONE SANSA DECANTER" };
        public static string[] allarme_riempimento_uscita_sansa = { "ALLARME RIEMPIMENTO USCITA SANSA", "ALLARME RIEMPIMENTO USCITA SANSA", "ALLARME RIEMPIMENTO USCITA SANSA" };
        public static string[] allarme_pulsante_emergenza_decanter = { "ALLARME PULSANTE EMERGENZA DECANTER", "ALLARME PULSANTE EMERGENZA DECANTER", "ALLARME PULSANTE EMERGENZA DECANTER" };
        public static string[] allarme_mancanza_ausiliari = { "ALLARME MANCANZA AUSILIARI", "ALARM LACK OF AUXILIARIES", "ALARM LACK OF AUXILIARIES" };
        public static string[] anomalia_centralina_motore_fermo_dec1 = { "ANOMALIA CENTRALINA MOTORE FERMO DEC1", "ANOMALIA CENTRALINA MOTORE FERMO DEC1", "ANOMALIA CENTRALINA MOTORE FERMO DEC1" };
        public static string[] anomalia_cpu = { "ANOMALIA CPU", "ANOMALIA CPU", "ANOMALIA CPU" };
        public static string[] anomalia_profinet_d1_m10 = { "ANOMALIA PROFINET D1_M10", "ANOMALIA PROFINET D1_M10", "ANOMALIA PROFINET D1_M10" };
        public static string[] anomalia_profinet_d1_m11 = { "ANOMALIA PROFINET D1_M11", "ANOMALIA PROFINET D1_M11", "ANOMALIA PROFINET D1_M11" };
        public static string[] allarme_temperatura_cuscinetto_anteriore = { "ALLARME TEMPERATURA CUSCINETTO ANTERIORE", "ALLARME TEMPERATURA CUSCINETTO ANTERIORE", "ALLARME TEMPERATURA CUSCINETTO ANTERIORE" };
        public static string[] allarme_temperatura_cuscinetto_posteriore = { "ALLARME TEMPERATURA CUSCINETTO POSTERIORE", "ALLARME TEMPERATURA CUSCINETTO POSTERIORE", "ALLARME TEMPERATURA CUSCINETTO POSTERIORE" };
        public static string[] anomalia_sonda_temperatura_pasta_ttd1_20 = { "ANOMALIA SONDA TEMPERATURA PASTA TTD1_20", "ANOMALIA SONDA TEMPERATURA PASTA TTD1_20", "ANOMALIA SONDA TEMPERATURA PASTA TTD1_20" };
        public static string[] anomalia_sonda_temperatura_olio_ttd1_30 = { "ANOMALIA SONDA TEMPERATURA OLIO TTD1_30", "ANOMALIA SONDA TEMPERATURA OLIO TTD1_30", "ANOMALIA SONDA TEMPERATURA OLIO TTD1_30" };
        public static string[] anomalia_sonda_temperatura_cuscinetti_ttd1_1 = { "ANOMALIA SONDA TEMPERATURA CUSCINETTI TTD1_1", "ANOMALIA SONDA TEMPERATURA CUSCINETTI TTD1_1", "ANOMALIA SONDA TEMPERATURA CUSCINETTI TTD1_1" };
        public static string[] anomalia_sonda_temperatura_cuscinetti_ttd1_2 = { "ANOMALIA SONDA TEMPERATURA CUSCINETTI TTD1_2", "ANOMALIA SONDA TEMPERATURA CUSCINETTI TTD1_2", "ANOMALIA SONDA TEMPERATURA CUSCINETTI TTD1_2" };
        public static string[] anomalia_pressostato_pasta_ptd1_21 = { "ANOMALIA PRESSOSTATO PASTA PTD1_21", "ANOMALIA PRESSOSTATO PASTA PTD1_21", "ANOMALIA PRESSOSTATO PASTA PTD1_21" };
        public static string[] anomalia_pressostato_pasta_ptd1_22 = { "ANOMALIA PRESSOSTATO PASTA PTD1_22", "ANOMALIA PRESSOSTATO PASTA PTD1_22", "ANOMALIA PRESSOSTATO PASTA PTD1_22" };
        public static string[] allarme_pressione_pasta_decanter = { "ALLARME PRESSIONE PASTA DECANTER", "ALLARME PRESSIONE PASTA DECANTER", "ALLARME PRESSIONE PASTA DECANTER" };
        public static string[] allarme_temperatura_pasta = { "ALLARME TEMPERATURA PASTA", "ALLARME TEMPERATURA PASTA", "ALLARME TEMPERATURA PASTA" };
        public static string[] anomalia_profinet_m90 = { "ANOMALIA PROFINET M90", "ANOMALIA PROFINET M90", "ANOMALIA PROFINET M90" };


        public static string[] allarme_temperatura_cuscinetto_anteriore_dec1 = { "ALLARME TEMPERATURA CUSCINETTO ANTERIORE DEC1", "FRONT BEARING TEMPERATURE ALARM DEC1", "FRONT BEARING TEMPERATURE ALARM DEC1" };
        public static string[] allarme_temperatura_cuscinetto_posteriore_dec1 = { "ALLARME TEMPERATURA CUSCINETTO POSTERIORE DEC1", "REAR BEARING TEMPERATURE ALARM DEC1", "REAR BEARING TEMPERATURE ALARM DEC1" };
        public static string[] allarme_temperatura_cuscinetto_anteriore_dec2 = { "ALLARME TEMPERATURA CUSCINETTO ANTERIORE DEC2", "FRONT BEARING TEMPERATURE ALARM DEC2", "FRONT BEARING TEMPERATURE ALARM DEC2" };
        public static string[] allarme_temperatura_cuscinetto_posteriore_dec2 = { "ALLARME TEMPERATURA CUSCINETTO POSTERIORE DEC2", "REAR BEARING TEMPERATURE ALARM DEC2", "REAR BEARING TEMPERATURE ALARM DEC2" };
        public static string[] allarme_anomalia_scheda_analogica = { "ANOMALIA SCHEDA ANALOGICA", "ANALOG BOARD FAULT", "ANALOG BOARD FAULT" };
        public static string[] allarme_livello_sansa = { "ALLARME LIVELLO SANSA", "ALARM OLIVE RESIDUES LEVEL", "ALARM OLIVE RESIDUES LEVEL" };
        public static string[] allarme_livello_lubrificante_decanter = { "ALLARME LIVELLO LUBRIFICANTE DECANTER", "ALARM LUBRIFICANT DECANTER", "ALARM LUBRIFICANT DECANTER" };
        public static string[] allarme_temperatura_pasta_usando_frangitore_1 = { "ALLARME TEMPERATURA PASTA USANDO FRANGITORE 1", "ALARM PASTE TEMPERATURE WITH CRUSHER 1", "ALARM PASTE TEMPERATURE WITH CRUSHER 1" };
        public static string[] allarme_pressione_pasta_usando_frangitore_1 = { "ALLARME PRESSIONE PASTA USANDO FRANGITORE 1", "ALARM PASTE PRESSURE WITH CRUSHER 1", "ALARM PASTE PRESSURE WITH CRUSHER 1" };
        public static string[] allarme_potenza_frangitore_1 = { "ALLARME POTENZA FRANGITORE 1", "ALARM CRUSHER POWER 1", "ALARM CRUSHER POWER 1" };
        public static string[] allarme_temperatura_pasta_gramola_1_ = { "ALLARME TEMPERATURA PASTA GRAMOLA 1 ", "ALARM PASTE TEMPERATURE MALAXER 1 ", "ALARM PASTE TEMPERATURE MALAXER 1 " };
        public static string[] allarme_temperatura_pasta_gramola_2 = { "ALLARME TEMPERATURA PASTA GRAMOLA 2", "ALARM PASTE TEMPERATURE MALAXER 2", "ALARM PASTE TEMPERATURE MALAXER 2" };
        public static string[] allarme_temperatura_pasta_gramola_3_ = { "ALLARME TEMPERATURA PASTA GRAMOLA 3 ", "ALARM PASTE TEMPERATURE MALAXER 3 ", "ALARM PASTE TEMPERATURE MALAXER 3 " };
        public static string[] allarme_temperatura_pasta_gramola_4_ = { "ALLARME TEMPERATURA PASTA GRAMOLA 4 ", "ALARM PASTE TEMPERATURE MALAXER 4 ", "ALARM PASTE TEMPERATURE MALAXER 4 " };
        public static string[] allarme_temperatura_olio_decanter_1 = { "ALLARME TEMPERATURA OLIO DECANTER 1", "ALARM OIL TEMPERATURE DECANTER 1", "ALARM OIL TEMPERATURE DECANTER 1" };
        public static string[] allarme_temperatura_pasta_decanter_1 = { "ALLARME TEMPERATURA PASTA DECANTER 1", "ALARM PASTE TEMPERATURE DECANTER 1", "ALARM PASTE TEMPERATURE DECANTER 1" };
        public static string[] allarme_potenza_decanter_1 = { "ALLARME POTENZA DECANTER 1", "ALARM PASTE TEMPERATURE DECANTER 1", "ALARM PASTE TEMPERATURE DECANTER 1" };
        public static string[] allarme_pressione_ingresso_pasta_decanter_1 = { "ALLARME PRESSIONE INGRESSO PASTA DECANTER 1", "ALARM INPUT PASTE PRESSURE DECANTER 1", "ALARM INPUT PASTE PRESSURE DECANTER 1" };
        public static string[] allarme_pressione_sansa_decanter_1 = { "ALLARME PRESSIONE SANSA DECANTER 1", "ALARM INPUT OLIVE RESIDUES PRESSURE DECANTER 1", "ALARM INPUT OLIVE RESIDUES PRESSURE DECANTER 1" };
        public static string[] allarme_temperatura_olio_decanter_2 = { "ALLARME TEMPERATURA OLIO DECANTER 2", "ALARM OIL TEMPERATURE DECANTER 2", "ALARM OIL TEMPERATURE DECANTER 2" };
        public static string[] allarme_temperatura_pasta_decanter_2 = { "ALLARME TEMPERATURA PASTA DECANTER 2", "ALARM PASTE TEMPERATURE DECANTER 2", "ALARM PASTE TEMPERATURE DECANTER 2" };
        public static string[] allarme_potenza_decanter_2 = { "ALLARME POTENZA DECANTER 2", "ALARM POWER DECANTER 2", "ALARM POWER DECANTER 2" };
        public static string[] allarme_pressione_ingresso_pasta_decanter_2 = { "ALLARME PRESSIONE INGRESSO PASTA DECANTER 2", "ALARM INPUT PASTE PRESSURE DECANTER 2", "ALARM INPUT PASTE PRESSURE DECANTER 2" };
        public static string[] allarme_pressione_sansa_decanter_2 = { "ALLARME PRESSIONE SANSA DECANTER 2", "ALARM INPUT OLIVE RESIDUES PRESSURE DECANTER 2", "ALARM INPUT OLIVE RESIDUES PRESSURE DECANTER 2" };
        public static string[] anomalia_centralina_fr1 = { "ANOMALIA CENTRALINA FR1", "CONTROL UNIT FAULT FR1", "CONTROL UNIT FAULT FR1" };
        public static string[] anomalia_centralina_dec1 = { "ANOMALIA CENTRALINA DEC1", "CONTROL UNIT FAULT DEC1", "CONTROL UNIT FAULT DEC1" };
        public static string[] anomalia_centralina_dec2 = { "ANOMALIA CENTRALINA DEC2", "CONTROL UNIT FAULT DEC2", "CONTROL UNIT FAULT DEC2" };
        public static string[] emergenza_quadro = { "EMERGENZA_QUADRO", "CABINET EMERGENCY", "CABINET EMERGENCY" };
        public static string[] sicurezza_fr1 = { "SICUREZZA_FR1", "SAFETY FR1", "SAFETY FR1" };
        public static string[] sicurezza_g1 = { "SICUREZZA_G1", "SAFETY G1", "SAFETY G1" };
        public static string[] sicurezza_g2 = { "SICUREZZA_G2", "SAFETY G2", "SAFETY G2" };
        public static string[] sicurezza_g3 = { "SICUREZZA_G3", "SAFETY G3", "SAFETY G3" };
        public static string[] sicurezza_g4 = { "SICUREZZA_G4", "SAFETY G4", "SAFETY G4" };
        public static string[] sicurezza_d1 = { "SICUREZZA_D1", "SAFETY D1", "SAFETY D1" };
        public static string[] sicurezza_d2 = { "SICUREZZA_D2", "SAFETY D2", "SAFETY D2" };


        // Motors Alarms
        public static string[] contactor_forward_failure_to_reply = { "Mancata Risposta Contattore Diretto", "No Feedback Contactor Forward", "ILERI KONTAKTOR GERI DONUS HATA" };
        public static string[] contactor_reverse_failure_to_reply = { "Mancata Risposta Contattore Inverso", "No Feedback Contactor Reverse", "GERI KONTAKTOR GERI DONUS HATA" };
        public static string[] stuck_contactor_forward = { "Contattore Diretto Bloccato", "Contactor Forward Always On", "ILERI KONTACTOR BLOKAJI" };
        public static string[] stuck_contactor_reverse = { "Contattore Inverso Bloccato", "Contactor Reverse Always On", "GERI KONTAKTOR BLOKAJI" };
        public static string[] thermal_block = { "Blocco Termico", "Heat Block", "TERMIK BLOKAJ" };
        public static string[] local_breaker_open = { "Sezionatore Aperto", "Local Switch Open", "SECICI ACIK" };
        public static string[] first_sensor_overflow_to_prevent_end_clogging = { "Troppo Pieno Diretto", "Overflow Enegine Forward", "UST SEVIYE (GIRIS)" };
        public static string[] second_sensor_overflow_to_prevent_beginning_clogging = { "Troppo Pieno Inverso", "Overflow Enegine Reverse", "UST SEVIYE ( CIKIS)" };
        public static string[] sensor_control_rotation = { "Controllo Giri", "Speed Control", "DEVIR KONTROL" };
        public static string[] motor_running_to_much_to_reach_destination = { "Mancato posizionamento", "Motor running to much to reach destination", "Motor running to much to reach destination" };
        public static string[] single_safety_protection = { "Dispositivo di sicurezza", "Safety device", "EMNIYET UNITESI" };
        public static string[] fault_frequency_converter_or_softstart = { "Fault Inverter", "Fault Inverter", "INVERTOR HATA" };
        public static string[] overtravel_run_forward = { "Intervento Extracorsa Diretto", "Overtravel Forward", "Overtravel Forward" };
        public static string[] overtravel_run_reverse = { "Intervento Extracorsa Inverso", "Overtravel Reverse", "Overtravel Reverse" };
        public static string[] sensor_skid_up_position = { "Sensore di sbandamento in posizione sollevata", "Sensor skid up position", "Sensor skid up position" };
        public static string[] sensor_skid_down_position = { "Sensore di sbandamento in posizione abbassata", "Sensor skid down position", "Sensor skid down position" };
        public static string[] thermistor_motor_protection = { "Termistore", "Thermistor", "Thermistor" };


        // Valves Alarms
        public static string[] valve_failure_to_open = { "Allarme Apertura", "Alarm Open", "ACILMA ALARMI " };
        public static string[] valve_failure_to_close = { "Allarme Chiusura", "Alarm Close", "KAPANMA ALARMI" };
        public static string[] incoherence_position = { "Allarme Apertura/Chiusura", "Alarm Open/Close", "ACILMA/KAPANMA  ALARMI" };
        public static string[] loss_position = { "Mancata lettura posizione", "Loss Position", "POZISYON OKUMA HATASI" };
        public static string[] valve_failure_to_move = { "Valvola bloccata", "Valve failure to move", "Valve failure to move" };
        public static string[] allarme_8 = { "Allarme 8", "Alarm 8", "Alarm 8" };
        public static string[] allarme_9 = { "Allarme 9", "Alarm 9", "Alarm 9" };
        public static string[] allarme_10 = { "Allarme 10", "Alarm 10", "Alarm 10" };
        public static string[] allarme_11 = { "Allarme 11", "Alarm 11", "Alarm 11" };
        public static string[] allarme_12 = { "Allarme 12", "Alarm 12", "Alarm 12" };
        public static string[] allarme_13 = { "Allarme 13", "Alarm 13", "Alarm 13" };
        public static string[] allarme_14 = { "Allarme 14", "Alarm 14", "Alarm 14" };
        public static string[] allarme_15 = { "Allarme 15", "Alarm 15", "Alarm 15" };
        public static string[] allarme_16 = { "Allarme 16", "Alarm 16", "Alarm 16" };


    }
}
