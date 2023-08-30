let RamObj = {
    "id": 0,
      "name": "",
      "restaurant": "",
      "image": "",
      "rating": 0,
      "comment": ""
}
// write your code here
const ramMenu = document.querySelector('#ramen-menu')
const ramDisRating = document.querySelector('#rating-display')
const ramDisComment = document.querySelector('#comment-display')
const ramDisplay = document.querySelector('ramen-detail')
const ramDisName = document.querySelector('#ramen-detail .name')

fetch('http://localhost:3000/ramens')
    .then(resp => resp.json())
    .then(data => {
        data.forEach(element => {
            // const RImg = document.createElement('img')
            // RImg.src = element.image
            // ramMenu.append(RImg)
            addRamen(element)

        });
        displayRamen(data[0]);
    })

function addRamen (Robj) {
    const RImg = document.createElement('img')
    const delbtn = document.createElement('button')
    delbtn.textContent = "delete left"
    RImg.src = Robj.image
    ramMenu.append(RImg, delbtn)
    RImg.addEventListener('click', () => {
        displayRamen(Robj)
    })
    delbtn.addEventListener('click', () => {
        RImg.remove()
        delbtn.remove()
        deleteRamen(Robj)
    })
    document.querySelector('#edit-ramen').addEventListener('submit', e => {
        if(Robj.name === ramDisName.textContent) {
            Robj.rating = ramDisRating.textContent
            Robj.comment = ramDisComment.textContent
            updateRamen(Robj)
        }
    })
}

function displayRamen (Robj) {
    document.querySelector('#ramen-detail .detail-image').src = Robj.image
    document.querySelector('#ramen-detail .name').textContent = Robj.name
    document.querySelector('#ramen-detail .restaurant').textContent = Robj.restaurant
    ramDisRating.textContent = Robj.rating
    ramDisComment.textContent = Robj.comment
}

function addNewRamen (Robj) {
    addRamen(Robj)
    fetch('http://localhost:3000/ramens',{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify(Robj)
    })
        .then(resp => resp.json())
        .then(data => console.log(`added ${Robj.name}`))
}

function updateRamen (Robj) {
    fetch(`http://localhost:3000/ramens/${Robj.id}`, {
        method:'PATCH',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify(Robj)
    })
        .then(resp => resp.json())
        .then(data => console.log(data))
}

function deleteRamen (Robj) {
    console.log(`Deleting ${Robj.name}`)
    fetch(`http://localhost:3000/ramens/${Robj.id}`, {
        method:'DELETE',
        headers:{
            'Content-Type':'application/json'
        }
    })
}

document.querySelector('#new-ramen').addEventListener('submit', e => {
    // e.preventDefault()
    const newRamen = {}
    newRamen.name = document.querySelector('#new-name').value
    newRamen.restaurant = document.querySelector('#new-restaurant').value
    newRamen.image = document.querySelector('#new-image').value
    newRamen.rating = document.querySelector('#new-rating').value
    newRamen.comment = document.querySelector('#new-comment').value
    addNewRamen(newRamen)
})

document.querySelector('#edit-ramen').addEventListener('submit', e => {
    // e.preventDefault()
    ramDisRating.textContent = document.querySelector('#new-rating-edit').value
    ramDisComment.textContent = document.querySelector('#new-comment-edit').value
})