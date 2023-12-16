import { IonButton, IonButtons, IonCol, IonContent, IonDatetimeButton, IonGrid, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonList, IonModal, IonPage, IonRouterOutlet, IonRow, IonTitle, IonToolbar } from "@ionic/react";
import React, { useEffect, useState } from "react";
import LunarSolarDate from "../utility/LunarSolarDate";
import CalendarUtil from "../utility/CalendarUtil";
import MonthView from "./MonthView";
import DayView from "./DayView";
import AddEventAlarm from "./AddEventAlarm";
import { IonReactRouter } from "@ionic/react-router";
import { Redirect, Route } from "react-router";


const MainView: React.FC = () => {
  const [lunarSolarDate, setLunarSolarDate] = useState(new LunarSolarDate());
  const [selectedMonth, setSelectedMonth] = useState(lunarSolarDate.convertSolarDateToArray()[1]);
  const [selectedYear, setSelectedYear] = useState(lunarSolarDate.convertSolarDateToArray()[2]);
  const [isOpenAddEvent, setOpenAddEvent] = useState(false);

  useEffect(() => {
    const lunarSolarDate = new LunarSolarDate();
    const [dd, mm, yy, dw, tz] = lunarSolarDate.convertSolarDateToArray();
    setLunarSolarDate(lunarSolarDate);
    setSelectedMonth(mm);
    setSelectedYear(yy);
  }, []);

  const onBackYear = () => {
    let mm: number = selectedMonth;
    let yy: number = selectedYear;
    yy--;
    if (yy < 1900) yy = 1900;
    setSelectedMonth(mm);
    setSelectedYear(yy);
  };

  const onBackMonth = () => {
    let mm: number = selectedMonth;
    let yy: number = selectedYear;
    mm--;
    if (mm < 1) {
      mm = 12;
      yy--;
    }
    setSelectedMonth(mm);
    setSelectedYear(yy);
  };

  const onForwardMonth = () => {
    let mm: number = selectedMonth;
    let yy: number = selectedYear;
    mm++;
    if (mm > 12) {
      mm = mm % 12;
      yy++;
    }
    setSelectedMonth(mm);
    setSelectedYear(yy);
  };

  const onForwardYear = () => {
    let mm: number = selectedMonth;
    let yy: number = selectedYear;
    yy++;
    if (yy > 3000) yy = 3000;
    setSelectedMonth(mm);
    setSelectedYear(yy);
  };

  const onNow = () => {
    let d = new LunarSolarDate();
    setLunarSolarDate(d);
    let [dd, mm, yy, dw, tz] = d.convertSolarDateToArray();
    setSelectedMonth(mm);
    setSelectedYear(yy);
  };

  const onSelect = (date: LunarSolarDate) => () => {
    if (!date) return;
    setLunarSolarDate(date);
  }

  return (<IonPage>
    {isOpenAddEvent ?
      <AddEventAlarm
        onOpenAddEvent={setOpenAddEvent}
        lunarSolarDate={lunarSolarDate}
      /> : <React.Fragment>
        <DayView
          lunarSolarDate={lunarSolarDate}
          onOpenAddEvent={setOpenAddEvent}
        />
        <MonthView
          lunarSolarDate={lunarSolarDate}
          month={selectedMonth}
          year={selectedYear}
          onSelect={onSelect}
          onBackYear={onBackYear}
          onBackMonth={onBackMonth}
          onForwardMonth={onForwardMonth}
          onForwardYear={onForwardYear}
          onNow={onNow}
        />
      </React.Fragment>}
  </IonPage>)
};

export default MainView;
