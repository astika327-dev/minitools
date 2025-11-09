// src/lib/logic/calculator.ts

export type CalculatorState = {
  display: string;
};

export function getInitialState(): CalculatorState {
  return { display: '0' };
}

export function appendChar(state: CalculatorState, char: string): CalculatorState {
  let newDisplay = state.display;
  if (newDisplay === '0' && char !== '.') {
    newDisplay = char;
  } else {
    newDisplay += char;
  }
  return { ...state, display: newDisplay };
}

export function clearDisplay(state: CalculatorState): CalculatorState {
  return { ...state, display: '0' };
}

export function deleteLastChar(state: CalculatorState): CalculatorState {
  let newDisplay = state.display.slice(0, -1);
  if (newDisplay === '') {
    newDisplay = '0';
  }
  return { ...state, display: newDisplay };
}

export function calculateResult(state: CalculatorState): CalculatorState {
  try {
    const sanitizedExpression = state.display.replace(/[^-()\d/*+.]/g, '');
    if (sanitizedExpression !== state.display) {
      return { ...state, display: 'Error' };
    }
    const result = new Function('return ' + sanitizedExpression)().toString();
    return { ...state, display: result };
  } catch (e) {
    return { ...state, display: 'Error' };
  }
}
