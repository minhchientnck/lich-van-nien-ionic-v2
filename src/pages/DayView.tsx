import { IonAccordion, IonCol, IonContent, IonLabel, IonPage, IonRow } from "@ionic/react";
import LunarSolarDate from "../utility/LunarSolarDate";
import CalendarUtil from "../utility/CalendarUtil";
import { Link } from "react-router-dom";

interface Props {
  lunarSolarDate: LunarSolarDate,
  onOpenAddEvent: any,
}

const DayView: React.FC<Props> = ({
  lunarSolarDate,
  onOpenAddEvent,
}) => {

  const isLackMonth = () => CalendarUtil.isLackLunarMonth(lunarSolarDate) ? ['T', '平 '] : ['Đ', '大 '];
  const isLeapMonth = () => lunarSolarDate.getLunarDate().getLeap() === 1 ? ['Nhuận', '闰 '] : [];
  const [dd, mm, yy, dw, tz] = lunarSolarDate.convertSolarDateToArray();
  const [ldd, lmm, lyy, leap] = lunarSolarDate.getLunarDate().convertLunarDateToArray();
  const goodcontent = CalendarUtil.getGoodSentence(lunarSolarDate);
  const events = CalendarUtil.getEventsFromDate(lunarSolarDate);

  return (
    <div className="flex flex-col justify-center items-center m-[4px] mt-[0px] mb-[0px] pt-2 px-4 h-full bg-dayview">
      <div className="flex flex-col justify-center items-center w-full text-[#ff0000]">
        <div className="flex justify-center items-center w-full text-[13px]">
          <IonLabel className="uppercase block w-1/3">{CalendarUtil.MonthStrings[mm - 1][1]}</IonLabel>
          <IonLabel className="text-center block w-1/3">{yy}</IonLabel>
          <IonLabel className="uppercase block w-1/3 text-right">{CalendarUtil.MonthStrings[mm - 1][0]}</IonLabel>
        </div>
        <div className="flex justify-center items-center w-full">
          <IonLabel onClick={() => onOpenAddEvent(true)} className="text-[3.5rem] text-[#ff0000] font-bold leading-none">
            {dd}
          </IonLabel>
        </div>
        {events.eventsSolar.length === 0 ? (
          <div className="overflow-auto h-[50px]">
            <div className="flex flex-col items-center text-zinc-600 text-center text-[9px]">
              <p className="">{goodcontent.content}</p>
              <p className=""><i>-{goodcontent.author}-</i></p>
            </div>
          </div>) : null}
        {events.eventsSolar.length > 0 ? <div className="flex items-center h-[50px] text-[10px] text-center">{events.eventsSolar[0].name}</div> : null}
      </div>
      <div className="flex flex-col items-center w-full text-[10px]">
        <div className="flex justify-center items-center text-center text-white w-full bg-[#2d6902]">
          <div className="w-1/3">{CalendarUtil.FullDayStrings[dw][1]}</div>
          <div className="uppercase w-1/3">{CalendarUtil.FullDayStrings[dw][0]}</div>
          <div className="w-1/3">{CalendarUtil.FullDayStrings[dw][2]}</div>
        </div>
        <div className="flex justify-center items-center w-full">
          <div className="w-1/3 flex flex-col text-center">
            <IonLabel>Năm <b>{CalendarUtil.convertLunarYear2StemBranch(yy)[0]}</b></IonLabel>
            <IonLabel>Tháng <b>{CalendarUtil.convertLunarMonth2StemBranch(lmm, lyy)[0]}</b></IonLabel>
            <IonLabel>Ngày <b>{CalendarUtil.convertLunarDate2StemBranch(lunarSolarDate)[0]}</b></IonLabel>
            <IonLabel>Ngày {CalendarUtil.isHoangDaoDate(lunarSolarDate) ? <b className="text-[red]">Hoàng Đạo</b> : <b>Hắc Đạo</b>}</IonLabel>
            <IonLabel>Tiết khí <b>{CalendarUtil.getTietKhi(lunarSolarDate)[0]}</b></IonLabel>
          </div>
          <div className="w-1/3 text-center">
            <div className="text-[#0000ff] text-[2rem] text-center font-bold">{ldd}</div>
            <IonLabel className="text-[#0000ff] font-[500] text-[12px] block h-[40px]">
              {`Tháng ${CalendarUtil.LunarMonthStrings[lmm - 1][0]}`} {isLeapMonth()[0]} ({isLackMonth()[0]})
            </IonLabel>
          </div>
          <div className="w-1/3 flex flex-col text-center">
            <IonLabel>
              <b>{isLackMonth()[1]} {isLeapMonth()[1]} {CalendarUtil.LunarMonthStrings[lmm - 1][1]} {CalendarUtil.ChineseLunarDateStrings[ldd - 1]}</b>
            </IonLabel>
            <IonLabel>{CalendarUtil.convertLunarYear2StemBranch(yy)[1]} 年</IonLabel>
            <IonLabel>{CalendarUtil.convertLunarMonth2StemBranch(lmm, lyy)[1]} 月</IonLabel>
            <IonLabel>{CalendarUtil.convertLunarDate2StemBranch(lunarSolarDate)[1]} 日</IonLabel>
            <IonLabel>{CalendarUtil.getTietKhi(lunarSolarDate)[1]} 节 气</IonLabel>
          </div>
        </div>
        <div className="flex justify-center min-h-[20px] items-center w-full">
          <p className="text-[red]">{events.eventsLunar.length > 0 ? events.eventsLunar[0].description : null}</p>
        </div>
        <div className="flex flex-col justify-center items-center w-full text-[9px]">
          <span><b>Giờ Hoàng Đạo</b></span>
          {CalendarUtil.getHoangDaoTimes(lunarSolarDate).map((row, i) => (<div key={i} className="flex  justify-center w-full">
            {row.map((cell, j) => <IonLabel key={j} className="w-full text-center">{cell}</IonLabel>)}
          </div>))}
        </div>
      </div>
    </div>);
}

export default DayView;