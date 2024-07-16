
export type State = string[];
export type Action =
  | { type: 'ADD_ELEMENT'; element: string }
  | { type: 'REMOVE_ELEMENT'; element: string };