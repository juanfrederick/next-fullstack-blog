import React from "react";

interface Props {
  label: string;
  placeholder: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  value: string;
  hasCloseButton: JSX.Element;
  responsive?: boolean;
}

const TextArea = ({
  label,
  placeholder,
  onChange,
  value,
  hasCloseButton,
  responsive = false,
}: Props) => {
  return (
    <label
      className={`form-control w-full ${
        responsive ? "max-w-xs md:max-w-xl md:w-96" : "max-w-xs"
      }`}
    >
      <div className="label">
        <span className="label-text">{label}</span>
      </div>

      <div
        className={`${hasCloseButton ? "flex gap-2 items-center" : "w-full"}`}
      >
        <textarea
          className={`textarea textarea-bordered h-24 textarea-primary w-full ${
            responsive ? "max-w-xs md:max-w-xl md:w-96" : "max-w-xs"
          }`}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
        {hasCloseButton}
      </div>
    </label>
  );
};

export default TextArea;
