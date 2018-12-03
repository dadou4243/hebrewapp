import { MetaReducer, createSelector, createFeatureSelector } from '@ngrx/store';
import { storeFreeze } from 'ngrx-store-freeze';

import * as wordsList from './words.actions';

import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity';


// WORD STATE INTERFACE
export interface WordsState extends EntityState<any> {
  loading: Boolean;
  loaded: Boolean;
}

// NGRX/ENTITY
export const adapter: EntityAdapter<any> =
createEntityAdapter<any>({
  selectId: word => word._id
});


// INITIAL WORDS STATE
export const INITIAL_WORDS_STATE: WordsState = adapter.getInitialState({
  loading: false,
  loaded: false
});


// WORDS REDUCER
export function wordsReducer(state: WordsState = INITIAL_WORDS_STATE, action: wordsList.Actions): WordsState {
  switch (action.type) {

    case wordsList.LOAD_WORDS:
    return Object.assign({}, state, {
      loading: true
    });

    case wordsList.LOAD_WORDS_SUCCESS:
    return adapter.addAll(action.payload, {...state, loading: false, loaded: true});

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

// export const metaReducers: MetaReducer<ApplicationState>[] =
//   !environment.production ? [storeFreeze] : [];
