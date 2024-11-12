import { memo } from "react";

interface Props {
  id: string;
  placeholder?: string;
  icon?: JSX.Element;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type: string;
  label?: string;
  variant?: "default" | "labeled";
  hasCloseButton?: JSX.Element;
  responsive?: boolean;
}

const InputField = ({
  icon,
  id,
  placeholder,
  onChange,
  value,
  type,
  label,
  variant = "default",
  hasCloseButton,
  responsive = false,
}: Props) => {
  const getVariantContainer = (variant: "default" | "labeled") => {
    switch (variant) {
      case "default":
        return "input input-bordered flex items-center gap-2";
      case "labeled":
        return "form-control";
    }
  };

  const getVariantInput = (variant: "default" | "labeled") => {
    switch (variant) {
      case "default":
        return "grow";
      case "labeled":
        return `input input-bordered input-primary w-full ${
          responsive ? "max-w-xs md:max-w-xl md:w-96" : "max-w-xs"
        }`;
    }
  };

  return (
    <label
      htmlFor={id}
      className={`input-primary w-full ${
        responsive ? "max-w-xs md:max-w-xl md:w-96" : "max-w-xs"
      } ${getVariantContainer(variant)}`}
    >
      {variant === "labeled" && label && (
        <div className="label">
          <span className="label-text">{label}</span>
        </div>
      )}
      {icon}
      <div className={hasCloseButton ? "flex items-center gap-2" : ""}>
        <input
          type={type}
          placeholder={placeholder}
          className={getVariantInput(variant)}
          id={id}
          value={value}
          onChange={onChange}
        />
        {hasCloseButton}
      </div>
    </label>
  );
};
export default memo(InputField);
