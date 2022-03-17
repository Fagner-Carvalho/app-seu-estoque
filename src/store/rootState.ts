import { RouterState } from 'connected-react-router/immutable';
import { Record } from 'immutable';

export type RootState = Record<{
  router: RouterState;
}>;
