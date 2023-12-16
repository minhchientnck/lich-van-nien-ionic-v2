import {
  IonCol,
  IonGrid,
  IonIcon,
  IonLabel,
  IonRow,
  createGesture,
} from "@ionic/react";
import CalendarUtil from "../utility/CalendarUtil";
import LunarSolarDate from "../utility/LunarSolarDate";
import { useEffect, useRef, useState } from "react";
import HeaderBar from "./HeaderBar";
import { notifications, timeSharp } from "ionicons/icons";

interface Props {
  lunarSolarDate: LunarSolarDate,
  month: number,
  year: number,
  onSelect: (date: LunarSolarDate) => () => void,
  onBackYear: () => void;
  onBackMonth: () => void;
  onForwardYear: () => void;
  onForwardMonth: () => void;
  onNow: () => void;
}

const MonthView: React.FC<Props> = ({
  lunarSolarDate,
  month,
  year,
  onSelect,
  onBackYear,
  onBackMonth,
  onForwardYear,
  onForwardMonth,
  onNow,
}) => {

  const [calendar, setCalendar] = useState<LunarSolarDate[][]>([]);

  useEffect(() => {
    (async () => {
      setCalendar((await CalendarUtil.getDatesFromMonth(month, year)));
    })();
  }, [lunarSolarDate, month, year]);


  const isSunday = (date: LunarSolarDate) => {
    return date.getSolarDate().getDay() === 0;
  }

  const isHoangDaoDate = (date: LunarSolarDate) => {
    return CalendarUtil.isHoangDaoDate(date);
  }

  const renderLunarDate = (date: LunarSolarDate) => {
    if (date.getSolarDate().getDate() === 1 && date.getLunarDate().getLdd() !== 1) {
      if (date.getLunarDate().getLeap() === 1) {
        return `${date.getLunarDate().getLdd()}/${date.getLunarDate().getLmm()}N`;
      } else if (CalendarUtil.isLackLunarMonth(date)) {
        return `${date.getLunarDate().getLdd()}/${date.getLunarDate().getLmm()}T`;
      } else {
        return `${date.getLunarDate().getLdd()}/${date.getLunarDate().getLmm()}Đ`;
      }
    } else if (date.getLunarDate().getLdd() === 1) {
      if (date.getLunarDate().getLeap() === 1) {
        return `${date.getLunarDate().getLdd()}/${date.getLunarDate().getLmm()}N`;
      } else if (CalendarUtil.isLackLunarMonth(date)) {
        return `${date.getLunarDate().getLdd()}/${date.getLunarDate().getLmm()}T`;
      } else {
        return `${date.getLunarDate().getLdd()}/${date.getLunarDate().getLmm()}Đ`;
      }
    }
    return date.getLunarDate().getLdd();
  };

  const isSelected = (date: LunarSolarDate) => {
    return date.getSolarDate().getDate() === lunarSolarDate.getSolarDate().getDate()
      && date.getSolarDate().getMonth() === lunarSolarDate.getSolarDate().getMonth()
      && date.getSolarDate().getFullYear() === lunarSolarDate.getSolarDate().getFullYear();
  }

  return (
    <IonGrid className="w-full">
      <IonRow>
        <IonCol className="h-[40px]">
          <HeaderBar
            onBackYear={onBackYear}
            onBackMonth={onBackMonth}
            onForwardMonth={onForwardMonth}
            onForwardYear={onForwardYear}
            onNow={onNow}
            title={`${CalendarUtil.formatNumber2Digits(month)}-${year}`}
          />
        </IonCol>
      </IonRow>
      <IonRow>
        {
          CalendarUtil.ShortDayStrings.map((d, i: number) =>
          (<IonCol
            key={i}
            className="text-center text-[20px] border-l-[2px] border-t-[2px] last:border-r-[2px] border-[#ceef89] bg-[#006a13] text-[#fff] h-[40px]"
          >
            {d[0]}
          </IonCol>))
        }
      </IonRow>
      {
        calendar.map((row: LunarSolarDate[], i: number) => (<IonRow key={i} className="last:border-b-[2px] border-[#ceef89]">
          {
            row.map((col: LunarSolarDate, j: number) => (<IonCol
              key={j}
              className="text-center border-l-[2px] border-t-[2px] last:border-r-[2px] border-[#ceef89] h-[55px] p-0"
              onClick={onSelect(col)}
            >
              {
                col ? (<div className={`flex flex-col relative font-[500] h-[53px] ${isSelected(col) ? 'bg-[#ffdf15]' : ''}`}>
                  <span className={`absolute top-[3px] left-[3px] rounded-full block h-[5px] w-[5px] ${isHoangDaoDate(col) ? 'bg-[#ff0000]' : 'bg-black'} `} />
                  <IonLabel className={`solar relative text-[20px] ${isSunday(col) ? 'text-[#ff0000]' : ''}`}>
                    {CalendarUtil.formatNumber2Digits(col.convertSolarDateToArray()[0])}
                    <span className="absolute text-[#ff0000]">{CalendarUtil.getEventsFromDate(col).marked ? '*' : null}</span>
                  </IonLabel>
                  <IonLabel className="lunar text-[13px] text-[#687fc9]">
                    {renderLunarDate(col)}
                  </IonLabel>
                  {col.hasNotifications ? <IonIcon
                    className="absolute text-[11px] text-[#9b9b9b] left-[1px] top-[13px]"
                    icon={timeSharp}
                  /> : null}
                </div>) : null
              }
            </IonCol>))
          }
        </IonRow>))
      }
    </IonGrid>)
};
export default MonthView;
