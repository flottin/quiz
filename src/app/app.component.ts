import { Component , OnInit} from '@angular/core';
import { QUIZ } from './app.mock_quiz';
import * as $ from 'jquery';
import {Injectable} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

@Injectable()
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'quiz me';

  quiz = QUIZ
 apiRoot: string = "http://httpbin.org";
  public selection:any;
  public selected:boolean
  public right: any;
  public wrong:any;
  public win: any;
  public won: any;
  public btn: any;



  constructor(private http: HttpClient) {
    this.selected   = false
    this.selection  = [];
    this.win        = [];
    this.right      = [];
    this.wrong      = [];
    this.won      = [];
    this.btn      = [];

  }

  //count win
  countWin(win): number{
    var countWin = 0;
    win.forEach(
      function (ele){
        if ("true" === ele)
        {
          countWin++;
        }
      }
    )
    return countWin;
  }

  // click on validate button
  validate(question, event) {
//var ok = this.http.get('http://httpbin.org/get').subscribe(resp => {
    // Here, resp is of type HttpResponse<MyJsonData>.
    // You can inspect its headers:
  //  console.log(resp);
    // And access the body directly, which is typed as MyJsonData as requested.

  //});

  $('.validate').animate({
      'left': '+=5px'
  }, 100);
  $('.validate').animate({
    'left': '-=10px'
  }, 100);
  $('.validate').animate({
    'left': '+=10px'
  }, 100);
  $('.validate').animate({
    'left': '-=10px'
  }, 100);
  $('.validate').animate({
    'left': '+=5px'
  }, 100);

    var ind         = 0
    var i           = 0
    var win         = question.win
    var won = false
    var wrong       = false
    if(event.target.classList.contains('wrong'))
        return false
    if(event.target.classList.contains('right'))
        return false
    this.selected   = true

    for (ind = 0 ; ind < win.length ; ind++)
    {
      if ("true" === win[ind])
      {
          if (this.selection.indexOf(question.id+'-'+ind)>-1)
          {
              won =  true
          }
          else
          {
              won = false
              break
          }
      }
      else
      {
          if (this.selection.indexOf(question.id+'-'+ind)>-1)
          {
              won = false
              break
          }
          else
          {
              won =  true
          }
      }
    }

    this.won[question.id] = won
    this.btn      = [];
    for (ind = 0 ; ind < win.length ; ind++)
    {
      if ("true" === win[ind])
      {
        this.right.push(question.id+'-'+ind)
      }
      if ("false" === win[ind])
      {
        this.wrong.push(question.id+'-'+ind)
      }
    }
  }

  getBtn(question){
    if(typeof this.won[question.id] === 'undefined')
    {
        return 'valider';
    }
    else if (true == this.won[question.id])
    {
      return 'gagné !'
    }
    else
    {
      return 'perdu !'
    }
  }


  // find class selected won and failed
  getClass(question, i): string {
    var id = question.id+'-'+i
    var win = question.win
    var className = '';
    if(typeof this.won[question.id] !== 'undefined')
    {
        //return false
    }
    if (this.selection.indexOf(id)>=0)
    {
        className += 'select ';
    }
    if (this.right.indexOf(id)>=0)
    {
      className += 'right ';
    }
    if (this.wrong.indexOf(id)>=0)
    {
      className += 'wrong ';
    }
    return className;
  }

  //id=question.id, win=question.win
  getWin(question): string {
    if(typeof this.won[question.id] === 'undefined')
        return ''
    if (true == this.won[question.id])
        return 'right';
    else
        return 'wrong'
  }

  // make selection
  onSelect(question, i) {
    var id         = question.id+'-'+i
    var win       = question.win
    if(typeof this.won[question.id] !== 'undefined')
    {
        return false
    }

    var countWin  = this.countWin(win)
    if (countWin === 1)
    {
      this.selection.forEach(
        function (ele, index, object){
          var questionId = id.split('-')
          if(ele.indexOf(questionId[0]+'-') > -1)
          {
            object.splice(index, 1);
          }
        }
      )
      this.selection.push(id)
    }
    else
    {
      if (this.selection.indexOf(id) == -1)
        this.selection.push(id)
      else
        this.selection.splice(this.selection.indexOf(id), 1)
    }
//console.log(this.selected)
  }
  ngOnInit(){


   }
}
