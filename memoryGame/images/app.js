
window.onload=function() {



var sw=20,sh=20,tr=30,td=30;//a square width height and role clum
var snake=null;//蛇的实例
//square constructive function
 var Square=function(x,y,classname){
    //0,0= 0,0 
    // 20,0= 1,0
    //40,0= 2,0
    this.x=x*sw;//square width
    this.y=y*sh;//square height
    this.class=classname;
    this.viewContent=document.createElement("div");//square DOM element
    this.viewContent.className=this.class;
    this.parent=document.getElementById('snakeWrap');//square father

}
//create square DOM
Square.prototype.create=function(){
    this.viewContent.style.position="absolute";
    this.viewContent.style.width=sw+'px';
    this.viewContent.style.height=sh+'px';
    this.viewContent.style.left=this.x+'px';
    this.viewContent.style.top=this.y+'px';
    this.parent.appendChild(this.viewContent);//add to page
}
//remove food element
Square.prototype.remove=function(){
    this.parent.removeChild(this.viewContent);
}
//snake
function Snake(){
    this.head=null;//store snake head inform
    this.tail=null;//store snake tile inform
    this.pos=[]//store snake position inform
    this.directionNum={
        //store snake direction use an object
        left:{
            x:-1,
            y:0
        },
        right:{
            x:1,
            y:0
        },
        up:{
            x:0,
            y:-1
        },
        down:{
            x:0,
            y:1
        }
    }

}
Snake.prototype.init=function(){//init 用来初始化
    //create snake head
    var snakeHead=new Square(2,0,'snakeHead')
    snakeHead.create(); 
    this.head=snakeHead;//store snakeHead inform
    this.pos.push([2,0])//把蛇头的位置存起来
    //创建蛇身体1
    var snakeBody1=new Square(1,0,'snakeBody')
    snakeBody1.create();
    this.pos.push([1,0])//蛇身体1的坐标存起来

    //创建第二个蛇身体
    var snakeBody2=new Square(0,0,'snakeBody')
    snakeBody2.create();
    this.tail=snakeBody2;//把蛇尾的信息存起来
    this.pos.push([0,0])//蛇身体1的坐标存起来
    //形成链表关系
    snakeHead.last=null;
    snakeHead.next=snakeBody1;
    //snakeBody1
    snakeBody1.last=snakeHead;
    snakeBody1.next=snakeBody2;
    //snakeBody2
    snakeBody2.last=snakeBody1;
    snakeBody2.next=null;
    //添加一条属性表示蛇走的默认方向
    this.direction=this.directionNum.right//默认往右走


};
//添加一个方法 用来获取蛇头下一个位置对应元素
Snake.prototype.getNextPos=function(){
    var nextPos=[
        this.head.x/sw+this.direction.x,
        this.head.y/sh+this.direction.y
    ]
    //下个点撞到自己 游戏结束
    var selfCollid=false;
    this.pos.forEach(function(value){
if(value[0]==nextPos[0]&&value[1]==nextPos[1]){
//如果数组中的两个数据都相等 说明下一个点在蛇身上找到
    selfCollid=true;
}
    }) 
    if(selfCollid){
        console.log('crash')
        this.strategies.die()
        return
    }

    //下个点撞墙 游戏结束
    if(nextPos[0]<0||nextPos[1]<0||nextPos[0]>td-1||nextPos[1]>tr-1){
        console.log('crash wall')
        this.strategies.die()
        return
    }

    //下个点是食物  吃掉
    // this.strategies.eat();


    //下个点没有任何东洗  继续走
   this.strategies.move.call(this);

    
};

//碰撞后发生的事
Snake.prototype.strategies={
move:function(){
    console.log('move')
    console.log(this)
},
eat:function(){
    console.log('eat')
},
die:function(){
    console.log('die')
},
}
snake=new Snake();
snake.init();
snake.getNextPos();


}