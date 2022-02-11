import React, { useRef, useEffect } from 'react';

type Props = {
  allowedCharacters?: string;
  ariaLabel?: string;
  characters?: number;
  containerClassName?: string;
  inputClassName?: string;
  inputType?: 'number' | 'password' | 'text';
  onChange: (res: string) => void;
};

const AuthCode: React.FC<Props> = ({
  allowedCharacters = '[A-Za-z0-9]+',
  ariaLabel,
  characters = 6,
  containerClassName,
  inputClassName,
  inputType = 'text',
  onChange
}) => {
  const inputsRef = useRef<Array<HTMLInputElement>>([]);

  const inputMode = inputType === 'number' ? 'numeric' : 'text';

  useEffect(() => {
    inputsRef.current[0].focus();
  }, []);

  const sendResult = () => {
    const res = inputsRef.current.map((input) => input.value).join('');
    onChange && onChange(res);
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value, nextElementSibling }
    } = e;
    if (value.match(allowedCharacters)) {
      if (nextElementSibling !== null) {
        (nextElementSibling as HTMLInputElement).focus();
      }
    } else {
      e.target.value = '';
    }
    sendResult();
  };

  const handleOnKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const { key } = e;
    const target = e.target as HTMLInputElement;
    if (key === 'Backspace') {
      if (target.value === '' && target.previousElementSibling !== null) {
        if (target.previousElementSibling !== null) {
          (target.previousElementSibling as HTMLInputElement).focus();
          e.preventDefault();
        }
      } else {
        target.value = '';
      }
      sendResult();
    }
  };

  const handleOnFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    e.target.select();
  };

  const handleOnPaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const value = e.clipboardData.getData('Text');
    if (value.match(allowedCharacters)) {
      for (let i = 0; i < characters && i < value.length; i++) {
        inputsRef.current[i].value = value.charAt(i);
        if (inputsRef.current[i].nextElementSibling !== null) {
          (inputsRef.current[i].nextElementSibling as HTMLInputElement).focus();
        }
      }
      sendResult();
    }
    e.preventDefault();
  };

  const inputs = [];
  for (let i = 0; i < characters; i++) {
    inputs.push(
      <input
        key={i}
        onChange={handleOnChange}
        onKeyDown={handleOnKeyDown}
        onFocus={handleOnFocus}
        onPaste={handleOnPaste}
        type={inputType}
        ref={(el: HTMLInputElement) => (inputsRef.current[i] = el)}
        maxLength={1}
        className={inputClassName}
        inputMode={inputMode}
        autoComplete={i === 0 ? 'one-time-code' : 'off'}
        aria-label={
          ariaLabel
            ? `${ariaLabel}. Character ${i + 1}.`
            : `Character ${i + 1}.`
        }
        pattern={i === 0 ? allowedCharacters : ''}
      />
    );
  }

  return <div className={containerClassName}>{inputs}</div>;
};

export default AuthCode;
