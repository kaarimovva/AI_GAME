class gamestruct{

    constructor()
    {
        this.stringarr = ["1","1","2","2","2","2","2"];
        this.playerscore = 6;
        this.aiscore = 6;
    }


    finstatus()
    {
        if(this.stringarr.length==1)
        {
            return true;
        }
        else
        {
            return false;
        }
    }


    linstatus(ply)
    {
        if(this.stringarr.length==1)
        {
            if(ply == 1) 
            {
                if(this.playerscore < this.aiscore)
                {
                    return true;
                }
                else{
                    return false;
                }
            }
            if(ply == 2)
            {
                if(this.playerscore > this.aiscore)
                {
                    return true;
                }
                else{
                    return false;
                }
            }
        }
        else{
            return false;
        }
    }

    gamedraw()
    {
        if(this.stringarr.length==1)
        {
            if(this.playerscore == this.aiscore)
            {
                return true;
            }
            else{
                return false;
            }
        }
        else{
            return false;
        }
    }

    gameplay(ply,num)
    {
        var ins;
        if(this.stringarr.includes(num))
        {
            ins = this.stringarr.indexOf(num);
            this.stringarr.splice(ins,1);
            if(ply == 1)
            {
                this.aiscore = this.aiscore - Number(num);
            }
            if(ply == 2)
            {
                this.playerscore = this.playerscore - Number(num);
                console.log("Player Score is: "+String(this.playerscore));
            }
            if(this.finstatus())
            {
                if(this.playerscore > this.aiscore)
                {
                    console.log("Player win")
                    return 7;
                }
                else if(this.playerscore < this.aiscore)
                {
                    console.log("Ai win")
                    return 7;
                }
                else{
                    console.log("Draw")
                    return 7;
                }
            }
            gamedt.stringarr.sort();
        }
        else{
            console.log("String Cannot be found!");
            return 3;
        }
    }

    playermove(num)
    {
        var k;
        k = this.gameplay(2,num);
        if(k == 7)
        {
            printdet();
        }
        else{
            this.compmove();
            return;
        }
    }

    compmove()
    {
        var bst = -100;
        var bestmove = '';
        var num;
        var temnm;
        for(num in this.stringarr)
        {
            temnm = this.stringarr[num];
            var ins = this.stringarr.indexOf(temnm);
            this.stringarr.splice(ins,1);
            this.aiscore = this.aiscore - Number(temnm);
            var score = this.minimax(false);
            this.stringarr.push(temnm);
            this.aiscore = this.aiscore + Number(temnm);
            if(score > bst)
            {
                bst = score;
                bestmove = temnm;
            }
        }
        console.log("comp choose"+bestmove);
        this.gameplay(1,bestmove);
        return;
    }
    minimax(im)
    // This function is actually placed in a loop for all elements in Compmove. It will check the status and returns normal, like how we create state space graphs
    // This function will choose all the possible moves and creates a statespace graph and with the suitable quality of the choice.
    // Which you can see in the following
    {
        console.log(this.stringarr);
        var bst; //Variable which is used as for finding the suitable path, initially determined as a random negative
        var ins; //For getting the index of string
        var score; //Variable which the value changes after iterations according to the suitable quality of the outcomes
        var num; //For each string values 
        var temnm; //Temporary for NUM
        if(this.linstatus(1)) 
        {
            return 1; //If the path reaches to outcome where the AI has won it will return 1
        }
        else if(this.linstatus(2))
        {
            return -1; //If the path reaches to outcome where the Human has won it will return -1
        }
        else if(this.gamedraw())
        {
            return 0; //If the path reaches to outcome of draw it will return 0
        }
        //THe part down stimulates all the player and Computer movements.
        if(im)
        {
            bst = -100;
            for(num in this.stringarr)
            {
                temnm = this.stringarr[num];
                ins = this.stringarr.indexOf(temnm);
                this.stringarr.splice(ins,1);
                this.aiscore = this.aiscore - Number(temnm);
                score = this.minimax(false);
                this.stringarr.push(temnm);
                this.aiscore = this.aiscore + Number(temnm);
                if(score > bst)
                {
                    bst = score;
                }
            }                
            return bst;
        }
        else{
            bst = 100
            for(num in this.stringarr)
            {
                temnm = this.stringarr[num];
                ins = this.stringarr.indexOf(temnm);
                this.stringarr.splice(ins,1);
                this.playerscore = this.playerscore - Number(temnm);
                score = this.minimax(true);
                this.stringarr.push(temnm);
                this.playerscore = this.playerscore + Number(temnm);
                if(score > bst)
                {
                    bst = score;
                }
            }
            return bst;
        }
    }
}

