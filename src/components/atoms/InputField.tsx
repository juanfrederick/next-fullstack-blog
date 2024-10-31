import { memo } from "react";

interface Props {
  id: string;
  placeholder: string;
  icon?: JSX.Element;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type: string;
}

const InputField = memo(
  ({ icon, id, placeholder, onChange, value, type }: Props) => {
    return (
      <label
        htmlFor={id}
        className="input input-bordered input-primary flex items-center gap-2 w-full max-w-xs"
      >
        {icon}
        <input
          type={type}
          placeholder={placeholder}
          className="grow"
          id={id}
          value={value}
          onChange={onChange}
        />
      </label>
    );
  }
);

export default InputField;
