import React, { useRef, useEffect } from 'react';

type Props = {
  allowedCharacters?: 'alpha' | 'numeric' | 'alphanumeric';
  ariaLabel?: string;
  length?: number;
  containerClassName?: string;
  inputClassName?: string;
  isPassword?: boolean;
  onChange: (res: string) => void;
};

type InputMode = 'text' | 'numeric';

type InputType = 'text' | 'number' | 'password';

type InputProps = {
  type: InputType;
  inputMode: InputMode;
  pattern: string;
  min?: string;
  max?: string;
};

const propsMap: { [key: string]: InputProps } = {
  alpha: {
    type: 'text',
    inputMode: 'text',
    pattern: '[a-zA-Z]{1}'
  },

  alphanumeric: {
    type: 'text',
    inputMode: 'text',
    pattern: '[a-zA-Z0-9]{1}'
  },

  numeric: {
    type: 'number',
    inputMode: 'numeric',
    pattern: '[0-9]{1}',
    min: '0',
    max: '9'
  }
};

const AuthCode: React.FC<Props> = ({
  allowedCharacters = 'alphanumeric',
  ariaLabel,
  length = 6,
  containerClassName,
  inputClassName,
  isPassword = false,
  onChange
}) => {
  const inputsRef = useRef<Array<HTMLInputElement>>([]);

  const inputProps = propsMap[allowedCharacters];

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
    if (value.length > 1) {
      e.target.value = value.charAt(0);
      if (nextElementSibling !== null) {
        (nextElementSibling as HTMLInputElement).focus();
      }
    } else {
      if (value.match(inputProps.pattern)) {
        if (nextElementSibling !== null) {
          (nextElementSibling as HTMLInputElement).focus();
        }
      } else {
        e.target.value = '';
      }
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
        (target.previousElementSibling as HTMLInputElement).focus();
      }
      sendResult();
    }
  };

  const handleOnFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    e.target.select();
  };

  const handleOnPaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const pastedValue = e.clipboardData.getData('Text');

    let currentInput = 0;

    for (let i = 0; i < pastedValue.length; i++) {
      const pastedCharacter = pastedValue.charAt(i);
      const currentValue = inputsRef.current[currentInput].value;
      if (pastedCharacter.match(inputProps.pattern)) {
        if (!currentValue) {
          inputsRef.current[currentInput].value = pastedCharacter;
          if (inputsRef.current[currentInput].nextElementSibling !== null) {
            (inputsRef.current[currentInput]
              .nextElementSibling as HTMLInputElement).focus();
            currentInput++;
          }
        }
      }
    }
    sendResult();

    e.preventDefault();
  };

  const inputs = [];
  for (let i = 0; i < length; i++) {
    inputs.push(
      <input
        key={i}
        onChange={handleOnChange}
        onKeyDown={handleOnKeyDown}
        onFocus={handleOnFocus}
        onPaste={handleOnPaste}
        {...inputProps}
        type={isPassword ? 'password' : inputProps.type}
        ref={(el: HTMLInputElement) => (inputsRef.current[i] = el)}
        maxLength={1}
        className={inputClassName}
        autoComplete={i === 0 ? 'one-time-code' : 'off'}
        aria-label={
          ariaLabel
            ? `${ariaLabel}. Character ${i + 1}.`
            : `Character ${i + 1}.`
        }
      />
    );
  }

  return <div className={containerClassName}>{inputs}</div>;
};

export default AuthCode;
