import { IonIcon } from "@ionic/react";
import { add, remove } from 'ionicons/icons';
import { useEffect, useState } from "react";
import CalendarUtil from "../utility/CalendarUtil";


interface Props {
  value: number,
  min: number,
  max: number,
  onChange: (_value: number) => void,
};

const QuatityInput: React.FC<Props> = ({
  value,
  min,
  max,
  onChange
}) => {
  let [valueState, setValueState] = useState(value);

  useEffect(() => {
    setValueState(value);
  }, [value]);

  const deccrease = () => {
    let _value = valueState;
    _value--;
    if (_value < min) {
      _value = max;
    }
    setValueState(Math.max(min, _value));
    onChange(Math.max(min, _value));
  }

  const increase = () => {
    let _value = valueState;
    _value++;
    if (_value > max) {
      _value = min;
    }
    setValueState(Math.min(max, _value));
    onChange(Math.min(max, _value));
  }

  const change = (event: any) => {
    let _value = +event.target.value;
    if (_value > max) {
      _value = Math.min(_value, max);
    } else if (_value < min) {
      _value = Math.max(_value, min);
    }
    setValueState(_value);
    onChange(_value);
    return;
  }

  return (<div className="flex flex-col items-center gap-2 m-3">
    <button onClick={increase} className="bg-[#c1c1c1] text-white h-10 w-10 rounded-md">
      <IonIcon size="large" icon={add} />
    </button>
    <input
      type="number"
      className="h-6 w-10 rounded-md border-2 text-center border-[#c1c1c1] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
      value={CalendarUtil.formatNumber2Digits(valueState)}
      onChange={change}
      min={min}
      max={max}
    />
    <button onClick={deccrease} className="bg-[#c1c1c1] text-white h-10 w-10 rounded-md">
      <IonIcon size="large" icon={remove} />
    </button>
  </div>);
};

export default QuatityInput;