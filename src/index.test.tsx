import React from 'react';

import '@testing-library/jest-dom';

import { createEvent, fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import AuthCode from '.';

describe('AuthCode', () => {
  it('should render the default component', () => {
    render(<AuthCode onChange={() => null} />);
    expect(screen.getAllByRole('textbox')).toHaveLength(6);
  });

  it('should render n inputs', () => {
    render(<AuthCode onChange={() => null} length={4} />);
    expect(screen.getAllByRole('textbox')).toHaveLength(4);
  });

  it('should call onChange function when typing any character', async () => {
    const onChangeFn = jest.fn();
    render(<AuthCode onChange={onChangeFn} />);

    const input = screen.getAllByRole('textbox')[0] as HTMLInputElement;

    userEvent.type(input, 'A');
    expect(input).toHaveValue('A');
    expect(onChangeFn).toHaveBeenCalledTimes(1);
  });

  describe('Alphanumeric', () => {
    it('should not change the input value when typing a not allowed character', async () => {
      const onChangeFn = jest.fn();
      render(<AuthCode onChange={onChangeFn} />);

      const input = screen.getAllByRole('textbox')[0] as HTMLInputElement;

      userEvent.type(input, ',');
      expect(input).toHaveValue('');
    });

    it('should allow only one character for input', async () => {
      const onChangeFn = jest.fn();
      render(<AuthCode onChange={onChangeFn} />);

      const input = screen.getAllByRole('textbox')[0] as HTMLInputElement;

      userEvent.type(input, 'A');
      userEvent.type(input, 'B');
      expect(input).toHaveValue('A');

      userEvent.type(input, '1');
      expect(input).toHaveValue('A');
      expect(onChangeFn).toHaveBeenCalledTimes(1);
    });

    it('should paste all the characters', async () => {
      const onChangeFn = jest.fn();
      render(<AuthCode onChange={onChangeFn} />);

      const firstInput = screen.getAllByRole('textbox')[0] as HTMLInputElement;
      const lastInput = screen.getAllByRole('textbox')[5] as HTMLInputElement;

      const paste = createEvent.paste(firstInput, {
        clipboardData: {
          getData: () => 'a12def'
        }
      });

      fireEvent(firstInput, paste);

      expect(firstInput).toHaveValue('a');
      expect(lastInput).toHaveValue('f');
      expect(onChangeFn).toHaveBeenCalledTimes(1);
    });

    it('should paste only the allowed the characters', async () => {
      const onChangeFn = jest.fn();
      render(<AuthCode onChange={onChangeFn} />);

      const firstInput = screen.getAllByRole('textbox')[0] as HTMLInputElement;
      const lastInput = screen.getAllByRole('textbox')[4] as HTMLInputElement;

      const paste = createEvent.paste(firstInput, {
        clipboardData: {
          getData: () => '1,b456'
        }
      });

      fireEvent(firstInput, paste);

      expect(firstInput).toHaveValue('1');
      expect(lastInput).toHaveValue('6');
      expect(onChangeFn).toHaveBeenCalledTimes(1);
    });

    it('should take in account the number of characters when pasting', async () => {
      const onChangeFn = jest.fn();
      render(<AuthCode onChange={onChangeFn} length={5} />);

      const firstInput = screen.getAllByRole('textbox')[0] as HTMLInputElement;
      const lastInput = screen.getAllByRole('textbox')[4] as HTMLInputElement;

      const paste = createEvent.paste(firstInput, {
        clipboardData: {
          getData: () => 'abcdef'
        }
      });

      fireEvent(firstInput, paste);

      expect(firstInput).toHaveValue('a');
      expect(lastInput).toHaveValue('e');
      expect(onChangeFn).toHaveBeenCalledTimes(1);
    });
  });

  describe('Alpha', () => {
    it('should not change the input value when typing a not allowed character', async () => {
      const onChangeFn = jest.fn();
      render(<AuthCode allowedCharacters='alpha' onChange={onChangeFn} />);

      const input = screen.getAllByRole('textbox')[0] as HTMLInputElement;

      userEvent.type(input, ',');
      expect(input).toHaveValue('');
    });

    it('should allow only one character for input', async () => {
      const onChangeFn = jest.fn();
      render(<AuthCode allowedCharacters='alpha' onChange={onChangeFn} />);

      const input = screen.getAllByRole('textbox')[0] as HTMLInputElement;

      userEvent.type(input, 'A');
      userEvent.type(input, 'B');
      expect(input).toHaveValue('A');

      userEvent.type(input, '1');
      expect(input).toHaveValue('A');
      expect(onChangeFn).toHaveBeenCalledTimes(1);
    });

    it('should paste all the characters', async () => {
      const onChangeFn = jest.fn();
      render(<AuthCode allowedCharacters='alpha' onChange={onChangeFn} />);

      const firstInput = screen.getAllByRole('textbox')[0] as HTMLInputElement;
      const lastInput = screen.getAllByRole('textbox')[5] as HTMLInputElement;

      const paste = createEvent.paste(firstInput, {
        clipboardData: {
          getData: () => 'abcdef'
        }
      });

      fireEvent(firstInput, paste);

      expect(firstInput).toHaveValue('a');
      expect(lastInput).toHaveValue('f');
      expect(onChangeFn).toHaveBeenCalledTimes(1);
    });

    it('should paste only the allowed the characters', async () => {
      const onChangeFn = jest.fn();
      render(<AuthCode allowedCharacters='alpha' onChange={onChangeFn} />);

      const firstInput = screen.getAllByRole('textbox')[0] as HTMLInputElement;
      const lastInput = screen.getAllByRole('textbox')[4] as HTMLInputElement;

      const paste = createEvent.paste(firstInput, {
        clipboardData: {
          getData: () => 'a,bcde'
        }
      });

      fireEvent(firstInput, paste);

      expect(firstInput).toHaveValue('a');
      expect(lastInput).toHaveValue('e');
      expect(onChangeFn).toHaveBeenCalledTimes(1);
    });

    it('should take in account the number of characters when pasting', async () => {
      const onChangeFn = jest.fn();
      render(
        <AuthCode allowedCharacters='alpha' onChange={onChangeFn} length={5} />
      );

      const firstInput = screen.getAllByRole('textbox')[0] as HTMLInputElement;
      const lastInput = screen.getAllByRole('textbox')[4] as HTMLInputElement;

      const paste = createEvent.paste(firstInput, {
        clipboardData: {
          getData: () => 'abcdef'
        }
      });

      fireEvent(firstInput, paste);

      expect(firstInput).toHaveValue('a');
      expect(lastInput).toHaveValue('e');
      expect(onChangeFn).toHaveBeenCalledTimes(1);
    });
  });

  describe('Numeric', () => {
    it('should not change the input value when typing a not allowed character', async () => {
      const onChangeFn = jest.fn();
      render(<AuthCode allowedCharacters='numeric' onChange={onChangeFn} />);

      const input = screen.getAllByRole('spinbutton')[0] as HTMLInputElement;

      userEvent.type(input, 'a');
      expect(input).toHaveValue(null);
    });

    it('should allow only one character for input', async () => {
      const onChangeFn = jest.fn();
      render(<AuthCode allowedCharacters='numeric' onChange={onChangeFn} />);

      const input = screen.getAllByRole('spinbutton')[0] as HTMLInputElement;

      userEvent.type(input, '1');
      userEvent.type(input, '2');
      expect(input).toHaveValue(1);

      userEvent.type(input, 'B');
      expect(input).toHaveValue(1);
      expect(onChangeFn).toHaveBeenCalledTimes(2);
    });

    it('should paste all the characters', async () => {
      const onChangeFn = jest.fn();
      render(<AuthCode allowedCharacters='numeric' onChange={onChangeFn} />);

      const firstInput = screen.getAllByRole(
        'spinbutton'
      )[0] as HTMLInputElement;
      const lastInput = screen.getAllByRole(
        'spinbutton'
      )[5] as HTMLInputElement;

      const paste = createEvent.paste(firstInput, {
        clipboardData: {
          getData: () => '123456'
        }
      });

      fireEvent(firstInput, paste);

      expect(firstInput).toHaveValue(1);
      expect(lastInput).toHaveValue(6);
      expect(onChangeFn).toHaveBeenCalledTimes(1);
    });

    it('should paste only the allowed the characters', async () => {
      const onChangeFn = jest.fn();
      render(<AuthCode allowedCharacters='numeric' onChange={onChangeFn} />);

      const firstInput = screen.getAllByRole(
        'spinbutton'
      )[0] as HTMLInputElement;
      const lastInput = screen.getAllByRole(
        'spinbutton'
      )[5] as HTMLInputElement;

      const paste = createEvent.paste(firstInput, {
        clipboardData: {
          getData: () => '1ab45678'
        }
      });

      fireEvent(firstInput, paste);

      expect(firstInput).toHaveValue(1);
      expect(lastInput).toHaveValue(8);
      expect(onChangeFn).toHaveBeenCalledTimes(1);
    });

    it('should take in account the number of characters when pasting', async () => {
      const onChangeFn = jest.fn();
      render(
        <AuthCode
          allowedCharacters='numeric'
          onChange={onChangeFn}
          length={5}
        />
      );

      const firstInput = screen.getAllByRole(
        'spinbutton'
      )[0] as HTMLInputElement;
      const lastInput = screen.getAllByRole(
        'spinbutton'
      )[4] as HTMLInputElement;

      const paste = createEvent.paste(firstInput, {
        clipboardData: {
          getData: () => '123456'
        }
      });

      fireEvent(firstInput, paste);

      expect(firstInput).toHaveValue(1);
      expect(lastInput).toHaveValue(5);
      expect(onChangeFn).toHaveBeenCalledTimes(1);
    });
  });

  describe('Bad properties', () => {
    it('should throw an exception when the length prop is less than 1', () => {
      const err = console.error;
      console.error = jest.fn();
      const onChangeFn = jest.fn();
      const badRender = () => {
        render(<AuthCode onChange={onChangeFn} length={0} />);
      };

      expect(badRender).toThrowError(
        'Length should be a number and greater than 0'
      );
      console.error = err;
    });

    it('should throw an exception when the length prop is not a number', () => {
      const err = console.error;
      console.error = jest.fn();
      const onChangeFn = jest.fn();
      const badRender = () => {
        // @ts-ignore
        render(<AuthCode onChange={onChangeFn} length='hello' />);
      };

      expect(badRender).toThrowError(
        'Length should be a number and greater than 0'
      );
      console.error = err;
    });

    it('should throw an exception when the allowedCharacters prop s not valid', () => {
      const err = console.error;
      console.error = jest.fn();
      const onChangeFn = jest.fn();
      const badRender = () => {
        // @ts-ignore
        render(<AuthCode onChange={onChangeFn} allowedCharacters='invalid' />);
      };

      expect(badRender).toThrowError('Invalid value for allowedCharacters');
      console.error = err;
    });
  });
});
