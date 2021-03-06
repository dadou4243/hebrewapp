import { Component, OnInit } from '@angular/core';
import { Validators, FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AllVideosState } from '../../state/reducers/videos.reducers';
import { VideosService } from 'src/app/core/services/videos.service';
import { CreateVideo } from '../../state/actions/videos.actions';

@Component({
  selector: 'app-create-video',
  templateUrl: './create-video.component.html',
  styleUrls: ['./create-video.component.scss']
})
export class CreateVideoComponent implements OnInit {
  videoForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private videosService: VideosService,
    private router: Router,
    private store: Store<AllVideosState>
  ) {}

  ngOnInit() {
    this.videoForm = this.fb.group({
      link: [
        'https://www.youtube.com/watch?v=RkM5yU9GuTc',
        [Validators.required]
      ],
      // createdAt: [''],
      name: ['TEST', [Validators.required]],
      subtitles: this.fb.array([this.initSubtitle()])
    });
  }

  initSubtitle() {
    return this.fb.group({
      words: this.fb.array([this.initWord()]),
      startTime: ['0'],
      endTime: ['4']
    });
  }

  initWord() {
    return this.fb.group({
      hebrew: ['blabla'],
      french: ['blibli']
    });
  }

  addSubtitle() {
    const control = <FormArray>this.videoForm.get('subtitles');
    control.push(this.initSubtitle());
  }

  addWord(j) {
    // console.log('add word');
    // const wordGroup = this.fb.group({
    //   hebrew: [''],
    //   french: [''],
    // });
    const control = (<FormArray>this.videoForm.controls['subtitles'])
      .at(j)
      .get('words') as FormArray;
    control.push(this.initWord());
  }

  deleteSubtitle(i) {
    // this.subtitlesForm.removeAt(i);
  }

  deleteWord(j) {
    // this.wordsForm.removeAt(j);
  }

  resetForm() {}

  onSubmit() {
    // console.log(this.videoForm.get('youtubeLink'));
    // this.videoForm.patchValue({
    //   createdAt: Date.now()
    // });
    console.log(this.videoForm.value);
    // this.videosService.addVideo(this.videoForm.value).subscribe(res => {});
    this.store.dispatch(new CreateVideo(this.videoForm.value));
    // this.router.navigateByUrl('/videos');
  }
}
