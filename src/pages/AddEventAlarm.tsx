import {
  IonButton,
  IonButtons,
  IonContent,
  IonFabButton,
  IonHeader,
  IonIcon,
  IonLabel,
  IonModal,
  IonPage,
  IonTitle,
  IonToolbar,
  useIonRouter,
} from "@ionic/react";
import { v4 as uuidv4 } from "uuid";
import QuatityInput from "../components/QuatityInput";
import { useEffect, useState } from "react";
import LunarSolarDate, { EventAlarm } from "../utility/LunarSolarDate";
import CalendarUtil from "../utility/CalendarUtil";
import { pencil, trash, arrowBack, add } from "ionicons/icons";
import Storage from "./Storage";

interface Props {
  lunarSolarDate: LunarSolarDate,
  onOpenAddEvent: any,
}

const AddEventAlarm: React.FC<Props> = ({
  lunarSolarDate,
  onOpenAddEvent,
}) => {
  const router = useIonRouter();
  const [events, setEvents] = useState<EventAlarm[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<EventAlarm>({
    hours: 0,
    minutes: 0,
    title: 'Tiêu đề sự kiện',
  });
  const [isEditEvent, setEditEvent] = useState(false);
  const [isOpen, setOpen] = useState(false);

  const getEvents = async () => {
    const [dd, mm, yy, dw, tz] = lunarSolarDate.convertSolarDateToArray();
    const events: EventAlarm[] = await Storage.get(`${yy}_${mm}_${dd}`);
    return events;
  };

  useEffect(() => {
    (async () => {
      setEvents((await getEvents()));
    })();
  }, [lunarSolarDate]);

  const onChangeEventTitle = (event: any) => {
    setSelectedEvent({
      ...selectedEvent,
      title: event.target.value,
    });
  }

  const onFocusEventTitle = () => {
    setSelectedEvent({
      ...selectedEvent,
      title: '',
    });
  }

  const onChangeHours = (_value: number) => {
    setSelectedEvent({
      ...selectedEvent,
      hours: _value,
    });
  }

  const onChangeMinutes = (_value: number) => {
    setSelectedEvent({
      ...selectedEvent,
      minutes: _value,
    });
  }

  const handleAddEvent = async () => {
    const [dd, mm, yy, dw, tz] = lunarSolarDate.convertSolarDateToArray();
    const existedEvents: EventAlarm[] = await getEvents();
    existedEvents.push({
      id: uuidv4(),
      title: selectedEvent.title,
      hours: selectedEvent.hours,
      minutes: selectedEvent.minutes
    });
    setEvents(existedEvents);
    await Storage.set(`${yy}_${mm}_${dd}`, existedEvents);
  }

  const handleEditEvent = async () => {
    const [dd, mm, yy, dw, tz] = lunarSolarDate.convertSolarDateToArray();
    const existedEvents: EventAlarm[] = await getEvents();
    const index = existedEvents.findIndex(e => e.id === selectedEvent.id);
    existedEvents[index].hours = selectedEvent.hours;
    existedEvents[index].minutes = selectedEvent.minutes;
    existedEvents[index].title = selectedEvent.title;
    setEvents(existedEvents);
    await Storage.set(`${yy}_${mm}_${dd}`, existedEvents);
  }

  const onConfirm = async () => {
    if (isEditEvent) {
      await handleEditEvent();
    } else {
      await handleAddEvent();
    }
    setOpen(false);
    setEditEvent(false);
    setSelectedEvent({
      hours: 0,
      minutes: 0,
      title: 'Tiêu đề sự kiện',
    });
    return;
  }

  const editEvent = (event: EventAlarm) => async () => {
    setEditEvent(true);
    setOpen(true);
    setSelectedEvent(event);
  }

  const onCloseModal = () => {
    setOpen(false);
    setEditEvent(false);
    setSelectedEvent({
      hours: 0,
      minutes: 0,
      title: 'Tiêu đề sự kiện',
    });
  }

  const backToMainView = () => {
    setSelectedEvent({
      hours: 0,
      minutes: 0,
      title: 'Tiêu đề sự kiện',
    });
    onOpenAddEvent(false);
  }

  const deleteEvent = (id: string) => async () => {
    const [dd, mm, yy, dw, tz] = lunarSolarDate.convertSolarDateToArray();
    const existedEvents: EventAlarm[] = await getEvents();
    const updatedEvents = existedEvents.filter((e: EventAlarm) => e.id !== id);
    setEvents(updatedEvents);
    await Storage.set(`${yy}_${mm}_${dd}`, updatedEvents);
  }

  return (<IonPage>
    <IonHeader>
      <IonToolbar>
        <IonButtons slot="start">
          <IonButton strong={true} onClick={backToMainView}>
            <IonIcon className="text-[1rem]" icon={arrowBack} />
          </IonButton>
        </IonButtons>
        <IonTitle className="text-center">Danh sách các sự kiện</IonTitle>
        <IonButtons slot="end" className="w-[35px]">
        </IonButtons>
      </IonToolbar>
    </IonHeader>
    <IonContent>
      <IonModal id="dialog" isOpen={isOpen} showBackdrop backdropDismiss={false}>
        <IonContent>
          <div className="flex flex-col justify-between h-full mx-2">
            <div className="flex justify-between rounded-md w-2/4 mx-auto">
              <div className="flex flex-col justify-center items-center">
                <QuatityInput min={0} max={23} onChange={onChangeHours} value={selectedEvent.hours || 0} />
              </div>
              <div className="flex flex-col justify-center items-center">
                <QuatityInput min={0} max={59} onChange={onChangeMinutes} value={selectedEvent.minutes || 0} />
              </div>
            </div>
            <div className="flex justify-center items-center m-2">
              <input
                className="h-10 w-full text-center rounded-md border-2 border-[#c1c1c1]"
                value={selectedEvent.title}
                onChange={onChangeEventTitle}
                onFocus={onFocusEventTitle}
              />
            </div>
            <div className="flex justify-between items-center m-2">
              <button onClick={onCloseModal} className="bg-[#c1c1c1] h-[42px] rounded-[8px] p-[10px]">Đóng</button>
              <button onClick={onConfirm} className="bg-[#c1c1c1] h-[42px] rounded-[8px] p-[10px]">Xác nhận</button>
            </div>
          </div>
        </IonContent>
      </IonModal>
      <div className="h-[calc(100%-44px)] overflow-auto">
        <div className="flex flex-col m-5">
          {events.map((e: EventAlarm, i) => (<div key={i} className="flex items-center gap-1 h-12 shadow-md">
            <div className="w-2/5 text-center my-[2px] rounded-md">
              <IonLabel>{e.title}</IonLabel>
            </div>
            <div className="w-2/5 text-center my-[2px] rounded-md">
              <IonLabel>{`${CalendarUtil.formatNumber2Digits(e.hours || 0)}:${CalendarUtil.formatNumber2Digits(e.minutes || 0)}`}</IonLabel>
            </div>
            <div className="w-1/5 text-center my-[2px] rounded-md">
              <button className="m-2" onClick={editEvent(e)}>
                <IonIcon className="text-[1rem]" icon={pencil} />
              </button>
              <button className="m-2" onClick={deleteEvent(e.id || '')}>
                <IonIcon className="text-[1rem]" icon={trash} />
              </button>
            </div>
          </div>))}
        </div>
      </div>
      <div className="flex justify-center h-[44px]">
        <button onClick={() => setOpen(true)} className="bg-[#c1c1c1] text-white h-10 w-10 rounded-[999px]">
          <IonIcon size="large" icon={add}></IonIcon>
        </button >
      </div>
    </IonContent>
  </IonPage>)
};

export default AddEventAlarm;
