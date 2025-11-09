// src/lib/logic/calculator.test.ts

import { describe, it, expect } from 'vitest';
import {
  getInitialState,
  appendChar,
  clearDisplay,
  deleteLastChar,
  calculateResult,
} from './calculator';

describe('calculator logic', () => {
  it('should return the initial state', () => {
    expect(getInitialState()).toEqual({ display: '0' });
  });

  it('should append characters correctly', () => {
    let state = getInitialState();
    state = appendChar(state, '5');
    expect(state.display).toBe('5');
    state = appendChar(state, '.');
    expect(state.display).toBe('5.');
    state = appendChar(state, '2');
    expect(state.display).toBe('5.2');
  });

  it('should not allow leading zeros', () => {
    let state = getInitialState();
    state = appendChar(state, '0');
    state = appendChar(state, '5');
    expect(state.display).toBe('5');
  });

  it('should clear the display', () => {
    let state = { display: '123.45' };
    state = clearDisplay(state);
    expect(state.display).toBe('0');
  });

  it('should delete the last character', () => {
    let state = { display: '123' };
    state = deleteLastChar(state);
    expect(state.display).toBe('12');
    state = deleteLastChar(state);
    expect(state.display).toBe('1');
    state = deleteLastChar(state);
    expect(state.display).toBe('0');
  });

  it('should perform calculations correctly', () => {
    let state = { display: '5+5' };
    state = calculateResult(state);
    expect(state.display).toBe('10');

    state = { display: '10*2-5' };
    state = calculateResult(state);
    expect(state.display).toBe('15');
  });

  it('should handle errors during calculation', () => {
    let state = { display: '5++5' };
    state = calculateResult(state);
    expect(state.display).toBe('Error');
  });

  it('should prevent unsafe characters from being evaluated', () => {
    let state = { display: 'alert("bad")' };
    state = calculateResult(state);
    expect(state.display).toBe('Error');
  });
});
