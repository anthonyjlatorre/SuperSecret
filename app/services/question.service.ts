import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Question } from 'src/app/models/Question';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  url: string = 'https://opentdb.com/api.php?amount=10&type=multiple'

  constructor(private http: HttpClient) { }

  getQuestion(): Promise<Question> {
    console.log('getting questions');
    return this.http.get<Question>(this.url).toPromise();
  }


}
