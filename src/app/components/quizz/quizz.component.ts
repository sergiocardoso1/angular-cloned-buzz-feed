import { Component, OnInit } from '@angular/core';
import quizzquestions from "../../../assets/data/quizzquestions.json";

@Component({
  selector: 'app-quizz',
  templateUrl: './quizz.component.html',
  styleUrls: ['./quizz.component.css']
})
export class QuizzComponent implements OnInit{

  title:string = "";
  question:any;
  questionSelectd:any;

  answers:string[] = [];
  answersSelectd:string = "";

  questionIndex:number = 0;
  questionMaxIndex:number = 0;

  finished:boolean = false;

  constructor(){

  }

  ngOnInit(): void {
    if(quizzquestions){
      this.finished = false;
      this.title = quizzquestions.title;

      this.question = quizzquestions.questions;
      this.questionSelectd = this.question[this.questionIndex];
      this.questionIndex = 0;
      this.questionMaxIndex = this.question.length;

    }
  }

  playerChoose(value:string){
    this.answers.push(value);
    this.nextStep();

  }

  async nextStep(){
    this.questionIndex +=1;
    if(this.questionMaxIndex > this.questionIndex){
      this.questionSelectd = this.question[this.questionIndex]
    }else{
      const finalAnswer:string = await this.checkResult(this.answers);
      this.finished = true;
      this.answersSelectd = quizzquestions.results[finalAnswer as keyof typeof quizzquestions.results];
    }
  }

  async checkResult(anwsers:string[]){
    const result = anwsers.reduce((previous, current, i, arr) => {
      if(
        arr.filter(item => item === previous).length >
        arr.filter(item => item === current).length)
        {
          return previous;
      }else{
        return current;
      }
    })
    return result;
  }

}
