function AllWalls(length, width){ //Создание и заполнение лабиринта стенами
  var lab = []
  for (i=0; i<length; i++){
    lab[i] = [];
    for(k=0; k<width; k++){
      lab[i][k] = 'wall';
    }
  }
  return lab;
}

function Valid(y,x){ //Проверка, чтобы не вышли за границы лабиринта (массива)
  if ((x>=0) && (y>=0) && (x <= 9) && (y <= 9)) 
    return true
  else
    return false
}

function PrimTest(y, x){
  if (Valid(y + 1, x) && (lab[y + 1][x] == 'wall')) extrawalls.push([y + 1, x, [y, x]]);
  if (Valid(y - 1, x) && (lab[y - 1][x] == 'wall')) extrawalls.push([y - 1, x, [y, x]]);
  if (Valid(y, x + 1) && (lab[y][x + 1] == 'wall')) extrawalls.push([y, x + 1, [y, x]]);
  if (Valid(y, x - 1) && (lab[y][x - 1] == 'wall')) extrawalls.push([y, x - 1, [y, x]]);
}


//Вывод массива (лабиринта) на страницу
function Show(lab){
  for (i=0; i<lab.length; i++){
    $('#lab').append('<div class="row" id ="row'+i+'"></div>')
    for (k=0; k<lab[i].length; k++){
      switch (lab[i][k]){
        case 0:
        case "empty":
          $('#row'+i).append('<div class="empty"></div>');
          break;

        case 1:
        case "wall":
          $('#row'+i).append('<div class="wall"></div>');
          break;

        case 2:
        case "win":
          $('#row'+i).append('<div class="win empty"></div>');
          break;

        case 3:
        case "start":
          $('#row'+i).append('<div class="start empty"></div>');
          break;
      }
    }
  }
}


//Алгоритм Прима
function PrimAlg(){
  while (extrawalls.length != 0){
    var randomWall = extrawalls[Math.floor(Math.random() * extrawalls.length)],  //Берём рандомную стену 
      host = randomWall[2], //Здесь храняться координаты предыдущей стены
      opposite = [(host[0] + (randomWall[0] - host[0]) * 2), (host[1] + (randomWall[1] - host[1]) * 2)]; //Находим противоположную стену
   

    if (Valid(opposite[0], opposite[1])){
      if (lab[opposite[0]][opposite[1]] == 'empty')  //Если противоположная стена пустая, то удаляем нащу стену из массива стен
        {
          extrawalls.splice(extrawalls.indexOf(randomWall), 1);
        }
      else {
        lab[opposite[0]][opposite[1]] = 'empty';
        lab[randomWall[0]][randomWall[1]] = 'empty';
        PrimTest(opposite[0], opposite[1]); 
      }
    } 
    else {
      extrawalls.splice(extrawalls.indexOf(randomWall), 1);
    }
  }
}

function Write(str1, str2, str3){  //функция для вывода текста, str1 - заголовок, str2(необязателен) - параграф
  $('#write_h1').html(str1);
  if (str2)
    $('#write_p').html(str2)
  if (str3)
    $('#write_i').html(str3)
}

function GetCell(x,y){ // получить ячейку (в html) по её координатам, начиная с (1, 1). В будущем будет использоваться только для смены цвета ячеек и добавления классов.
  cell = $('.row:nth-child('+x+')'+' div:nth-child('+y+')');
  return(cell);
}


function Cross(x1, y1, x2, y2){ //проверяем пересечение элементов.
  width1 = 10;
  width2 = 90;
  if ((((x1<x2+width1)&&(x2+width1<x1+width2)) || ((x1<x2)&&(x2<x1+width2))) && (((y1<y2+width1)&&(y2+width1<y1+width2)) || ((y1<y2)&&(y2<y1+width2))))
    return true
  else
    return false
}


function SetLevel(id){
  startplay = false;
  level = id;
  ShowTime(records[level], '#record');
  $('#lab').children().remove();
  $('.level').removeClass('active');
  if (id == -1){
    Write('Случайная карта');
    extrawalls = [];
    lab = AllWalls(10,10);
    lab[0][0] = 'empty';
    PrimTest(0, 0);
    PrimAlg();
    Show(lab);
    $('.level:nth-child(8)').addClass('active');
    GetCell(1,1).addClass('start active');
    GetCell(9,9).addClass('win');
  }
  else{
    Show(levels[id]);
    $('.start').addClass('active');
    id++;
    $('.level:nth-child('+id+')').addClass('active');
    Write('Уровень '+id);
  }
}


let time;
let flag;
let intervals;
var json_cookie = $.cookie('records');
let records;
if (json_cookie == null){
  records = [0, 0, 0, 0, 0, 0, 0, 0];
}
else{
  records = JSON.parse(json_cookie);
}
function StartTimer(){
  var date = new Date();
  time = date.getTime();
  flag = setInterval("TimeIncrement();",10);
}

function StopTimer(){
    clearInterval(flag);
    ShowTime(0,'#timer');
    if ((startplay) && ((records[level]>intervals) || (records[level]==0))){
      records[level] = intervals;
      var json_cookie = JSON.stringify(records);
      $.cookie('records', json_cookie);
    }
    time=0;
    intervals=0;
}

function ShowTime(milliseconds, place){
  var a=milliseconds%1000/10;
  var b=milliseconds%60000/1000;
  var c=milliseconds%3600000/60000;
  $(place + ' > .miliseconds').html((a<10)?('0'+Math.floor(a)):(Math.floor(a)));
  $(place + ' > .seconds').html((b<10)?('0'+Math.floor(b)):(Math.floor(b)));
  $(place + ' > .minutes').html((c<10)?('0'+Math.floor(c)):(Math.floor(c)));
}

function TimeIncrement(){
  date = new Date();
  intervals=date.getTime()-time;
  ShowTime(intervals, '#timer');
}




function Move(x,y){
  $('#me').offset({top: y, left: x});
  y2 = $('#me').offset().top;
  x2 = $('#me').offset().left;

  if (startplay){
    $('.wall').each(function(i){
      y1 = $(this).offset().top;
      x1 = $(this).offset().left;
      if (Cross(x1, y1, x2, y2)){
        $('.start').addClass('active');
        $('.win').removeClass('active');
        startplay = false;
        StopTimer();
      }
    });
    y1 = $('.win').offset().top;
    x1 = $('.win').offset().left;
    if (Cross(x1, y1, x2, y2)){
        StopTimer();
        $('.level.active').next().trigger('click');
    }
  }
  else{
    y1 = $('.start').offset().top;
    x1 = $('.start').offset().left;
    if (Cross(x1, y1, x2, y2)){
      $('.start').removeClass('active');
      $('.win').addClass('active');
      StartTimer();
      startplay = true;
    }
  }
}
