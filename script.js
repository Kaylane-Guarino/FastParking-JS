'use strict' 

// const readDB = () => JSON.parse(localStorage.getItem('db')) ?? []
const readDB = () => JSON.parse(localStorage.getItem('db')) ?? []
const setDB = (db) => localStorage.setItem('db', JSON.stringify(db))


const insertDB = (client) => {
    const db = readDB()
    db.push(client)
    setDB(db)
}

const updateClient = (client, index) => {
    const db = readDB()
    db[index] = client
    setDB(db)
}


const clearTable = () => {
    const recordClient = document.querySelector('#tabelaClientes tbody')
    while (recordClient.firstChild) {
        recordClient.removeChild(recordClient.lastChild)
    }
}

var data = new Date()

var dia = String(data.getDate()).padStart(2, '0')

var mes = String(data.getMonth() + 1).padStart(2, '0')

var ano = data.getFullYear()

const dataAtual = dia + '/' + mes + '/' + ano

var hora = data.getHours()
var min = data.getMinutes()

const horaEntrada = hora + ":" + min

console.log(dataAtual, horaEntrada)

const createRow = (client, index) => {
    const recordClient = document.querySelector('#tabelaClientes tbody')
    const newTr = document.createElement('tr')
    newTr.innerHTML = `
        <td>${client.nome}</td>
        <td>${client.placa}</td>
        <td>${client.dataAtual}</td>
        <td>${client.horaEntrada}</td>
        <td>R$15,00</td>
        <td>
            <button type='button' class='button blue' data-action="editar-${index}">editar</button>
            <button type='button' class='button red' data-action="deletar-${index}">deletar</button>
        </td>
    `
    recordClient.appendChild(newTr)
} 

const updateTable = () => {
    clearTable ()
    const db = readDB()
    db.forEach(createRow)
}

const clearInput = () => {
    document.querySelector('#nome').value = ''
    document.querySelector('#placa').value = ''
    document.querySelector('#entrada').value = ''
    document.querySelector('#saida').value = ''
}

const isValidForm = () => document.querySelector('.form').reportValidity()

const saveClient = () => {

    if (isValidForm()) {

        const newClient = {
            nome: document.querySelector('#nome').value,
            placa: document.querySelector('#placa').value,
            entrada: document.querySelector('#entrada').value,
            saida: document.querySelector('#saida').value
        }

        const index = document.querySelector('#nome').dataset.index

        if (index == '') {
            insertDB(newClient)
        } else {
            updateClient(newClient, index)
        }

        updateTable()

    }
}


const deleteClient = (index) => {
    const db = readDB()
    const resp = confirm(`Deseja realmente deletar ${db[index].nome}?`)
    
    if (resp) {
        db.splice(index, 1)
        setDB(db)
        updateTable()
    }
}

const editClient = (index) => {
    const db = readDB()
    document.querySelector('#nome').value = db[index].nome
    document.querySelector('#placa').value = db[index].placa
    document.querySelector('#nome').dataset.index = index
    openModal();
}

const actionButttons = (event) => {
    const element = event.target
    if (element.type === 'button') {
        const action = element.dataset.action.split('-')
        if (action[0] === 'deletar') {
            deleteClient(action[1])
        } else (
            editClient (action[1])
        )
    }
}

document.querySelector('#cancelar')
    .addEventListener('click', () => { clearInput() })

document.querySelector('#salvar')
    .addEventListener('click', saveClient)

document.querySelector('#tabelaClientes')
.addEventListener('click', actionButttons)

updateTable()