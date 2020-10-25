let col1 = new Column("Ordonnées",["0","1","2"]);
let col2 = new Column("Abscisses",["1","1","2"]);

let table = {
    columns: [col1,col2],
    maxSize: 3,
    populate: function () {
        document.getElementById("titleLine").innerHTML = "";
        document.getElementById("titleEdit").innerHTML = "";
        document.getElementById("colDel").innerHTML = "";
        document.getElementById("tableBody").innerHTML = "";
        for (let i=0; i<this.maxSize; i++){
            //Generates all the lines
            document.getElementById("tableBody").innerHTML += `<tr id="line_${i}"></tr>`;
        }
        this.columns.forEach(  (col) => col.populate(this.maxSize)  );
        for (let i=0; i<this.maxSize; i++){
            document.getElementById(`line_${i}`).innerHTML += `<td><button type="button" onclick="table.delLine(${i})">-</button></td>`;
            document.getElementById(`line_${i}`).innerHTML += `<td><button type="button" onclick="table.insertAfter(${i})">+</button></td>`;
        }
        this.updateChoice();
    },
    findById: function(id){
        for (let i = 0; i < this.columns.length; i++) {
            if (this.columns[i].id == id){
                return this.columns[i];
            }
        }
        return "";
    },
    //col.updateTitles foreach col
    updateTitles: function(){
        this.columns.forEach( (col) => col.updateTitle());
    },
    appendCol: function(col){
        this.columns.push(col);
        this.maxSize = Math.max(this.maxSize,col.length);
    },
    addCol: function (){
        let l = new Array(this.maxSize);
        l.fill("");
        this.columns.push(new Column("Nouvelle Colonne",l));
        this.populate();
    },
    //deletes column by index and updates the table (this.populate())
    delColIndex: function(index){
        let c = this.columns[index];
        this.columns = this.columns.slice(0,index).concat(this.columns.slice(index+1));
        this.maxSize = Math.max(this.maxSize,c.content.length);
        this.populate();
    },
    //deletes column by id
    delColId: function(id){
        for (let i=0; i< this.columns.length; i++){
            if (this.columns[i].id == id){
                this.delColIndex(i);
            }
        }
    },
    addLine: function(){
        this.columns.forEach((col)=>col.append("") );
        tableBody.innerHTML+=`<tr id="line_${this.maxSize}"></tr>`;
        this.maxSize++;
        this.populate();
    },
    delLine: function(index){
        this.columns.forEach( (col) => col.rm(index) );
        tableBody.removeChild(tableBody.lastChild);
        this.maxSize--;
        this.populate();
    },
    insertAfter: function(index){
        this.columns.forEach( (col) => col.insertAfter(index));
        tableBody.innerHTML += `<tr id="line_${this.maxSize}"></tr>`;
        this.maxSize++;
        this.populate();
    },
    //Value is retrieved from the correct cell
    set: function(id,index){
        for (let i=0; i< this.columns.length; i++){
            if (this.columns[i].id == id){
                this.columns[i].set(index,document.getElementById(id+'_'+index).value);
            }
        }
    },
    updateChoice : function(){
        list = "";
        this.columns.map((col) => col.id).forEach((id) => list+= `<option value="${id}">${id}</option>\n`);
        document.getElementById("X").innerHTML = list;
        document.getElementById("Y").innerHTML = list;
    }
}

table.populate();
