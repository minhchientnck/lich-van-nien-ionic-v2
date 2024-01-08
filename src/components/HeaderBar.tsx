import { IonButton, IonButtons, IonFabButton, IonHeader, IonIcon, IonLabel, IonToolbar } from "@ionic/react";
import {
  playBackCircleSharp, playForwardCircleSharp,
  chevronBack, chevronForward,

} from 'ionicons/icons';
import LunarSolarDate from "../utility/LunarSolarDate";
import { addIcons } from "ionicons";
import { isLackMonth } from "../utility/LunarSolarCalendar";

const backMonthIcon = chevronBack;
const backYearIcon = playBackCircleSharp;
const forwardMonthIcon = chevronForward;
const forwardYearIcon = playForwardCircleSharp;

interface Props {
  lunarSolarDate: LunarSolarDate
  month: number,
  year: number,
  setLunarSolarDate: any,
  setSelectedMonth: any,
  setSelectedYear: any,
}

addIcons({
  "angles-left": "angles-left.svg",
  "angles-right": "angles-right.svg",
  "angle-left": "angle-left.svg",
  "angle-right": "angle-right.svg",
});

const HeaderBar: React.FC<Props> = (props) => {

  const onBackYear = () => {
    let mm: number = props.month;
    let yy: number = props.year;
    yy--;
    if (yy < 1900) yy = 1900;
    props.setSelectedMonth(mm);
    props.setSelectedYear(yy);
  };

  const onBackMonth = () => {
    let mm: number = props.month;
    let yy: number = props.year;
    mm--;
    if (mm < 1) {
      mm = 12;
      yy--;
    }
    props.setSelectedMonth(mm);
    props.setSelectedYear(yy);
  };

  const onForwardMonth = () => {
    let mm: number = props.month;
    let yy: number = props.year;
    mm++;
    if (mm > 12) {
      mm = mm % 12;
      yy++;
    }
    props.setSelectedMonth(mm);
    props.setSelectedYear(yy);
  };

  const onForwardYear = () => {
    let mm: number = props.month;
    let yy: number = props.year;
    yy++;
    if (yy > 3000) yy = 3000;
    props.setSelectedMonth(mm);
    props.setSelectedYear(yy);
  };

  const onNow = () => {
    let currentDate = new LunarSolarDate();
    currentDate.lunarDate.isLackMonth = isLackMonth(currentDate);
    props.setLunarSolarDate(currentDate);
    props.setSelectedMonth(currentDate.solarDate.getMonth() + 1);
    props.setSelectedYear(currentDate.solarDate.getFullYear());
  };

  return (
    <IonButtons class="w-full flex justify-between items-center">
      <button className="active:bg-gray-200 active:rounded-full h-[35px] w-[35px]" onClick={onBackYear}>
        <IonIcon className="text-[20px]" icon="angles-left" />
      </button>
      <button className="active:bg-gray-200 active:rounded-full h-[35px] w-[35px]" onClick={onBackMonth}>
        <IonIcon className="text-[20px]" icon="angle-left" />
      </button>
      <button className="active:bg-gray-200 h-[35px] px-2 min-w-[100px]" onClick={onNow}>
        <IonLabel className="text-[20px]">{`${props.month}-${props.year}`}</IonLabel>
      </button>
      <button className="active:bg-gray-200 active:rounded-full h-[35px] w-[35px]" onClick={onForwardMonth}>
        <IonIcon className="text-[20px]" icon="angle-right" />
      </button>
      <button className="active:bg-gray-200 active:rounded-full h-[35px] w-[35px]" onClick={onForwardYear}>
        <IonIcon className="text-[20px]" icon="angles-right" />
      </button>
    </IonButtons>
  )
};

export default HeaderBar;
