![image](https://user-images.githubusercontent.com/1719915/159784302-4bb83708-e993-4800-9bcf-091ecb709ef7.png)

# React Auth Code Input

> One-time password (OTP) React component, zero dependencies, fully tested.

[![NPM](https://img.shields.io/npm/v/react-auth-code-input.svg)](https://www.npmjs.com/package/react-auth-code-input) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)
[![Software License](https://img.shields.io/badge/license-MIT-brightgreen.svg)](LICENSE.md)
[![npm](https://img.shields.io/npm/dt/react-auth-code-input.svg)](https://www.npmjs.com/package/react-auth-code-input)
[![npm](https://img.shields.io/npm/dw/react-auth-code-input.svg)](https://www.npmjs.com/package/react-auth-code-input)
![GitHub actions state](https://img.shields.io/github/workflow/status/drac94/react-auth-code-input/CI)

## Demo

[Demo](https://www.luisguerrero.me/react-auth-code-input/)

## Install

```bash
npm install --save react-auth-code-input
```

or

```bash
yarn add react-auth-code-input
```

# Version 3+

## Basic Usage

```tsx
import React, { useState } from 'react';
import AuthCode from 'react-auth-code-input';

const App = () => {
  const [result, setResult] = useState();
  const handleOnChange = (res: string) => {
    setResult(res);
  };

  return <AuthCode onChange={handleOnChange} />;
};
```

## Mode

By default you can type numbers and letters in the inputs as the `allowedCharacters` prop is defaulted to `alphanumeric` but you can also choose between allowing only letters or only numbers by setting the prop to `alpha` or `numeric` respectively.

```tsx
import React, { useState } from 'react';
import AuthCode from 'react-auth-code-input';

const App = () => {
  const [result, setResult] = useState();
  const handleOnChange = (res: string) => {
    setResult(res);
  };

  return <AuthCode allowedCharacters='numeric' onChange={handleOnChange} />;
};
```

## Focus

By default the first input is focused when the component is mounted, you can opt-out from this by setting the `autoFocus` prop to `false`, and then you can handle the focus manually by passing a reference.

```tsx
import React, { useRef, useState } from 'react';
import AuthCode, { AuthCodeRef } from 'react-auth-code-input';

const App = () => {
  const AuthInputRef = useRef<AuthCodeRef>(null);
  const [result, setResult] = useState();
  const handleOnChange = (res: string) => {
    setResult(res);
  };

  return (
    <>
      <AuthCode
        autoFocus={false}
        onChange={handleOnChange}
        ref={AuthInputRef}
      />
      <button onClick={() => AuthInputRef.current?.focus()}>Focus</button>
    </>
  );
};
```

## Clear

You can clear all the inputs by passing a reference and then calling the `clear` method.

```tsx
import React, { useRef, useState } from 'react';
import AuthCode, { AuthCodeRef } from 'react-auth-code-input';

const App = () => {
  const AuthInputRef = useRef<AuthCodeRef>(null);
  const [result, setResult] = useState();
  const handleOnChange = (res: string) => {
    setResult(res);
  };

  return (
    <>
      <AuthCode onChange={handleOnChange} ref={AuthInputRef} />
      <button onClick={() => AuthInputRef.current?.clear()}>Clear</button>
    </>
  );
};
```

## SMS Autofill

This component supports autofill from SMS's received, tested on Safari and Chrome in iOS.

## Props

| Prop                 | Type                    | Description                                                 | Default Value  | Observations                                     |
| :------------------- | :---------------------- | :---------------------------------------------------------- | :------------- | :----------------------------------------------- |
| `allowedCharacters`  | String                  | Type of allowed characters for your code.                   | `alphanumeric` | Valid values: `alpha`, `alphanumeric`, `numeric` |
| `ariaLabel`          | String                  | Accessibility.                                              |                |                                                  |
| `autoFocus`          | Boolean                 | Wether the first input is focused on mount or not..         | true           | Since version 3.1.0                              |
| `length`             | Number                  | The number of inputs to display.                            | 6              |                                                  |
| `containerClassName` | String                  | The styles to be applied to the container.                  |                |                                                  |
| `inputClassName`     | String                  | The styles to be applied to each input.                     |                |                                                  |
| `onChange`           | Function(value: String) | Callback function called every time an input value changes. |                | Required                                         |
| `isPassword`         | Boolean                 | Whether to display the inputs as passwords or not.          | false          |                                                  |
| `disabled`           | Boolean                 | Makes all the inputs disabled if true.                      | false          | Since version 3.1.1                              |
| `placeholder`        | String                  | Displays a placeholder in all the inputs.                   |                | Since version 3.2.0                              |

## Changelog

### 3.2.1

- Fix allowing non-numeric characters being introduced in numeric mode on Safari and Firefox.

### 3.2.0

- Add `placeholder` prop.
- Export component props.

### 3.1.0

- Add `disabled` prop to disable all the inputs.
- Make the backspace delete the previous character if the current is empty. Previously it just moved the focus making the user hit twice the backspace to delete the value.

### 3.1.0

- Add `autoFocus` prop set to true by default to not break current usages.
- Expose a `focus` method using references to handle the focus of the first input manually.
- Expose a `clear` method using references to clear the input programmatically.
- Add validations for when not using typescript.
- Update React peerDependency to use any version 16+.

### 3.0.0

- Change the way the allowed characters are handled by using 3 predefined modes: alpha, alphanumeric, and numeric, allowing to have more control when validating the values introduced in the inputs.
- Improved logic.
- Improved tests.
- Improved types.

## License

Licensed under the MIT License, Copyright © 2020-present Luis Guerrero [drac94](https://github.com/drac94).

See [LICENSE](./LICENSE) for more information.
