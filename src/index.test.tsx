import React from 'react';

import '@testing-library/jest-dom';

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import AuthCode from '.';

describe('AuthCode', () => {
  it('should render the default component', () => {
    render(<AuthCode onChange={() => null} />);
    expect(screen.getAllByRole('textbox')).toHaveLength(6);
  });

  it('should render n characters', () => {
    render(<AuthCode onChange={() => null} characters={4} />);
    expect(screen.getAllByRole('textbox')).toHaveLength(4);
  });

  it('should call onChange function when typing an allowed character', async () => {
    const onChangeFn = jest.fn();
    render(<AuthCode onChange={onChangeFn} />);

    const input = screen.getAllByRole('textbox')[0] as HTMLInputElement;

    userEvent.type(input, 'A');
    expect(input).toHaveValue('A');
    expect(onChangeFn).toHaveBeenCalledTimes(1);
  });
});
