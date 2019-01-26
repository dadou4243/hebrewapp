import {
  MetaReducer,
  createSelector,
  createFeatureSelector
} from '@ngrx/store';
import { storeFreeze } from 'ngrx-store-freeze';

import * as wordsList from './words.actions';

import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

// WORD STATE INTERFACE
export interface WordsState extends EntityState<any> {
  entities: { [id: string]: any };
  ids: string[];
  loading: Boolean;
  loaded: Boolean;
}

// NGRX/ENTITY
export const adapter: EntityAdapter<any> = createEntityAdapter<any>({
  selectId: word => word._id
});

// INITIAL WORDS STATE
export const INITIAL_WORDS_STATE: WordsState = adapter.getInitialState({
  entites: {},
  ids: [],
  loading: false,
  loaded: false
});

// WORDS REDUCER
export function wordsReducer(
  state: WordsState = INITIAL_WORDS_STATE,
  action: wordsList.Actions
): WordsState {
  switch (action.type) {
    case wordsList.LOAD_WORDS: {
      return Object.assign({}, state, {
        loading: true
      });
    }

    case wordsList.LOAD_WORDS_SUCCESS: {
      return adapter.addAll(action.payload, {
        ...state,
        loading: false,
        loaded: true
      });
    }

    default: {
      return state;
    }
  }
}

// NGRX/ENTITY SELECTORS
export const {
  selectAll,
  selectEntities,
  selectIds,
  selectTotal
} = adapter.getSelectors();

export const getEntities = (state: WordsState) => state.entities;

export const getIds = (state: WordsState) => state.ids;

// export const getSelectedId = (state: WordsState) => state.selectedBookId;

// export const getSelected = createSelector(
//   getEntities,
//   getSelectedId,
//   (entities, selectedId) => {
//     return entities[selectedId];
//   }
// );

export const getAll = createSelector(
  getEntities,
  getIds,
  (entities, ids) => {
    return ids.map(id => entities[id]);
  }
);

// export const metaReducers: MetaReducer<ApplicationState>[] =
//   !environment.production ? [storeFreeze] : [];
