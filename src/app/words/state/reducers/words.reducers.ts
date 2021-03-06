import { createSelector } from '@ngrx/store';

import * as wordsList from '../actions/words.actions';

import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

// WORD STATE INTERFACE
export interface AllWordsState extends EntityState<any> {
  loading: Boolean;
  loaded: Boolean;
}

// SORT FUNCTION
export function sortByCreatedAt(ob1, ob2): number {
  return ob2.createdAt.localeCompare(ob1.createdAt);
}

// NGRX/ENTITY
export const adapter: EntityAdapter<any> = createEntityAdapter<any>({
  selectId: word => word._id,
  sortComparer: sortByCreatedAt
});

// INITIAL WORDS STATE
export const INITIAL_ALL_WORDS_STATE: AllWordsState = adapter.getInitialState({
  // entities: {},
  loading: false,
  loaded: false
});

// WORDS REDUCER
export function allWordsReducer(
  state: AllWordsState = INITIAL_ALL_WORDS_STATE,
  action: wordsList.Actions
): AllWordsState {
  switch (action.type) {
    case wordsList.LOAD_WORDS: {
      // console.log('LOAD WORDS');
      return Object.assign({}, state, {
        loading: true
      });
    }

    case wordsList.LOAD_WORDS_SUCCESS: {
      // console.log(action.payload);
      return adapter.addAll(action.payload, {
        ...state,
        loading: false,
        loaded: true
      });
    }

    case wordsList.LOAD_WORDS_FAIL: {
      // console.log('LOAD WORDS FAIL REDUCER', action.payload.error.message);
      return state;
    }

    case wordsList.ADD_WORD_SUCCESS: {
      console.log('ADD WORD SUCCESS REDUCER', action.payload.data);
      return adapter.addOne(action.payload.data, state);
    }

    case wordsList.EDIT_WORD_SUCCESS: {
      console.log('EDIT WORD SUCCESS REDUCER', action.payload);
      console.log('state', state);
      return adapter.updateOne(
        { id: action.payload._id, changes: action.payload },
        state
      );
      // return adapter.updateOne(
      //   {
      //     id: action.payload._id,
      //     changes: {
      //       id: action.payload
      //     }
      //   },
      //   state
      // );
    }

    case wordsList.DELETE_WORD_SUCCESS: {
      // console.log(action.payload);
      return adapter.removeOne(action.payload, state);
    }

    case wordsList.DELETE_MANY_WORDS_SUCCESS: {
      // console.log(action.payload);
      return adapter.removeMany(action.payload, state);
      // return adapter.removeOne(action.payload.word._id, state);
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

export const getAllWordsLoading = (state: AllWordsState) => {
  // console.log(state);
  return state.loading;
};
export const getAllWordsLoaded = (state: AllWordsState) => {
  // console.log(state);
  return state.loaded;
};
export const getAllWords = (state: AllWordsState) => state.entities;

// export const getSelected = createSelector(
//   getEntities,
//   getSelectedId,
//   (entities, selectedId) => {
//     return entities[selectedId];
//   }
// );

// export const getAll = createSelector(
//   getEntities,
//   getIds,
//   (entities, ids) => {
//     return ids.map(id => entities[id]);
//   }
// );

// export const metaReducers: MetaReducer<ApplicationState>[] =
//   !environment.production ? [storeFreeze] : [];
