import { Component , OnInit} from '@angular/core';
import { QUIZ } from './app.mock_quiz';
import * as $ from 'jquery';
import * as createjs from 'createjs-module';
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
  title = 'quiz me'
  quiz = QUIZ
  apiRoot: string = "http://httpbin.org"
  public selection:     any
  public selected:      boolean
  public right:         any
  public wrong:         any
  public win:           any
  public won:           any
  public btn:           any
  public num:           any
  public numquestions:  any
  public audio_context: any;
  public stored_buffer: any;



  constructor(private http: HttpClient) {

    this.selected       = false
    this.selection      = []
    this.win            = []
    this.right          = []
    this.wrong          = []
    this.won            = []
    this.btn            = []
    this.num            = 0
    this.numquestions   = 10
  //  var AudioContext = AudioContext || webkitAudioContext;
console.log('ok')
  console.log(AudioContext)
  console.log('ok')
    this.audio_context = new AudioContext();


  }




  loadDingSound() {


       this.stored_buffer = null;

        if (this.stored_buffer) {  // attempt to retrieve stored file

            console.log('playing audio from localForage');

            this.playSound(this.stored_buffer);

        } else {

            var request = new XMLHttpRequest();

            var audio_url = "assets/right.mp3"; // relative path to reach mp3 file

            request.open('GET', audio_url, true); // loading local file for now
            request.responseType = 'arraybuffer';
//var buffer = request.response
console.log(request)

var ac = this.audio_context



            // Decode asynchronously
            request.onload = function() {

ac.decodeAudioData(request.response, function(buffer) {

    this.stored_buffer = buffer; // store buffer for replay later

    //this.playSound(buffer);
    var source = ac.createBufferSource(); // creates a sound source
    source.buffer = buffer;                    // tell the source which sound to play
console.log(source)
    source.connect(ac.destination);       // connect source to speakers
    source.start(0);

});

            };
            request.send();
        }
    }



  playSound(buffer) {

        var source = this.audio_context.createBufferSource(); // creates a sound source
        source.buffer = buffer;                    // tell the source which sound to play
    console.log(source)
        source.connect(this.audio_context.destination);       // connect source to speakers
        source.start(0);                           // play the source now
    }






  play(name) {
this.loadDingSound()
      //createjs.Sound.play(name);

      //console.log(this.audio_context)
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

  animate(question): void{
      var sel='#validate'   + question.id
      var timeanim = 50
      $(sel).animate({
          'left': '+=5px'
      }, timeanim);
      $(sel).animate({
        'left': '-=10px'
    }, timeanim);
      $(sel).animate({
        'left': '+=10px'
    }, timeanim);
      $(sel).animate({
        'left': '-=10px'
    }, timeanim);
      $(sel).animate({
        'left': '+=5px'
    }, timeanim);
  }

  // click on validate button
  validate(question, event) {
//var ok = this.http.get('http://httpbin.org/get').subscribe(resp => {
    // Here, resp is of type HttpResponse<MyJsonData>.
    // You can inspect its headers:
  //  console.log(resp);
    // And access the body directly, which is typed as MyJsonData as requested.

  //});

    this.play('right')

    this.animate(question)

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

    if (won === true) {
        this.num ++
        this.play('right')
    }
    else
    {
        this.play('wrong')
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

      return 'gagné ! ' + this.num + ' / ' + this.numquestions
    }
    else
    {
      return 'perdu ! ' + this.num + ' / ' + this.numquestions
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
  }
  ngOnInit(){


   }
}
