using CommunicationLib;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DeltafinaWebApp.Devices
{
    public class MotorModel
    {

        public string animal { get; set; }
        public string name { get; set; }
        public string description { get; set; }

        public TagsPLC ALM_FORWARD_OFF { get; set; }
        public TagsPLC ALM_REVERSE_OFF { get; set; }
        public TagsPLC ALM_FORWARD_STUCK { get; set; }
        public TagsPLC ALM_REVERSE_STUCK { get; set; }
        public TagsPLC ALM_THERMAL_BLOCK { get; set; }
        public TagsPLC ALM_BREAKER { get; set; }
        public TagsPLC ALM_OVERFLOW_FORWARD { get; set; }
        public TagsPLC ALM_OVERFLOW_REVERSE { get; set; }
        public TagsPLC ALM_CONTROL_ROTATION { get; set; }
        public TagsPLC ALM_SAFETY { get; set; }
        public TagsPLC ALM_FAULT_DEVICE { get; set; }
        public TagsPLC ALM_SKID { get; set; }
        public TagsPLC ALM_MAINTENANCE { get; set; }
        public TagsPLC ALM_PTC { get; set; }
        public TagsPLC ALM_FEED_INVERTER_ON { get; set; }
        public TagsPLC ALM_FEED_INVERTER_OFF { get; set; }
        public TagsPLC ALM_LIMIT_FORWARD { get; set; }
        public TagsPLC ALM_LIMIT_REVERSE { get; set; }
        public TagsPLC ALM_NO_AUT { get; set; }

        public TagsPLC FDB_FORWARD { get; set; }
        public TagsPLC FDB_REVERSE { get; set; }
        public TagsPLC FDB_THERMAL_BLOCK { get; set; }
        public TagsPLC FDB_BREAKER { get; set; }
        public TagsPLC FDB_OVERFLOW_FORWARD { get; set; }
        public TagsPLC FDB_OVERFLOW_REVERSE { get; set; }
        public TagsPLC FDB_CONTROL_ROTATION { get; set; }
        public TagsPLC FDB_PTC { get; set; }
        public TagsPLC FDB_SAFETY { get; set; }
        public TagsPLC FDB_LIMIT_FORWARD { get; set; }
        public TagsPLC FDB_LIMIT_REVERSE { get; set; }
        public TagsPLC FDB_FAULT_DEVICE { get; set; }
        public TagsPLC FDB_SKID { get; set; }
        public TagsPLC FDB_INV_ON { get; set; }

        public TagsPLC STATE { get; set; }

        public TagsPLC CMD_START_FORWARD { get; set; }
        public TagsPLC CMD_START_REVERSE { get; set; }
        public TagsPLC CMD_START { get; set; }
        public TagsPLC CMD_FWD_REV { get; set; }
        public TagsPLC CMD_STOP { get; set; }
        public TagsPLC CMD_MAN { get; set; }
        public TagsPLC CMD_SEMI { get; set; }
        public TagsPLC CMD_AUT { get; set; }
        public TagsPLC CMD_SIMULATION { get; set; }
        public TagsPLC CMD_JOG_FORWARD { get; set; }
        public TagsPLC CMD_JOG_REVERSE { get; set; }
        public TagsPLC CMD_RESET_ALARMS { get; set; }
        public TagsPLC CMD_RESET_STARTS_1 { get; set; }
        public TagsPLC CMD_RESET_STARTS_2 { get; set; }
        public TagsPLC CMD_RESET_TRIP_1 { get; set; }
        public TagsPLC CMD_RESET_TRIP_2 { get; set; }

        public TagsPLC CMD_DISABLE_THERMAL_BLOCK { get; set; }
        public TagsPLC CMD_DISABLE_CONTACTOR { get; set; }
        public TagsPLC CMD_DISABLE_BREAKER { get; set; }
        public TagsPLC CMD_DISABLE_CONTROL_ROTATION { get; set; }
        public TagsPLC CMD_DISABLE_SAFETY { get; set; }
        public TagsPLC CMD_FILTER_THERMAL_BLOCK { get; set; }
        public TagsPLC CMD_FILTER_BREAKER { get; set; }
        public TagsPLC CMD_FILTER_CONTROL_ROTATION { get; set; }
        public TagsPLC CMD_FILTER_SKID { get; set; }
        public TagsPLC CMD_FILTER_SAFETY { get; set; }

        public TagsPLC FDB_STARTS_TRIP_1 { get; set; }
        public TagsPLC FDB_STARTS_TRIP_2 { get; set; }
        public TagsPLC FDB_STARTS_TOT { get; set; }
        public TagsPLC FDB_TIME_TRIP_1 { get; set; }
        public TagsPLC FDB_TIME_TRIP_2 { get; set; }
        public TagsPLC FDB_TIME_TOT { get; set; }
        public TagsPLC SET_MAINTENANCE_THRESHOLD { get; set; }

        public TagsPLC CMD_SETPOINT { get; set; }
        public TagsPLC FDB_SPEED { get; set; }


        public MotorModel(string name, string description, TagsPLC[] tags, TagsPLC setpointTag = null, TagsPLC currentSpeedTag = null)
        {

            this.name = name;
            this.description = description;

            foreach (var x in tags)
            {
                if (x.NAME.Trim() == "FDB_ALM_FWD_OFF_" + name)
                    ALM_FORWARD_OFF = x;
                else if (x.NAME.Trim() == "FDB_ALM_REV_OFF_" + name)
                    ALM_REVERSE_OFF = x;
                else if (x.NAME.Trim() == "FDB_ALM_FWD_ON_" + name)
                    ALM_FORWARD_STUCK = x;
                else if (x.NAME.Trim() == "FDB_ALM_REV_ON_" + name)
                    ALM_REVERSE_STUCK = x;
                else if (x.NAME.Trim() == "FDB_ALM_Q_" + name)
                    ALM_THERMAL_BLOCK = x;
                else if (x.NAME.Trim() == "FDB_ALM_S_" + name)
                    ALM_BREAKER = x;
                else if (x.NAME.Trim() == "FDB_ALM_TP_FWD_" + name)
                    ALM_OVERFLOW_FORWARD = x;
                else if (x.NAME.Trim() == "FDB_ALM_TP_REV_" + name)
                    ALM_OVERFLOW_REVERSE = x;
                else if (x.NAME.Trim() == "FDB_ALM_CG_" + name)
                    ALM_CONTROL_ROTATION = x;
                else if (x.NAME.Trim() == "FDB_ALM_SIC_" + name)
                    ALM_SAFETY = x;
                else if (x.NAME.Trim() == "FDB_ALM_INV_" + name)
                    ALM_FAULT_DEVICE = x;
                else if (x.NAME.Trim() == "FDB_ALM_CS_" + name)
                    ALM_SKID = x;
                else if (x.NAME.Trim() == "FDB_ALM_MANUTENZIONE_" + name) // MANCA
                    ALM_MAINTENANCE = x;
                else if (x.NAME.Trim() == "FDB_ALM_PTC_" + name)
                    ALM_PTC = x;
                else if (x.NAME.Trim() == "FDB_ALM_FEED_INVERTER_ON_" + name) // MANCA
                    ALM_FEED_INVERTER_ON = x;
                else if (x.NAME.Trim() == "FDB_ALM_FEED_INVERTER_OFF_" + name) // MANCA
                    ALM_FEED_INVERTER_OFF = x;
                else if (x.NAME.Trim() == "FDB_ALM_EXTRACORSA_FWD_" + name)
                    ALM_LIMIT_FORWARD = x;
                else if (x.NAME.Trim() == "FDB_ALM_EXTRACORSA_REV_" + name)
                    ALM_LIMIT_REVERSE = x;
                else if (x.NAME.Trim() == "FDB_ALM_NOREADYAUT_" + name)
                    ALM_NO_AUT = x;

                else if (x.NAME.Trim() == "FDB_FWD_ON_" + name)
                    FDB_FORWARD = x;
                else if (x.NAME.Trim() == "FDB_REV_ON_" + name)
                    FDB_REVERSE = x;
                else if (x.NAME.Trim() == "FDB_Q_" + name)
                    FDB_THERMAL_BLOCK = x;
                else if (x.NAME.Trim() == "FDB_S_" + name)
                    FDB_BREAKER = x;
                else if (x.NAME.Trim() == "FDB_TP_FWD_" + name)
                    FDB_OVERFLOW_FORWARD = x;
                else if (x.NAME.Trim() == "FDB_TP_REV_" + name)
                    FDB_OVERFLOW_REVERSE = x;
                else if (x.NAME.Trim() == "FDB_CG_" + name)
                    FDB_CONTROL_ROTATION = x;
                else if (x.NAME.Trim() == "FDB_PTC_" + name)
                    FDB_PTC = x;
                else if (x.NAME.Trim() == "FDB_SIC_" + name)
                    FDB_SAFETY = x;
                else if (x.NAME.Trim() == "FDB_EXTRACORSA_FWD_" + name)
                    FDB_LIMIT_FORWARD = x;
                else if (x.NAME.Trim() == "FDB_EXTRACORSA_REV_" + name)
                    FDB_LIMIT_REVERSE = x;
                else if (x.NAME.Trim() == "FDB_INV_" + name) //MANCA
                    FDB_FAULT_DEVICE = x;
                else if (x.NAME.Trim() == "FDB_CS_" + name)
                    FDB_SKID = x;
                else if (x.NAME.Trim() == "FDB_INV_ON_" + name) //MANCA
                    FDB_INV_ON = x;

                else if (x.NAME.Trim() == "PLC_STATO_" + name)
                    STATE = x;

                else if (x.NAME.Trim() == "PC_START_" + name) //MANCA
                    CMD_START = x;
                else if (x.NAME.Trim() == "PC_FWD_REV_" + name)
                    CMD_FWD_REV = x;
                else if (x.NAME.Trim() == "PC_STOP_" + name)
                    CMD_STOP = x;
                else if (x.NAME.Trim() == "PC_MAN_" + name)
                    CMD_MAN = x;
                else if (x.NAME.Trim() == "PC_SEMIAUT_" + name)
                    CMD_SEMI = x;
                else if (x.NAME.Trim() == "PC_AUT_" + name)
                    CMD_AUT = x;
                else if (x.NAME.Trim() == "PC_Simula_" + name)
                    CMD_SIMULATION = x;
                else if (x.NAME.Trim() == "PC_JF_" + name)
                    CMD_JOG_FORWARD = x;
                else if (x.NAME.Trim() == "PC_JR_" + name)
                    CMD_JOG_REVERSE = x;
                else if (x.NAME.Trim() == "PC_R_ALARM_" + name)
                    CMD_RESET_ALARMS = x;
                else if (x.NAME.Trim() == "PC_R_STARTS1_" + name)
                    CMD_RESET_STARTS_1 = x;
                else if (x.NAME.Trim() == "PC_R_STARTS2_" + name)
                    CMD_RESET_STARTS_2 = x;
                else if (x.NAME.Trim() == "PC_R_TRIP1_" + name)
                    CMD_RESET_TRIP_1 = x;
                else if (x.NAME.Trim() == "PC_R_TRIP2_" + name)
                    CMD_RESET_TRIP_2 = x;

                else if (x.NAME.Trim() == "PC_Disab_AlmTermico_" + name)
                    CMD_DISABLE_THERMAL_BLOCK = x;
                else if (x.NAME.Trim() == "PC_Disab_AlmFdbContattore_" + name)
                    CMD_DISABLE_CONTACTOR = x;
                else if (x.NAME.Trim() == "PC_Disab_AlmSezionatore_" + name)
                    CMD_DISABLE_BREAKER = x;
                else if (x.NAME.Trim() == "PC_Disab_AlmCtrlGiri_" + name)
                    CMD_DISABLE_CONTROL_ROTATION = x;
                else if (x.NAME.Trim() == "PC_DIS_FUN_" + name)
                    CMD_DISABLE_SAFETY = x;
                else if (x.NAME.Trim() == "PC_BYP_Q_" + name)
                    CMD_FILTER_THERMAL_BLOCK = x;
                else if (x.NAME.Trim() == "PC_BYP_S_" + name)
                    CMD_FILTER_BREAKER = x;
                else if (x.NAME.Trim() == "PC_BYP_CG_" + name)
                    CMD_FILTER_CONTROL_ROTATION = x;
                else if (x.NAME.Trim() == "PC_BYP_CS_" + name)
                    CMD_FILTER_SKID = x;
                else if (x.NAME.Trim() == "PC_BYP_FUN_" + name)
                    CMD_FILTER_SAFETY = x;

                else if (x.NAME.Trim() == "CONTAPARTENZE_PARZ1_" + name)
                    FDB_STARTS_TRIP_1 = x;
                else if (x.NAME.Trim() == "CONTAPARTENZE_PARZ2_" + name)
                    FDB_STARTS_TRIP_2 = x;
                else if (x.NAME.Trim() == "CONTAPARTENZE_TOT_" + name)
                    FDB_STARTS_TOT = x;
                else if (x.NAME.Trim() == "CONTAORE_PARZ1_" + name)
                    FDB_TIME_TRIP_1 = x;
                else if (x.NAME.Trim() == "CONTAORE_PARZ2_" + name)
                    FDB_TIME_TRIP_2 = x;
                else if (x.NAME.Trim() == "CONTAORE_TOT_" + name)
                    FDB_TIME_TOT = x;
                else if (x.NAME.Trim() == "SOGLIA_" + name)
                    SET_MAINTENANCE_THRESHOLD = x;

            }

            //this.ALM_FORWARD_OFF = tags.filter(x => "FDB_ALM_FWD_OFF_" + name == x.NAME.Trim())[0];
            //this.ALM_REVERSE_OFF = tags.filter(x => "FDB_ALM_REV_OFF_" + name == x.NAME.Trim())[0];
            //this.ALM_FORWARD_STUCK = tags.filter(x => "FDB_ALM_FWD_ON_" + name == x.NAME.Trim())[0];
            //this.ALM_REVERSE_STUCK = tags.filter(x => "FDB_ALM_REV_ON_" + name == x.NAME.Trim())[0];
            //this.ALM_THERMAL_BLOCK = tags.filter(x => "FDB_ALM_TERMICO_" + name == x.NAME.Trim())[0];
            //this.ALM_BREAKER = tags.filter(x => "FDB_ALM_SEZ_" + name == x.NAME.Trim())[0];
            //this.ALM_OVERFLOW_FORWARD = tags.filter(x => "FDB_ALM_TP_FWD_" + name == x.NAME.Trim())[0];
            //this.ALM_OVERFLOW_REVERSE = tags.filter(x => "FDB_ALM_TP_REV_" + name == x.NAME.Trim())[0];
            //this.ALM_CONTROL_ROTATION = tags.filter(x => "FDB_ALM_CG_" + name == x.NAME.Trim())[0];
            //this.ALM_SAFETY = tags.filter(x => "FDB_ALM_SIC_LOC_" + name == x.NAME.Trim())[0];
            //this.ALM_FAULT_DEVICE = tags.filter(x => "FDB_ALM_INV_FAULT_" + name == x.NAME.Trim())[0];
            //this.ALM_SKID = tags.filter(x => "FDB_ALM_CS_" + name == x.NAME.Trim())[0];
            //this.ALM_MAINTENANCE = tags.filter(x => "FDB_ALM_MANUTENZIONE_" + name == x.NAME.Trim())[0];
            //this.ALM_PTC = tags.filter(x => "FDB_ALM_PASTICCA_" + name == x.NAME.Trim())[0];
            //this.ALM_FEED_INVERTER_ON = tags.filter(x => "FDB_ALM_FEED_INVERTER_ON_" + name == x.NAME.Trim())[0];
            //this.ALM_FEED_INVERTER_OFF = tags.filter(x => "FDB_ALM_FEED_INVERTER_OFF_" + name == x.NAME.Trim())[0];
            //this.ALM_LIMIT_FORWARD = tags.filter(x => "FDB_ALM_EXTRACORSA_FWD_" + name == x.NAME.Trim())[0];
            //this.ALM_LIMIT_REVERSE = tags.filter(x => "FDB_ALM_EXTRACORSA_REV_" + name == x.NAME.Trim())[0];
            //this.ALM_NO_AUT = tags.filter(x => "FDB_ALM_NO_AUT_" + name == x.NAME.Trim())[0];

            //this.FDB_FORWARD = tags.filter(x => "FDB_FWD_ON_" + name == x.NAME.Trim())[0];
            //this.FDB_REVERSE = tags.filter(x => "FDB_REV_ON_" + name == x.NAME.Trim())[0];
            //this.FDB_THERMAL_BLOCK = tags.filter(x => "FDB_TERMICO_" + name == x.NAME.Trim())[0];
            //this.FDB_BREAKER = tags.filter(x => "FDB_SEZ_" + name == x.NAME.Trim())[0];
            //this.FDB_OVERFLOW_FORWARD = tags.filter(x => "FDB_TP_FWD_" + name == x.NAME.Trim())[0];
            //this.FDB_OVERFLOW_REVERSE = tags.filter(x => "FDB_TP_REV_" + name == x.NAME.Trim())[0];
            //this.FDB_CONTROL_ROTATION = tags.filter(x => "FDB_CG_" + name == x.NAME.Trim())[0];
            //this.FDB_PTC = tags.filter(x => "FDB_PASTICCA_" + name == x.NAME.Trim())[0];
            //this.FDB_SAFETY = tags.filter(x => "FDB_SIC_LOC_" + name == x.NAME.Trim())[0];
            //this.FDB_LIMIT_FORWARD = tags.filter(x => "FDB_EXTRACORSA_FWD_" + name == x.NAME.Trim())[0];
            //this.FDB_LIMIT_REVERSE = tags.filter(x => "FDB_EXTRACORSA_REV_" + name == x.NAME.Trim())[0];
            //this.FDB_FAULT_DEVICE = tags.filter(x => "FDB_INV_FAULT_" + name == x.NAME.Trim())[0];
            //this.FDB_SKID = tags.filter(x => "FDB_CS_" + name == x.NAME.Trim())[0];
            //this.FDB_INV_ON = tags.filter(x => "FDB_INV_ON_" + name == x.NAME.Trim())[0];

            //this.STATE = tags.filter(x => "STATO_" + name == x.NAME.Trim())[0];

            //this.CMD_START = tags.filter(x => "PC_START_" + name == x.NAME.Trim())[0];
            //this.CMD_FWD_REV = tags.filter(x => "PC_FWD_REV_" + name == x.NAME.Trim())[0];
            //this.CMD_STOP = tags.filter(x => "PC_STOP_" + name == x.NAME.Trim())[0];
            //this.CMD_MAN = tags.filter(x => "PC_MAN_" + name == x.NAME.Trim())[0];
            //this.CMD_SEMI = tags.filter(x => "PC_SEMIAUT_" + name == x.NAME.Trim())[0];
            //this.CMD_AUT = tags.filter(x => "PC_AUT_" + name == x.NAME.Trim())[0];
            //this.CMD_SIMULATION = tags.filter(x => "PC_SIMULA_" + name == x.NAME.Trim())[0];
            //this.CMD_JOG_FORWARD = tags.filter(x => "PC_JF_" + name == x.NAME.Trim())[0];
            //this.CMD_JOG_REVERSE = tags.filter(x => "PC_JR_" + name == x.NAME.Trim())[0];
            //this.CMD_RESET_ALARMS = tags.filter(x => "PC_R_ALARM_" + name == x.NAME.Trim())[0];
            //this.CMD_RESET_STARTS_1 = tags.filter(x => "PC_R_STARTS1_" + name == x.NAME.Trim())[0];
            //this.CMD_RESET_STARTS_2 = tags.filter(x => "PC_R_STARTS2_" + name == x.NAME.Trim())[0];
            //this.CMD_RESET_TRIP_1 = tags.filter(x => "PC_R_TRIP1_" + name == x.NAME.Trim())[0];
            //this.CMD_RESET_TRIP_2 = tags.filter(x => "PC_R_TRIP2_" + name == x.NAME.Trim())[0];

            //this.CMD_DISABLE_THERMAL_BLOCK = tags.filter(x => "PC_DIS_Q_" + name == x.NAME.Trim())[0];
            //this.CMD_DISABLE_CONTACTOR = tags.filter(x => "PC_DIS_K_" + name == x.NAME.Trim())[0];
            //this.CMD_DISABLE_BREAKER = tags.filter(x => "PC_DIS_S_" + name == x.NAME.Trim())[0];
            //this.CMD_DISABLE_CONTROL_ROTATION = tags.filter(x => "PC_DIS_CG_" + name == x.NAME.Trim())[0];
            //this.CMD_DISABLE_SAFETY = tags.filter(x => "PC_DIS_FUN_" + name == x.NAME.Trim())[0];
            //this.CMD_FILTER_THERMAL_BLOCK = tags.filter(x => "PC_BYP_Q_" + name == x.NAME.Trim())[0];
            //this.CMD_FILTER_BREAKER = tags.filter(x => "PC_BYP_S_" + name == x.NAME.Trim())[0];
            //this.CMD_FILTER_CONTROL_ROTATION = tags.filter(x => "PC_BYP_CG_" + name == x.NAME.Trim())[0];
            //this.CMD_FILTER_SKID = tags.filter(x => "PC_BYP_CS_" + name == x.NAME.Trim())[0];
            //this.CMD_FILTER_SAFETY = tags.filter(x => "PC_BYP_FUN_" + name == x.NAME.Trim())[0];

            //this.FDB_STARTS_TRIP_1 = tags.filter(x => "PARTENZE_TRIP1_" + name == x.NAME.Trim())[0];
            //this.FDB_STARTS_TRIP_2 = tags.filter(x => "PARTENZE_TRIP2_" + name == x.NAME.Trim())[0];
            //this.FDB_STARTS_TOT = tags.filter(x => "PARTENZE_TOT_" + name == x.NAME.Trim())[0];
            //this.FDB_TIME_TRIP_1 = tags.filter(x => "SECONDI_TRIP_1_" + name == x.NAME.Trim())[0];
            //this.FDB_TIME_TRIP_2 = tags.filter(x => "SECONDI_TRIP_2_" + name == x.NAME.Trim())[0];
            //this.FDB_TIME_TOT = tags.filter(x => "SECONDI_TOT_" + name == x.NAME.Trim())[0];
            //this.SET_MAINTENANCE_THRESHOLD = tags.filter(x => "SOGLIA_" + name == x.NAME.Trim())[0];

            this.CMD_SETPOINT = setpointTag;
            this.FDB_SPEED = currentSpeedTag;
        }

    }
}
