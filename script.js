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
    entryList.prepend(listItem); // Добавление элемента в начало списка
}

function loadEntries() {
    const entries = getEntries();
    entries.forEach(displayEntry); // Отображаем все записи
}
