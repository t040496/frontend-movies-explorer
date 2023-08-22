import React, {
  ChangeEventHandler,
  FocusEventHandler,
  forwardRef,
  useState,
} from "react";
import styles from "./Input.module.scss";
import cn from "classnames";

export interface IInputProps {
  name: string;
  label?: string;
  onTextInput?: (value: string) => void;
  className?: string;
  type?: React.HTMLInputTypeAttribute;
  placehodler?: string;
  required?: boolean;
  value?: string;
  isControlled?: boolean;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  onBlur?: FocusEventHandler<HTMLInputElement>;
  error?: string;
}

export type TRef = HTMLInputElement;

export const Input = forwardRef<TRef, IInputProps>(
  (
    {
      name,
      isControlled,
      className,
      required,
      label = "Label",
      onTextInput,
      type = "text",
      placehodler,
      value,
      onChange,
      onBlur,
      error,
    },
    ref,
  ) => {
    const [valueInner, setValueInner] = useState<string>(value || "");
    const [focused, setFocused] = useState<boolean>(false);

    const handleOnTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!isControlled) {
        setValueInner(e.target.value);
      } else {
        if (onChange) {
          onChange(e);
        }
      }

      if (onTextInput) {
        onTextInput(e.target.value);
      }
    };

    const handleOnBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      if (onBlur) {
        onBlur(e);
      }

      setFocused(false);
    };

    return (
      <div className={cn(styles.input, className)}>
        <div
          className={cn(
            styles.input__wrapper,
            focused && styles["input__wrapper-focused"],
          )}
        >
          <label htmlFor={`#form-field-${name}`}>{label}</label>
          <input
            type={type}
            name={name}
            value={isControlled ? value : valueInner}
            required={required}
            onChange={handleOnTextChange}
            onFocus={() => setFocused(true)}
            onBlur={handleOnBlur}
            id={`#form-field-${name}`}
            placeholder={placehodler}
            ref={ref}
          />
        </div>
        {error && <span className={styles.input__message}>{error}</span>}
      </div>
    );
  },
);
