//Static variables for Column
var colSeed = 65;
var colCount = 0;
class Column {
    constructor(title,content){
        this.title = title;
        this.id = String.fromCharCode(colSeed+colCount);
        colCount++;
        this.content = content;
    }
    //static count=0
    //static seed= 65
    //Until : populates the table from line_0 to line_{until-1}
    populate(until){
        document.getElementById("titleLine").innerHTML += `<th id="title_${this.id}"> ${this.title} (${this.id}) </th>`;
        document.getElementById("titleEdit").innerHTML += `<th> <input type="text" id="name_${this.id}" value="${this.title}" onfocusout="table.updateTitles()"> </th>`;
        document.getElementById("colDel").innerHTML += `<th> <button type="button" onclick="table.delColId('${this.id}')" id="del_${this.id}">SUPPRIMER COLONNE</button> </th>`;
        for (let i = 0; i < until; i++){
            document.getElementById(`line_${i}`).innerHTML += `<td><input type="text" onfocusout="table.set('${this.id}',${i})" id="${this.id}_${i}" value=${this.content[i] === undefined ? "" : this.content[i]}></td>`;
        }
    }
    //gets the user defined title, updates the column object and the title display
    updateTitle(){
        this.title = document.getElementById(`name_${this.id}`).value;
        document.getElementById(`title_${this.id}`).innerHTML= `${this.title} (${this.id})`;
    }
    //sets the content[id] to value
    set(index,value){
        if (index < this.content.length){
            this.content[index]=value;
        }
    }
    //clears out the index-th value in the list
    clear(index) {
        this.set(index,"");
    }
    //adds a value at the end of the list
    append(value){
        this.content.push(value);
    }
    //removes the index-th value in the list
    rm(index){
        if (index < this.content.length){
            this.content = this.content.slice(0,index).concat(this.content.slice(index+1));
        }
    }
    //inserts a "" after the index-th term
    insertAfter(index){
        if (-1 < index < this.content.length){
            this.content.splice(index,0,"");
            //this.content = this.content.splice(0,index+1).concat([undefined]).concat(this.content.splice(index))
        }
    }

}