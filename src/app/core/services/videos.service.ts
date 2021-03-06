import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class VideosService {
  constructor(private http: HttpClient) {}

  getVideos(): Observable<any[]> {
    return this.http.get<any[]>(`${environment.API_URL}/video`);
  }

  getVideo(id): Observable<any> {
    console.log('getVideo ID service', id);
    return this.http.get<any>(`${environment.API_URL}/video/${id}`);
  }

  createVideo(video): Observable<any> {
    // console.log('CREATE VIDEO SERVICE', video);
    return this.http.post<any>(`${environment.API_URL}/video`, video);
  }

  saveVideo(video): Observable<any> {
    console.log('saveVideo service', video);
    return this.http.post<any>(
      `${environment.API_URL}/video/${video._id}`,
      video
    );
  }

  deleteVideo(videoId): Observable<any> {
    console.log('deleteVideo service', videoId);
    return this.http.delete<any>(`${environment.API_URL}/video/${videoId}`);
  }
}
