document.addEventListener('DOMContentLoaded', loadEntries);

function addEntry(event) {
    event.preventDefault();
    
    const income = parseFloat(document.getElementById('income').value) || 0;
    const expenses = parseFloat(document.getElementById('expenses').value) || 0;
    const total = income - expenses;

    const entry = {
        income,
        expenses,
        total,
        date: new Date().toLocaleString(),
    };

    saveEntry(entry);
    displayEntry(entry);
    updateTotalSum(); // Обновляем общую сумму

    document.getElementById('entryForm').reset(); // Сбрасываем форму
}

function saveEntry(entry) {
    const entries = getEntries();
    entries.unshift(entry); // Добавляем новую запись в начало массива
    localStorage.setItem('financialEntries', JSON.stringify(entries));
}

function getEntries() {
    return JSON.parse(localStorage.getItem('financialEntries')) || [];
}

function displayEntry(entry) {
    const entryList = document.getElementById('entryList');
    const listItem = document.createElement('li');
    listItem.textContent = `Дата: ${entry.date}, Доход: ${entry.income}, Расходы: ${entry.expenses}, Итого: ${entry.total}`;

    // Создаем кнопку удаления
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Удалить';
    deleteButton.onclick = () => {
        deleteEntry(entry);
        entryList.removeChild(listItem); // Удаляем элемент из списка
    };

    listItem.appendChild(deleteButton); // Добавляем кнопку в элемент списка
    entryList.prepend(listItem); // Добавление элемента в начало списка
}

function loadEntries() {
    const entries = getEntries();
    entries.forEach(displayEntry); // Отображаем все записи
    updateTotalSum(); // Обновляем общую сумму при загрузке
}

function updateTotalSum() {
    const entries = getEntries();
    const totalSum = entries.reduce((sum, entry) => sum + entry.total, 0);
    document.getElementById('totalSum').textContent = totalSum; // Обновляем отображение общей суммы
}

function deleteEntry(entryToDelete) {
    const entries = getEntries();
    const updatedEntries = entries.filter(entry => entry.date !== entryToDelete.date || entry.income !== entryToDelete.income || entry.expenses !== entryToDelete.expenses);
    localStorage.setItem('financialEntries', JSON.stringify(updatedEntries));
    updateTotalSum(); // Обновляем общую сумму после удаления
}