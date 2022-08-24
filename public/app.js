let addButton=document.getElementById('addButton');
let clearButton=document.getElementById('clearButton');
let title=document.getElementById('title');
let toDoContainer = document.getElementById('toDoContainer');
let inputText = document.getElementById('inputText');
let install=document.getElementById('install');
installContainer=document.querySelector('.app-download-container');
const installButton = document.getElementById('app-download');
var items = document.querySelectorAll("inputText");

let counter=0;
const List=[];
var i=0;
var a = 0;  

let deneme=document.getElementById('deneme');
var pIndex;
counter=getCounter();


let loadedTask=document.getElementById("toDoContainer");


db.collection('tasks').add({
  id: -1, 
  name:counter,
}
)


/*

window.onload = function() {
  
  console.log('sayfa yenilendi');
  toDoContainer.innerHTML="bbbbbb";
  getTasks();
}*/


addButton.addEventListener('click',function(){
  index++;
  console.log('add butona basıldı');
 
  let paragraph = document.createElement('p');
  paragraph.classList.add('paragraph-styling');
  paragraph.innerHTML = inputText.value;  
  List[counter]=inputText.value;
  let data = List.slice(',')


  db.collection('tasks').add({
      id: counter, 
      name:data[counter],
    }
    )
    

  toDoContainer.appendChild(paragraph)
  inputText.value="";




  paragraph.addEventListener('dblclick',function(){
    console.log('double-clicked')
/*        let index = db.collection('tasks').findIndex(task=>task.id===id)*/
   pIndex = List.indexOf(this.innerHTML);
    toDoContainer.removeChild(paragraph);

   db.collection('tasks')
   .doc({ id: pIndex})
   .delete()
   .then(response => {
     console.log('Delete successful, now do something.')
   })
   .catch(error => {
     console.log('There was an error, do something else.')
   })


   db.collection('tasks').doc({ id:index }).get().then(document => {
    console.log(document.id)
  //  db.collection('tasks').doc({ id: document.id }).delete();
  //document.id.delete();

   });

   });

  paragraph.addEventListener('click',function(){
  console.log('one-clicked')
  paragraph.style.textDecoration= 'line-through';
 });

 counter++;

 counterUpdate(counter);


 /* clearButton.addEventListener('click',function(){
  paragraph.style.display='none';
 
});*/
})



let beforeInstallPromptEvent
window.addEventListener("beforeinstallprompt", function(e) {
    e.preventDefault();
    beforeInstallPromptEvent = e
    installButton.style.display = 'block'
    install.style.display='block'
    installButton.addEventListener("click", function() {
        e.prompt();
    });
    installButton.hidden = false;
    install.hidden=false;

   
});

installButton.addEventListener("click", function() {
    beforeInstallPromptEvent.prompt();
});
let index=-1;





clearButton.addEventListener('click', function(){
    console.log('clear butonuna basıldı');
    db.collection('tasks')
  .delete()
  .then(response => {
    console.log('Delete successful, now do something.')
  })
  .catch(error => {
    console.log('There was an error, do something else.')
  })
});

deneme.addEventListener('click',function(){
    console.log('deneme butonuna basıldı');
    toDoContainer.innerHTML="";
    getTasks();
})



function  getTasks(){
 

 counter= getCounter();

  console.log("counterrr: "+ counter);

      
  try {
    console.log("-1")
      for(var i=0;i<getCounter();i++){  //counter
        console.log("1");

        let paragraph2 = document.createElement('p');
      

        paragraph2.classList.add('paragraph-styling-two');
        console.log("2")

          db.collection('tasks').doc({ id:i }).get().then(document => {
            console.log(document.name)
        paragraph2.innerHTML = document.name;  
        List[i]=document.name;

  toDoContainer.appendChild(paragraph2)
  //inputText.value="";
  console.log("3")

  paragraph2.addEventListener('dblclick',function(){
      console.log('double-clicked-paragraph2' ,i)
      pIndex = List.indexOf(this.innerHTML);
      toDoContainer.removeChild(paragraph2);
  
     db.collection('tasks')
     .doc({ id: pIndex})
     .delete()
     .then(response => {
      console.log("4")
       console.log('Delete successful, now do something.')
     })
     .catch(error => {
       console.log('There was an error, do something else.')
     })
      toDoContainer.removeChild(paragraph2);
      //db.delete(removeChild(paragraph2));


     

      
      db.collection('tasks')
  .doc({ id: i})
  .delete((parseInt( db.collection('tasks')
  .doc.getAttribute('id'))))
  .then(response => {
    console.log("5")
    console.log('Delete successful, now do something.')
  })
  .catch(error => {
    console.log('There was an error, do something else.')
  })


  

    
     })   ;
  paragraph2.addEventListener('click',function(){
  console.log('one-clicked-paragraph2')
  paragraph2.style.textDecoration= 'line-through';
 });

 /* clearButton.addEventListener('click',function(){
  paragraph2.style.display='none';

});*/
})

      }

  }
  catch(error) {
    console.log('error: ', error)
  }
};


function counterUpdate(counter){
  db.collection('tasks').doc({ id: -1 }).update({
    name:counter
  })

}



function getCounter(){

  db.collection('tasks').doc({ id: -1 }).get().then(document => {
    console.log(document)
    counter=document.name;
  })
  return counter;
}

window.addEventListener('load', (event) => {
  console.log('page is fully loaded');

 // toDoContainer.innerHTML="aaaaaa";
  counter=getCounter();
  getTasks();


});