import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { getAllWords } from '../../state/words.selectors';
import { AddToMyWords, DeleteFromMyWords } from '../../state/myWords.actions';
import { WordsState } from '../../state';
import { getUser } from 'src/app/authentication/state/user.selectors';
import { getAllMyWords } from '../../state/myWords.selectors';
import { DeleteWords } from '../../state/words.actions';

@Component({
  selector: 'app-words-list-container',
  templateUrl: './words-list-container.component.html',
  styleUrls: ['./words-list-container.component.scss']
})
export class WordsListContainerComponent implements OnInit {
  words$: Observable<any[]>;
  myWords$: Observable<any[]>;

  currentUserId;

  constructor(private store: Store<any>) {}

  ngOnInit() {
    this.myWords$ = this.store.pipe(select(getAllMyWords));

    this.words$ = this.store.pipe(select(getAllWords));
    // this.words$.subscribe(words => console.log(words));

    this.store.pipe(select(getUser)).subscribe(user => {
      // console.log(user);
      return (this.currentUserId = user._id);
    });
  }

  addToMyWords(word) {
    // console.log('add ', word);
    this.store.dispatch(new AddToMyWords({ word, userId: this.currentUserId }));
  }

  deleteFromMyWords(word) {
    // console.log('delete ', word);
    this.store.dispatch(
      new DeleteFromMyWords({ word, userId: this.currentUserId })
    );
  }

  deleteWords(wordsToDelete) {
    console.log(wordsToDelete);
    this.store.dispatch(new DeleteWords(wordsToDelete));
  }
}
