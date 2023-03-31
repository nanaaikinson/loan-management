import classNames from "classnames";

interface InputSliderProps {
  value: number;
  min?: number;
  max?: number;
  step?: number;
  id?: string;
  className?: string;
  disabled?: boolean;
  onSliderChange?: (payload: string) => void;
}

const InputSlider = ({
  id,
  className,
  value,
  min = 0,
  max = 100,
  step = 1,
  disabled = false,
  onSliderChange,
}: InputSliderProps) => {
  return (
    <>
      <input
        id={id}
        type="range"
        value={value}
        min={min}
        max={max}
        step={step}
        disabled={disabled}
        className={classNames("input-slider", className)}
        onChange={(e) => {
          if (onSliderChange) onSliderChange(e.target.value);
        }}
      />
    </>
  );
};

export default InputSlider;
