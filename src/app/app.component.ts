import { Component, OnChanges, OnInit } from '@angular/core';
import { QuestionsService } from './services/questions.service';
import { map, takeUntil, mergeMap } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Question } from './models/question';
import { ResultQuestion } from './models/result';
import { CreateQuestionAndAnswer } from './models/question-answer';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent{
  public res:ResultQuestion|undefined = undefined
  private readonly unsubscribe$: Subject<void> = new Subject<void>();
  public selectedQuestionId?:number
  selectionMode:boolean = false;

  constructor(private readonly questionsService: QuestionsService){
  }
  
  ngOnInit(){
    this.questionsService.getQuestions().pipe(
      takeUntil(this.unsubscribe$)
      ).subscribe((result:ResultQuestion)=>{
        this.res = result;
      })
  }

  public ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  ngAfterViewInit() {
    let item = document.getElementById('info')?.getElementsByTagName('div')[0];
    let items;
    if(item) items = item.querySelectorAll("div b, div span, span");

    if(items)
      for (let i = 0; i < items.length; i++) {
        items[i].classList.toggle('someinfo');
        items[i].addEventListener("click", (event:Event)=>{
          this.selectAnswer((<HTMLElement>(event.target)).innerText)});
      }
  }

  selectQuestion(question:Question){
    this.selectedQuestionId = question.Id;
    this.turnSelectionMode(true)
  }
  public selectAnswer(answer:string){
    if(this.selectionMode){
      let model:CreateQuestionAndAnswer={
        questionId:this.selectedQuestionId!,
        selectedText:answer
      }
      this.questionsService.postQuestionAndAnswer(model).subscribe(
        (result)=>{
          alert("Question Id: "+this.selectedQuestionId+"\nAnswer: "+answer)
        }
      )
      this.turnSelectionMode(false)
    }
  }

  turnSelectionMode(isOn:boolean){
    this.selectionMode = isOn;
    if(isOn) document.getElementById('main')?.classList.toggle("selectionmode");
    else document.getElementById('main')?.classList.remove("selectionmode");
  }

}
