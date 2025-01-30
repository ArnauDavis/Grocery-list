
const deleteBtn = document.querySelectorAll('.fa-trash') // Selects all trash cans in DOM
const items = document.querySelectorAll('.item') // Selects all li elements (task boxes)

Array.from(deleteBtn).forEach((element) => {        
    element.addEventListener('click', deleteItem)  // Add event listener to the trash can
})

Array.from(items).forEach((element) => {             // Add event listener to the entire task box
    element.addEventListener('click', (e) => {
        if (e.target.classList.contains('fa-trash')) {
            return; // If the trash can was clicked, do nothing
        }

        // Mark task as complete or incomplete based on current state
        const itemText = e.currentTarget.querySelector('span').innerText;  // Get the task text
        const completed = e.currentTarget.querySelector('span').classList.contains('completed')

        if (completed) {
            markUnComplete(itemText); // If the task is completed, mark it as incomplete
        } else {
            markComplete(itemText);  // Otherwise, mark it as completed
        }
    })
})

async function deleteItem(e) {
    const itemText = e.target.parentNode.querySelector('span').innerText // Get task text
    try {
        const response = await fetch('deleteItem', {
            method: 'delete',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ 'itemFromJS': itemText })
        })
        const data = await response.json()
        console.log(data)
        location.reload() // Reload page after deletion
    } catch (err) {
        console.log(err)
    }
}

async function markComplete(itemText) {
    try {
        const response = await fetch('markComplete', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ 'itemFromJS': itemText })
        })
        const data = await response.json()
        console.log(data)
        location.reload() // Reload page after completion
    } catch (err) {
        console.log(err)
    }
}

async function markUnComplete(itemText) {
    try {
        const response = await fetch('markUnComplete', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ 'itemFromJS': itemText })
        })
        const data = await response.json()
        console.log(data)
        location.reload() // Reload page after uncompletion
    } catch (err) {
        console.log(err)
    }
}

document.addEventListener('DOMContentLoaded', function() {
    // Account for Tax functionality
    const accountForTaxBtn = document.getElementById('accountForTaxBtn')
    const totalCashSpan = document.getElementById('totalCash')
    const cashAfterTaxSpan = document.getElementById('cashAfterTax')

    if (accountForTaxBtn && totalCashSpan && cashAfterTaxSpan) {
        accountForTaxBtn.addEventListener('click', () => {
            const totalCash = parseFloat(totalCashSpan.innerText) // Get the current total cash
            if (!isNaN(totalCash)) {
                const cashAfterTax = totalCash + (totalCash * 0.07) // Add 7% tax
                cashAfterTaxSpan.innerText = cashAfterTax.toFixed(2) // Display the result with two decimal places
            } else {
                cashAfterTaxSpan.innerText = '0.00' // Default if totalCash is invalid
            }
        });
    }
})
