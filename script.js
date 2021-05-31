'use strict'

const openModal = () => document.querySelector('#modal')
    .classList.add('active')

const closeModal = () => document.querySelector('#modal')
    .classList.remove('active')

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

const createRow = (client, index) => {
    const recordClient = document.querySelector('#tabelaClientes tbody')
    const newTr = document.createElement('tr')
    newTr.innerHTML = `
        <td>${client.nome}</td>
        <td>${client.placa}</td>
        <td>${client.entrada}</td>
        <td>${client.saida}</td>
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
    document.querySelector('#entrada').value =''
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
  
        closeModal()
  
        clearInput()
   
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
    document.querySelector('#placa').value = db[index].email
    document.querySelector('#entrada').value = db[index].celular
    document.querySelector('#saida').value = db[index].cidade
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

document.querySelector('#preco')
    .addEventListener('click', openModal)

document.querySelector('#close')
    .addEventListener('click', () => { closeModal(); clearInput() })

document.querySelector('#cancelar')
    .addEventListener('click', () => { closeModal(); clearInput() })

document.querySelector('#salvar')
    .addEventListener('click', () => { saveClient() })

document.querySelector('#salvar1')
    .addEventListener('click', () => { saveClient() })

document.querySelector('#tabelaClientes')
    .addEventListener('click', actionButttons)

updateTable ()