import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Question } from '../models/question';
import { CreateQuestionAndAnswer } from '../models/question-answer';
import { ResultQuestion } from '../models/result';

@Injectable({
  providedIn: 'root'
})
export class QuestionsService {

  constructor() { }

  public getQuestions():Observable<ResultQuestion>{
    const res:ResultQuestion={
      html:`<div>
      <span>Ivan Ivanov</span>
      <div>Country:<span>UA</span></div>
      <div>Postcode:<b>65000</b></div>
  </div>`,
      questions:[
        {
          Id: 1,
          Text: 'Where is fullname?'
      },
      {
          Id: 2,
          Text: 'Where is the country?'
      },
      {
          Id: 3,
          Text: 'Where is the postcode?'
      }
      ]
    }
    console.log(res)
    return of (res);
  }
  public postQuestionAndAnswer(items:CreateQuestionAndAnswer):Observable<CreateQuestionAndAnswer>{
    return of(items);
  }
}
