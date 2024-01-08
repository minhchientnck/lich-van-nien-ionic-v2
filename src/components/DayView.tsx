import { IonLabel } from "@ionic/react";
import LunarSolarDate from "../utility/LunarSolarDate";

interface Props {
  lunarSolarDate: LunarSolarDate,
  onOpenTaskList: any,
}

const DayView: React.FC<Props> = (props) => {

  return (
    <div className="flex flex-col justify-center items-center m-[4px] mt-[0px] mb-[0px] pt-2 px-4 h-full bg-dayview">
      <div className="flex flex-col justify-center items-center w-full text-[#ff0000]">
        <div className="flex justify-center items-center w-full text-[13px]">
          <IonLabel className="uppercase block w-1/3">
            {props.lunarSolarDate.enMonthString}
          </IonLabel>
          <IonLabel className="text-center block w-1/3">
            {props.lunarSolarDate.solarDate.getFullYear()}
          </IonLabel>
          <IonLabel className="uppercase block w-1/3 text-right">
            {props.lunarSolarDate.viMonthString}
          </IonLabel>
        </div>
        <div className="flex justify-center items-center w-full">
          <IonLabel onClick={() => props.onOpenTaskList(true)} className="text-[3.5rem] text-[#ff0000] font-bold leading-none">
            {props.lunarSolarDate.solarDate.getDate()}
          </IonLabel>
        </div>
        {(props.lunarSolarDate.events && props.lunarSolarDate.events.length > 0) ?
          <div className="flex items-center h-[50px] text-[10px] text-center">
            {props.lunarSolarDate.events[0].name}
          </div> : <div className="overflow-auto h-[50px]">
            <div className="flex flex-col items-center text-zinc-600 text-center text-[9px]">
              <p className="">{props.lunarSolarDate.quotation?.content}</p>
              <p className=""><i>-{props.lunarSolarDate.quotation?.author}-</i></p>
            </div>
          </div>}
      </div>
      <div className="flex flex-col items-center w-full text-[10px]">
        <div className="flex justify-center items-center text-center text-white w-full h-6 bg-[#2d6902]">
          <div className="uppercase w-1/3">{props.lunarSolarDate.enDay}</div>
          <div className="uppercase w-1/3">{props.lunarSolarDate.viDay}</div>
          <div className="w-1/3">{props.lunarSolarDate.cnDay}</div>
        </div>
        <div className="flex justify-center items-center w-full">
          <div className="w-1/3 flex flex-col text-center">
            <IonLabel>Năm <b>{props.lunarSolarDate.lunarDate.viCanChiYy}</b></IonLabel>
            <IonLabel>Tháng <b>{props.lunarSolarDate.lunarDate.viCanChiMm}</b></IonLabel>
            <IonLabel>Ngày <b>{props.lunarSolarDate.lunarDate.viCanChiDd}</b></IonLabel>
            <IonLabel>Ngày {props.lunarSolarDate.lunarDate.isEclipticDay ? <b className="text-[red]">Hoàng Đạo</b> : <b>Hắc Đạo</b>}</IonLabel>
            <IonLabel>Tiết khí <b>{props.lunarSolarDate.lunarDate.viTietKhi}</b></IonLabel>
          </div>
          <div className="w-1/3 text-center">
            <div className="text-[#0000ff] text-[2rem] text-center font-bold">
              {props.lunarSolarDate.lunarDate.ldd}
            </div>
            <IonLabel className="text-[#0000ff] font-[500] text-[12px] block h-[40px]">
              {props.lunarSolarDate.lunarDate.lmmString}
              {props.lunarSolarDate.lunarDate.isLackMonth ? " (T)" : " (Đ)"}
            </IonLabel>
          </div>
          <div className="w-1/3 flex flex-col text-center">
            <IonLabel>
              <b>{props.lunarSolarDate.lunarDate.isLackMonth ?
                `平 ${props.lunarSolarDate.lunarDate.cnLddLmmCombined}`
                : `大 ${props.lunarSolarDate.lunarDate.cnLddLmmCombined}`
              }</b>
            </IonLabel>
            <IonLabel>{props.lunarSolarDate.lunarDate.cnCanChiYy}</IonLabel>
            <IonLabel>{props.lunarSolarDate.lunarDate.cnCanChiMm}</IonLabel>
            <IonLabel>{props.lunarSolarDate.lunarDate.cnCanChiDd}</IonLabel>
            <IonLabel>{props.lunarSolarDate.lunarDate.cnTietKhi}</IonLabel>
          </div>
        </div>
        <div className="flex justify-center min-h-[20px] items-center w-full">
          <p className="text-[red]">
            {(props.lunarSolarDate.lunarDate.events
              && props.lunarSolarDate.lunarDate.events.length > 0) ?
              props.lunarSolarDate.lunarDate.events[0].description : null}
          </p>
        </div>
        <div className="flex flex-col justify-center items-center w-full text-[9px]">
          <span><b>Giờ Hoàng Đạo</b></span>
          {props.lunarSolarDate.lunarDate.eclipticTimes ?
            <>
              <div className="flex justify-center w-full">
                {props.lunarSolarDate.lunarDate.eclipticTimes.slice(0, 3)
                  .map((value, i) => <IonLabel key={i} className="w-full text-center">{value}</IonLabel>)}
              </div>
              <div className="flex justify-center w-full">
                {props.lunarSolarDate.lunarDate.eclipticTimes.slice(3, 6)
                  .map((value, i) => <IonLabel key={i} className="w-full text-center">{value}</IonLabel>)}
              </div>
            </> : null}
        </div>
      </div>
    </div>);
}

export default DayView;