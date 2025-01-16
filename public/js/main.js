const deleteBtn = document.querySelectorAll('.fa-trash') //selects all trash cans in dom
const item = document.querySelectorAll('.item span') //selects all spans inside a li
const itemCompleted = document.querySelectorAll('.item span.completed') //selects all spans inside a li with a class of completed

Array.from(deleteBtn).forEach((element)=>{        //adds an event listener to every trash can
    element.addEventListener('click', deleteItem)
})

Array.from(item).forEach((element)=>{             //adds an event listener to every item span
    element.addEventListener('click', markComplete)
})

Array.from(itemCompleted).forEach((element)=>{   //adds an event listener to every item span with the class of completed
    element.addEventListener('click', markUnComplete)
})

async function deleteItem(){
    //const itemText = this.parentNode.childNodes[1].innerText
    const itemText = this.parentNode.querySelector('span').innerText // added an easier to read way to select the innerText of the span
    try{
        const response = await fetch('deleteItem', {            //this is deleting what matches the itemText from the eventListener
            method: 'delete',                                   //this is being sent to server.js with intructions that this is a delete request
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              'itemFromJS': itemText
            })
          })
        const data = await response.json()
        console.log(data)
        location.reload()           //this refreshes the page after the deleting

    }catch(err){
        console.log(err)
    }
}

async function markComplete(){
    //const itemText = this.parentNode.childNodes[1].innerText
    const itemText = this.parentNode.querySelector('span').innerText // added an easier to read way to select the innerText of the span
    try{
        const response = await fetch('markComplete', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                'itemFromJS': itemText                      // here is is where we select the text inside the li span
            })
          })
        const data = await response.json()
        console.log(data)
        location.reload()

    }catch(err){
        console.log(err)
    }
}

async function markUnComplete(){
    //const itemText = this.parentNode.childNodes[1].innerText
    const itemText = this.parentNode.querySelector('span').innerText // added an easier to read way to select the innerText of the span
    try{
        const response = await fetch('markUnComplete', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                'itemFromJS': itemText              // here is is where we select the text inside the li span
            })
          })
        const data = await response.json()
        console.log(data)
        location.reload()

    }catch(err){
        console.log(err)
    }
}