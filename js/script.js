let tableHead = document.getElementById("tableHead")
let tableBody = document.getElementById("tableBody")


class calculatedCols {
    constructor(){
        this.name
    }
}


numberG = 0
// class graphs {
//     constructor(){
//         this.abs = "A"
//         this.ord = "A"
//         this.line = true
//         this.scatter = true
//         this.id = ++numberG
//     }
//     update = function(abs,ord){
//         this.abs = abs
//         this.ord = ord
//     }
//     generateHTML = function(){
        
//     }

// }


let gridEnabled = document.getElementById("gridEnabled")
let chosenX = document.getElementById("X")
let chosenY = document.getElementById("Y")

document.getElementById("btnGenerate").onclick = () => {
    let line = ""
    table.columns.forEach( (col) =>  {
        line += col.id + "=np.array(" + JSON.stringify(col.content.map(function(x){
            let newVal = parseFloat(x.replace(',','.'));
            if (isNaN(newVal)){
                return "np.NaN"
            }else{
                return newVal
            }})).replaceAll('\"','') + ")\n" });
    texte = `
    <pre>
    <code>
import matplotlib.pyplot as plt 
import numpy as np

${line}

#Paramètres d'affichage`

texte += `
${ document.getElementById("title").value != "" ? `plt.title("${document.getElementById("title").value}",fontsize=${document.getElementById("title_fontsize").value})` : "" }
${ gridEnabled.checked ? "plt.grid(True)" : ""}
${document.getElementById("linesEnable").checked ? `plt.plot(${chosenX.options[chosenX.selectedIndex].value},${chosenY.options[Y.selectedIndex].value})` : ""}
${document.getElementById("pointsEnable").checked ? `plt.scatter(${chosenX.options[chosenX.selectedIndex].value},${chosenY.options[Y.selectedIndex].value})` : ""}
plt.xlabel("${table.findById(chosenX.value).title}")
plt.ylabel("${table.findById(chosenY.value).title}")

#On affiche le graphe
plt.show() 
</code>
</pre> 
        `;



    document.getElementById("output").innerHTML = texte;
}



