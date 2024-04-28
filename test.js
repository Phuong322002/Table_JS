let getData = "http://localhost:3000/infor"
let tdElement = document.querySelector('tr')
let btnElement = document.querySelector('#btn-add')
console.log(btnElement)
console.log(tdElement)

function start(){
        dislayData()
            .then(function(data){
                render(data)
            })
            create()
}
start()

function dislayData() {
 return fetch(getData)
            .then(function(response){
                    return response.json()
            })
            .then(function(data){
                    return data
            })

}

function render(data) {
var tbodyElement = document.querySelector('tbody')
var i = 1
var display = data.map(function(stu){
        return`<tr>
                <td>${i++}</td>
                <td>${stu.id}</td>
                <td>${stu.name}</td>
                <td>${stu.email}</td>
                <td><button class="btn-delete" onclick= handleDelete(${stu.id})>DELETE</button></td>
        </tr>
        `
})
tbodyElement.innerHTML = display.join('')
}

function handleCreate(obj) {
    fetch(getData, {
        method: 'POST',
        headers: {
                "Content-Type": "application/json",
              },
        body: JSON.stringify(obj), 
  })
  .then(function(response){
        return response.json()
  })
  .then(function(){
                dislayData()
                  .then(function(data){
                        render(data)
                  })
  })
}

function create() {
 const id = document.querySelector('input[name="id-stu"]')
 const name = document.querySelector('input[name="name-stu"]')
 const email = document.querySelector('input[name="email-stu"]')

btnElement.onclick = function(e){
        console.log(Number.isNaN(id.value*1))
        if(Number.isNaN(id.value*1)=== false){
                let obj = {
                        id: id.value,
                        name: name.value,
                        email: email.value
                 }
                 handleCreate(obj)
                 const empty = document.querySelectorAll('input')
                 for(var value of empty){
                        value.value = ""
                 }
        }else{
          alert(`${id.value} isn't a number!`)    
          const empty = document.querySelectorAll('input')
          for(var value of empty){
                 value.value = ""  
          }
        }
}
}

function handleDelete(id) {
        fetch(getData + '/' + id, {
                method: 'DELETE',
                headers: {
                        "Content-Type": "application/json",
                }
        })      
        .then(function(response){
                return response.json()
        })
        .then(function(){
                dislayData()
                        .then(function(data){
                                render(data)
                        })
        })

}

function updateStu(){
      dislayData()
        .then(function(data){
                
                console.log(data)
                

        })
}


// var arr= [1,2,3]
// console.log(arr.hasOwnProperty(i))

var test = document.querySelector('input[name="id-stu"]')
test.onchange = function(e){
        console.log(e.target.checked)
}