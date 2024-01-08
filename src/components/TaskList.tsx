import { IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonLabel, IonModal, IonPage, IonTitle, IonToolbar } from "@ionic/react";
import { add, arrowBack, pencil, trash } from "ionicons/icons";
import { useEffect, useState } from "react";
import LunarSolarDate from "../utility/LunarSolarDate";
import QuatityInput from "./QuatityInput";
import NumberFormat from "../utility/NumberFormat";
import Storage from "../Storage";
import { v4 as uuidv4 } from "uuid";

interface Props {
  lunarSolarDate: LunarSolarDate,
  onOpenTaskList: any,
}

export interface ITask {
  id?: string,
  date?: string,
  hours?: number,
  minutes?: number,
  title?: string,
  timestamp?: number,
}

const defaultTask: ITask = {
  hours: 0,
  minutes: 0,
  title: 'Tiêu đề công việc',
};

const TaskList: React.FC<Props> = (props) => {

  const [tasks, setTasks] = useState<Array<ITask>>([]);
  const [selectedTask, setSelectedTask] = useState<ITask>(defaultTask);
  const [isEditTask, setEditTask] = useState(false);
  const [isOpenModal, setOpenModal] = useState(false);

  useEffect(() => {
    (async () => {
      setTasks((await getTasks()));
    })();
  }, [props.lunarSolarDate]);

  const onChangeEventTitle = (event: any) => {
    setSelectedTask({
      ...selectedTask,
      title: event.target.value,
    });
  }

  const onFocusEventTitle = () => {
    setSelectedTask({
      ...selectedTask,
      title: '',
    });
  }

  const onChangeHours = (_value: number) => {
    setSelectedTask({
      ...selectedTask,
      hours: _value,
    });
  }

  const onChangeMinutes = (_value: number) => {
    setSelectedTask({
      ...selectedTask,
      minutes: _value,
    });
  }

  const backToMainView = () => {
    setSelectedTask(defaultTask);
    props.onOpenTaskList(false);
  }

  const onCloseModal = () => {
    setOpenModal(false);
    setEditTask(false);
    setSelectedTask(defaultTask);
  }

  const onConfirm = async () => {
    if (isEditTask) {
      await handleEditTask();
    } else {
      await handleAddTask();
    }
    setOpenModal(false);
    setEditTask(false);
    setSelectedTask(defaultTask);
    return;
  }

  const handleAddTask = async () => {
    const existedTasks: Array<ITask> = await getTasks();
    existedTasks.push({
      id: uuidv4(),
      title: selectedTask.title,
      hours: selectedTask.hours,
      minutes: selectedTask.minutes
    });
    setTasks(existedTasks);
    const dd = props.lunarSolarDate.solarDate.getDate();
    const mm = props.lunarSolarDate.solarDate.getMonth() + 1;
    const yy = props.lunarSolarDate.solarDate.getFullYear();
    await Storage.set(`${yy}_${mm}_${dd}`, existedTasks);
  }

  const handleEditTask = async () => {
    const existedTasks: Array<ITask> = await getTasks();
    const index = existedTasks.findIndex(t => t.id === selectedTask.id);
    existedTasks[index].hours = selectedTask.hours;
    existedTasks[index].minutes = selectedTask.minutes;
    existedTasks[index].title = selectedTask.title;
    setTasks(existedTasks);
    const dd = props.lunarSolarDate.solarDate.getDate();
    const mm = props.lunarSolarDate.solarDate.getMonth() + 1;
    const yy = props.lunarSolarDate.solarDate.getFullYear();
    await Storage.set(`${yy}_${mm}_${dd}`, existedTasks);
  }

  const editTask = (task: ITask) => async () => {
    setOpenModal(true);
    setEditTask(true);
    setSelectedTask(task);
  }

  const deleteTask = (id: string) => async () => {
    const existedTasks: Array<ITask> = await getTasks();
    const updatedTasks = existedTasks.filter((t: ITask) => t.id !== id);
    setTasks(updatedTasks);
    const dd = props.lunarSolarDate.solarDate.getDate();
    const mm = props.lunarSolarDate.solarDate.getMonth() + 1;
    const yy = props.lunarSolarDate.solarDate.getFullYear();
    await Storage.set(`${yy}_${mm}_${dd}`, updatedTasks);
  }

  const getTasks = async () => {
    const dd = props.lunarSolarDate.solarDate.getDate();
    const mm = props.lunarSolarDate.solarDate.getMonth() + 1;
    const yy = props.lunarSolarDate.solarDate.getFullYear();
    return (await Storage.get(`${yy}_${mm}_${dd}`));
  };

  return (<IonPage>

    <IonHeader>
      <IonToolbar>
        <IonButtons slot="start">
          <IonButton strong={true} onClick={backToMainView}>
            <IonIcon className="text-[1rem]" icon={arrowBack} />
          </IonButton>
        </IonButtons>
        <IonTitle className="text-center">Danh sách công việc</IonTitle>
        <IonButtons slot="end" className="w-[35px]">
        </IonButtons>
      </IonToolbar>
    </IonHeader>
    <IonContent>
      <div className="h-[calc(100%-44px)] overflow-auto">
        <div className="flex flex-col m-5">
          {tasks.map((t: ITask, i) => (<div key={i} className="flex items-center gap-1 h-12 shadow-md">
            <div className="w-2/5 text-center my-[2px] rounded-md">
              <IonLabel>{t.title}</IonLabel>
            </div>
            <div className="w-2/5 text-center my-[2px] rounded-md">
              <IonLabel>{`${NumberFormat.formatNumber2Digits(t.hours || 0)}:${NumberFormat.formatNumber2Digits(t.minutes || 0)}`}</IonLabel>
            </div>
            <div className="w-1/5 text-center my-[2px] rounded-md">
              <button className="m-2" onClick={editTask(t)}>
                <IonIcon className="text-[1rem]" icon={pencil} />
              </button>
              <button className="m-2" onClick={deleteTask(t.id || '')}>
                <IonIcon className="text-[1rem]" icon={trash} />
              </button>
            </div>
          </div>))}
        </div>
      </div>
      <div className="flex justify-center h-[44px]">
        <button onClick={() => setOpenModal(true)} className="bg-[#c1c1c1] text-white h-10 w-10 rounded-[999px]">
          <IonIcon size="large" icon={add}></IonIcon>
        </button >
      </div>
    </IonContent>
    <IonModal
      id="dialog"
      isOpen={isOpenModal}
      showBackdrop
      backdropDismiss={false}
    >
      <IonContent>
        <div className="flex flex-col justify-between h-full mx-2">
          <div className="flex justify-between rounded-md w-2/4 mx-auto">
            <div className="flex flex-col justify-center items-center">
              <QuatityInput
                min={0}
                max={23}
                onChange={onChangeHours}
                value={selectedTask.hours || 0}
              />
            </div>
            <div className="flex flex-col justify-center items-center">
              <QuatityInput
                min={0}
                max={59}
                onChange={onChangeMinutes}
                value={selectedTask.minutes || 0}
              />
            </div>
          </div>
          <div className="flex justify-center items-center m-2">
            <input
              className="h-10 w-full text-center rounded-md border-2 border-[#c1c1c1]"
              value={selectedTask.title}
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
  </IonPage>);
};


export default TaskList;