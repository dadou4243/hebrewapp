import { createFeatureSelector, createSelector } from '@ngrx/store';
import { WordsState, selectAll } from './words.reducer';

export const getWordsState = createFeatureSelector<any>('words');

export const getAllWords = createSelector(getWordsState, selectAll);
export const getWordsLoading = createSelector(getWordsState, (state: WordsState) => state.loading);
export const getWordsLoaded = createSelector(getWordsState, (state: WordsState) => state.loaded);
