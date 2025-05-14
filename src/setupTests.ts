import '@testing-library/jest-dom';

// Mock playClickSound globally to avoid AudioContext errors in tests
jest.mock('./components/Button/soundUtils', () => ({
  playClickSound: jest.fn(),
}));
