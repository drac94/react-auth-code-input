import React, { useRef, useEffect } from 'react';

type Props = {
  allowedCharacters?: RegExp;
  characters?: number;
  containerClassName?: string;
  inputClassName?: string;
  inputType?: 'number' | 'password' | 'text';
  onChange: (res: string) => void;
};

const AuthCode: React.FC<Props> = ({
  allowedCharacters = '^[A-Za-z0-9]*$',
  characters = 6,
  containerClassName,
  inputClassName,
  inputType = 'text',
  onChange
}) => {
  const inputsRef = useRef<Array<HTMLInputElement>>([]);

  useEffect(() => {
    inputsRef.current[0].focus();
  }, []);

  const sendResult = () => {
    const res = inputsRef.current.map((input) => input.value).join('');
    onChange && onChange(res);
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.match(allowedCharacters)) {
      if (e.target.nextElementSibling !== null) {
        (e.target.nextElementSibling as HTMLInputElement).focus();
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
        autoComplete={i === 0 ? 'one-time-password' : 'off'}
        inputMode='numeric'
        pattern="\d*"
        aria-label={`digit ${i+1} of ${characters}`}
        type={inputType}
        ref={(el: HTMLInputElement) => (inputsRef.current[i] = el)}
        maxLength={1}
        className={inputClassName}
      />
    );
  }

  return <div className={containerClassName}>{inputs}</div>;
};

export default AuthCode;