gamedt = new gamestruct();

function getstrii()
{
    var stri = '';
    for(num in gamedt.stringarr)
    {
        stri = stri + gamedt.stringarr[num];
    }
    return stri;
}

function printdet()
{
    console.log(gamedt.hmv);
    document.getElementById("strscr").innerHTML = getstrii();
    document.getElementById("compscr").innerHTML = "Computer : "+String(gamedt.aiscore);
    document.getElementById("humscr").innerHTML = "Human : "+String(gamedt.playerscore);
    if(gamedt.stringarr.length <=1)
    {
        document.getElementById("btnplc").innerHTML = " ";
        if(gamedt.aiscore > gamedt.playerscore)
        {
            document.getElementById("gmlog").innerHTML = "AI Has won the game";
        }
        else if(gamedt.aiscore < gamedt.playerscore)
        {
            document.getElementById("gmlog").innerHTML = "Human Has won the game";
        }
        else{
            document.getElementById("gmlog").innerHTML = "The Game has drawn!";
        }   
    }
    if(gamedt.finstatus())
    {
        if(gamedt.linstatus(1))
        {
            document.getElementById("gmlog").innerHTML = "AI Has won the game";
        }
        else if(gamedt.linstatus(2))
        {
            document.getElementById("gmlog").innerHTML = "Human Has won the game";
        }
        else if(gamedt.gamedraw())
        {
            document.getElementById("gmlog").innerHTML = "The Game has drawn!";
        }
    }
    else{
        document.getElementById("gmlog").innerHTML = "Choose Appropriate number";
        if(gamedt.stringarr.includes("1") && gamedt.stringarr.includes("2"))
        {
            document.getElementById("btnplc").innerHTML = '<div class="item1"><button class="btns fourthh" onclick="btnclick('+'1'+')">1</button></div>\n<div class="item2"><button class="btns fourthh" onclick="btnclick('+'2'+')">2</button></div>';
        }
        else if(gamedt.stringarr.includes("1"))
        {
            document.getElementById("btnplc").innerHTML = '<div class="item1"><button class="btns fourthh" onclick="btnclick('+'1'+')">1</button></div>';
        }
        else if(gamedt.stringarr.includes("2"))
        {
            document.getElementById("btnplc").innerHTML = '<div class="item1"><button class="btns fourthh" onclick="btnclick('+'2'+')">2</button></div>';
        }
    }
}

function clickchoice(num)
{
    if(num == 1)
    {
        gamedt.compmove();
    }
    bodyeditor();
    printdet();
}

function btnclick(num)
{
    gamedt.playermove(String(num));
    printdet();
}

function bodyeditor()
{
    document.getElementsByTagName('body')[0].innerHTML = '<div class = "gametable">\n<div class = "text text-2" id="strscr"></div>\n</div>\n<center>\n<div class = "scoreboard">\n<a class="animate-charcter"> SCOREBOARD</a>\n<h1><p class = "effect-shine" id ="compscr"></p></h1>\n<h1><p class = "effect-shine" id = "humscr"></p></h1>\n<p id="gmlog"></p>\n</div>\n</center>\n<div class="grid-container" id="btnplc">\n</div>\n<center><button class="btns fourthh" onclick="window.location.reload();">Restart</button></center>';
}