import { IonButton, IonButtons, IonHeader, IonIcon, IonLabel, IonToolbar } from "@ionic/react";
import {
  playBackCircleSharp, playForwardCircleSharp,
  chevronBack, chevronForward,
} from 'ionicons/icons';

const backMonthIcon = chevronBack;
const backYearIcon = playBackCircleSharp;
const forwardMonthIcon = chevronForward;
const forwardYearIcon = playForwardCircleSharp;

interface Props {
  onBackYear: () => void;
  onBackMonth: () => void;
  onForwardYear: () => void;
  onForwardMonth: () => void;
  onNow: () => void;
  title: string
}

const HeaderBar: React.FC<Props> = ({
  onBackYear,
  onBackMonth,
  onForwardYear,
  onForwardMonth,
  onNow,
  title,
}) => (
  <IonButtons class="w-full flex justify-between items-center">
    <IonButton onClick={onBackYear}>
      <IonIcon className="text-[20px]" icon={backYearIcon} ></IonIcon>
    </IonButton>
    <IonButton onClick={onBackMonth}>
      <IonIcon className="text-[20px]" icon={backMonthIcon} ></IonIcon>
    </IonButton>
    <IonButton onClick={onNow}>
      <IonLabel className="text-[20px]">{title}</IonLabel>
    </IonButton>
    <IonButton onClick={onForwardMonth}>
      <IonIcon className="text-[20px]" icon={forwardMonthIcon} ></IonIcon>
    </IonButton>
    <IonButton onClick={onForwardYear}>
      <IonIcon className="text-[20px]" icon={forwardYearIcon} ></IonIcon>
    </IonButton>
  </IonButtons>
);

export default HeaderBar;
