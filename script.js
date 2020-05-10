console.log('Hello World!')

let noteForm = document.querySelector('#noteForm') //run document.querySelector('#noteForm')--> in console of browser
let noteList = document.querySelector('.notes')

//1. Add event listener for form submission
noteForm.addEventListener('submit',function(event){
    event.preventDefault() //Stops the page from reloading and lets the console show the event were trrying to show in the console
    //console.log(event)

    let noteTextInput = document.querySelector('#note-text')
    let noteText = noteTextInput.value
    //create the new todo item on the list (in the database)
    createNewNote(noteText)
})

//2. write the fetch request to post data, in its own function 
function createNewNote (newNote){
 fetch('http://localhost:3000/notes', {
    method: 'POST',
    headers: {'Content-Type' : 'application/json'},
    body: JSON.stringify({item: noteText, done: false, created: moment().format()})
})
.then(response => response.json())
.then(data => console.log(data))
}

//3. render the noteList using the data tha is now on the server
function renderNotes (){
    fetch('http://localhost:3000/notes', {
        method: 'GET'
    })
    .then(response => response.json())
    .then(function (data){
        //add the content to the DOM
        //create the ul
        //create an li for each item
        let list = document.createElement('ul')
        for (let item of data){
            let listItem = document.createElement('li')
            listItem.dataset.id = item.id
            listItem.innerText = item.item
            let deleteIcon = document.createElement('span')
            deleteIcon.id = 'delete'
            deleteIcon.classList.add('fa','fa-trash', 'mar-l-xs')
            listItem.appendChild(deleteIcon)
            list.appendChild(listItem)
        }
        
        noteList.appendChild(list)
    })
}

//4. Delete todo items

todoList.addEventListener('click', function(event){
    console.log(event.target)
    if (event.target.matches('#delete')){
        // console.log('DELETE')-- checking if delete shows up
        deleteNoteItem()
    }
})

function deleteNoteItem (itemId){
    fetch(`http://localhost:3000/notes/${itemId}`,{
    method: 'DELETE'
    })
    .then(response => response.json())
    .then(data => console.log(data))
}
renderNotes()

