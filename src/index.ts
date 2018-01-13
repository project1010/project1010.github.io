//console.log("tyo")
import { StudentModel } from './student.model';
export class Generator {
    static clickState = 0;
    studentData: StudentModel[] = [];
   // console.log("hello");
    constructor() {
        let button = document.getElementById("add");
        let sortButton = document.getElementById("sort");
        button.addEventListener("click", () => this.addData());
        sortButton.addEventListener("click", () => this.sortByMark());
    };

    public addData(): void{
        let itemId: string = this.guid();
        let name:string = (<HTMLInputElement>document.getElementById("name")).value;
        let mark:number = Number((<HTMLInputElement>document.getElementById("mark")).value);
        if(name != ""){    
            let studentObj = new StudentModel(itemId, name, mark);
            this.studentData.push(studentObj);
            localStorage.setItem("StudentDB", JSON.stringify(this.studentData));
            console.log(this.studentData);
            this.renderData();
        }
    }

    public renderData(): void{
        document.getElementById("main").innerHTML = "";
        this.clearForm();
        if(JSON.parse(localStorage.getItem("StudentDB"))){
            this.studentData = JSON.parse(localStorage.getItem("StudentDB"));        
        }
        console.log("localDB",this.studentData);
        for(let i = 0; i < this.studentData.length; i++){    
            var list = document.createElement("tr");
            list.innerHTML = '<td class="padding-16"><b>'+this.studentData[i].Name+'</b></td><td class="padding-16"><b>'+this.studentData[i].Marks+'</b></td>';            
            var deleteButton = document.createElement("input");
            deleteButton.className = "btn btn-danger";
            deleteButton.type = "button";
            deleteButton.value = "Delete";
            deleteButton.id = this.studentData[i].ItemId;
            deleteButton.addEventListener("click", (e:Event) => this.deleteData(e));
            var td = document.createElement("td");        
            td.appendChild(deleteButton);
            list.appendChild(td);            
            console.log(list);
            document.getElementById("main").appendChild(list);
        }
        this.showHide();
    }

    public deleteData(e:Event):void{
        var removeIndex = this.studentData.map(function(item) { return item.ItemId; }).indexOf(e.srcElement.id);
        this.studentData.splice(removeIndex,1);
        localStorage.setItem("StudentDB", JSON.stringify(this.studentData));
        this.renderData();
    }

    public sortByMark(): void{
        if (Generator.clickState == 0) {    
            this.studentData.sort(function(a,b){
                return b.Marks - a.Marks;
            })
            Generator.clickState = 1;
        } else {
            this.studentData.sort(function(a,b){
                return a.Marks - b.Marks;
            })
            Generator.clickState = 0;
        }
        localStorage.setItem("StudentDB", JSON.stringify(this.studentData));        
        this.renderData();                        
    }

    private showHide():void{
        let table = document.getElementById("main-table");        
        let noData = document.getElementById("no-data");        
        if(this.studentData.length == 0){
            table.style.display = "none";
            noData.style.display = "inherit";
        }else{
            table.style.display = "table";
            noData.style.display = "none";            
        }
    }

    private guid(): string {
        function s4() {
          return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
        }
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
          s4() + '-' + s4() + s4() + s4();
    }

    private clearForm(){
        (<HTMLInputElement>document.getElementById("name")).value = "";
        (<HTMLInputElement>document.getElementById("mark")).value = null;
    }
}

let generateData = new Generator();
generateData.renderData();

