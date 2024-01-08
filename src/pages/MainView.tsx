import React, { useEffect, useState } from "react";
import { IonPage } from "@ionic/react";
import MonthView from "../components/MonthView";
import DayView from "../components/DayView";
import LunarSolarDate from "../utility/LunarSolarDate";
import TaskList from "../components/TaskList";
import { isLackMonth } from "../utility/LunarSolarCalendar";


const MainView: React.FC = () => {
  const [lunarSolarDate, setLunarSolarDate] = useState(new LunarSolarDate());
  const [selectedMonth, setSelectedMonth] = useState(lunarSolarDate.solarDate.getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState(lunarSolarDate.solarDate.getFullYear());
  const [isOpenTaskList, setOpenTaskList] = useState(false);

  useEffect(() => {
    const lunarSolarDate = new LunarSolarDate();
    lunarSolarDate.lunarDate.isLackMonth = isLackMonth(lunarSolarDate);

    setLunarSolarDate(lunarSolarDate);
    setSelectedMonth(lunarSolarDate.solarDate.getMonth() + 1);
    setSelectedYear(lunarSolarDate.solarDate.getFullYear());
  }, []);

  const onSelect = (date: LunarSolarDate | null) => () => {
    if (!date) return;
    setLunarSolarDate(date);
  }

  return (<IonPage>
    {isOpenTaskList ?
      <TaskList
        onOpenTaskList={setOpenTaskList}
        lunarSolarDate={lunarSolarDate}
      /> :
      <React.Fragment>
        <DayView
          lunarSolarDate={lunarSolarDate}
          onOpenTaskList={setOpenTaskList}
        />
        <MonthView
          lunarSolarDate={lunarSolarDate}
          month={selectedMonth}
          year={selectedYear}
          setLunarSolarDate={setLunarSolarDate}
          setSelectedMonth={setSelectedMonth}
          setSelectedYear={setSelectedYear}
          onSelectDate={onSelect}
        />
      </React.Fragment>}
  </IonPage>)
};

export default MainView;
