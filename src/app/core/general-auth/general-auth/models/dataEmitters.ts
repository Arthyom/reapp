import { ErrorEmitterTypes } from '../enums/errorEmitterTypes';
export const dataEmitters = {
  ok: {
    index: 0,
    type: ErrorEmitterTypes.ok
  },
  minLen: {
    index: 1,
    type: ErrorEmitterTypes.minLen
  },
  null: {
    index: 2,
    type: ErrorEmitterTypes.null
  },
  lastEqual: {
    index: 3,
    type: ErrorEmitterTypes.lastEqual
  },
  coincide: {
    index: 4,
    type: ErrorEmitterTypes.coincide
  }
};

