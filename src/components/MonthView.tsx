import {
  IonCol,
  IonGrid,
  IonIcon,
  IonLabel,
  IonRow,
} from "@ionic/react";
import { useEffect, useState } from "react";
import HeaderBar from "./HeaderBar";
import { timeSharp } from "ionicons/icons";
import LunarSolarCalendar from "../utility/LunarSolarCalendar";
import LunarSolarDate from "../utility/LunarSolarDate";
import Constant from "../utility/Constants";
import Storage from "../Storage";
import { ITask } from "./TaskList";

interface Props {
  lunarSolarDate: LunarSolarDate,
  month: number,
  year: number,
  setLunarSolarDate: any,
  setSelectedMonth: any,
  setSelectedYear: any,
  onSelectDate: (date: LunarSolarDate | null) => () => void,
}

const MonthView: React.FC<Props> = (props) => {

  const [calendar, setCalendar] = useState<Array<Array<LunarSolarDate | null>>>([]);

  useEffect(() => {
    (async () => {
      setCalendar((await buildMonView()));
    })();
  }, [props.lunarSolarDate, props.month, props.year]);

  const buildMonView = async () => {
    const lunarSolarDates = new LunarSolarCalendar(props.month, props.year)
      .buildMonth()
      .map(async date => {
        if (date) {
          const tasks: Array<ITask> = await getTaskByDate(date);
          if (tasks.length > 0) {
            date.hasTask = true;
            return date;
          }
          date.hasTask = false;
          return date;
        }
        return date;
      });

    const calendar: Array<Array<LunarSolarDate | null>> = [];
    for (let i = 0; i < 6; i++) {
      calendar[i] = (await Promise.all(lunarSolarDates)).slice(i * 7, 7 * i + 7);
    }
    return calendar;
  }

  const getTaskByDate = async (date: LunarSolarDate) => {
    const dd = date.solarDate.getDate();
    const mm = date.solarDate.getMonth() + 1;
    const yy = date.solarDate.getFullYear();
    return (await Storage.get(`${yy}_${mm}_${dd}`));
  };

  const renderLunarDate = (date: LunarSolarDate) => {
    if (date.solarDate.getDate() === 1 && date.lunarDate.ldd !== 1) {
      if (date.lunarDate.leap === 1) {
        return `${date.lunarDate.ldd}/${date.lunarDate.lmm}N`;
      } else if (date.lunarDate.isLackMonth) {
        return `${date.lunarDate.ldd}/${date.lunarDate.lmm}T`;
      } else {
        return `${date.lunarDate.ldd}/${date.lunarDate.lmm}Đ`;
      }
    } else if (date.lunarDate.ldd === 1) {
      if (date.lunarDate.leap === 1) {
        return `${date.lunarDate.ldd}/${date.lunarDate.lmm}N`;
      } else if (date.lunarDate.isLackMonth) {
        return `${date.lunarDate.ldd}/${date.lunarDate.lmm}T`;
      } else {
        return `${date.lunarDate.ldd}/${date.lunarDate.lmm}Đ`;
      }
    }
    return date.lunarDate.ldd;
  };

  const isSelected = (date: LunarSolarDate | null) => {
    if (!date) return;
    return date.solarDate.getDate() === props.lunarSolarDate.solarDate.getDate()
      && date.solarDate.getMonth() === props.lunarSolarDate.solarDate.getMonth()
      && date.solarDate.getFullYear() === props.lunarSolarDate.solarDate.getFullYear();
  }

  return (
    <IonGrid className="w-full">
      <IonRow>
        <IonCol className="h-[40px]">
          <HeaderBar
            lunarSolarDate={props.lunarSolarDate}
            month={props.month}
            year={props.year}
            setLunarSolarDate={props.setLunarSolarDate}
            setSelectedMonth={props.setSelectedMonth}
            setSelectedYear={props.setSelectedYear}
          />
        </IonCol>
      </IonRow>
      <IonRow>
        {Constant.DAY_TO_SHORT_STRING.map((d, i: number) =>
        (<IonCol
          key={i}
          className="text-center text-[20px] border-l-[2px] border-t-[2px] last:border-r-[2px] border-[#ceef89] bg-[#006a13] text-[#fff] h-[40px]"
        >
          {d[0]}
        </IonCol>))}
      </IonRow>
      {calendar.map((row, i) => (<IonRow key={i} className="last:border-b-[2px] border-[#ceef89]">
        {row.map((date, i) => <IonCol key={i}
          className={`text-center border-l-[2px] border-t-[2px] last:border-r-[2px] border-[#ceef89] h-[55px] p-0 ${isSelected(date) ? 'bg-[#ffdf15]' : ''}`}
          onClick={props.onSelectDate(date)}
        >
          {date ? <div className={`flex flex-col relative font-[500] h-[53px]`}>
            <span className={`absolute top-[3px] left-[3px] rounded-full block h-[5px] w-[5px] ${date.lunarDate.isEclipticDay ? 'bg-[#ff0000]' : 'bg-black'}`} />
            <IonLabel
              className={`solar relative text-[20px] ${date.isSunday ? 'text-[#ff0000]' : ''}`}>
              {date.solarDate.getDate()}
              <span className="absolute text-[#ff0000]">
                {date.asterisk || date.lunarDate.asterisk ? '*' : null}
              </span>
            </IonLabel>
            <IonLabel className="lunar text-[13px] text-[#687fc9]">
              {renderLunarDate(date)}
            </IonLabel>
            {
              date.hasTask ? <IonIcon
                className="absolute text-[11px] text-[#9b9b9b] left-[1px] top-[13px]"
                icon={timeSharp}
              /> : null
            }
          </div> : null}
        </IonCol>)}
      </IonRow>))}
    </IonGrid>)
};
export default MonthView;
