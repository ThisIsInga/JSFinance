document.addEventListener('DOMContentLoaded', loadEntries);

//будет вызываться при отправке формы.
function addEntry(event) {
    event.preventDefault(); //Отменяет стандартное поведение формы (перезагрузку страницы).
    
    const income = parseFloat(document.getElementById('income').value) || 0;
    const expenses = parseFloat(document.getElementById('expenses').value) || 0;
    const total = income - expenses; // (доход - расходы).

    const entry = {
        income,
        expenses,
        total,
        date: new Date().toLocaleString(),
    };

    saveEntry(entry); //Сохраняет запись в локальное хранилище.
    displayEntry(entry); //Отображает запись в списке на странице.
    updateTotalSum(); // Обновляем общую сумму

    document.getElementById('entryForm').reset(); // Сбрасываем форму
}

function saveEntry(entry) {
    const entries = getEntries(); //Получает текущие записи из локального хранилища.
    entries.unshift(entry); // Добавляем новую запись в начало массива
    localStorage.setItem('financialEntries', JSON.stringify(entries)); //Сохраняет обновленный массив записей в локальное хранилище.
}

function getEntries() { //получения записей.
    return JSON.parse(localStorage.getItem('financialEntries')) || [];
}

function displayEntry(entry) { //Определяет функцию для отображения записи.
    const entryList = document.getElementById('entryList');
    const listItem = document.createElement('li');
    listItem.textContent = `Дата: ${entry.date}, Доход: ${entry.income}, Расходы: ${entry.expenses}, Итого: ${entry.total}`;

    // Создаем кнопку удаления
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Удалить';
    deleteButton.onclick = () => deleteEntry(entry);

    listItem.appendChild(deleteButton); // Добавляем кнопку к элементу списка
    entryList.prepend(listItem); // Добавление элемента в начало списка
}

function loadEntries() {
    const entries = getEntries(); //Получает записи из локального хранилища.
    entries.forEach(displayEntry); // Отображаем все записи
    updateTotalSum(); // Обновляем общую сумму при загрузке
}

function updateTotalSum() { //для обновления общей суммы.
    const entries = getEntries();
    const totalSum = entries.reduce((sum, entry) => sum + entry.total, 0); // Вычисляет общую сумму всех записей.
    document.getElementById('totalSum').textContent = totalSum; // Обновляем отображение общей суммы
}

function deleteEntry(entryToDelete) { //для удаления записи.
    let entries = getEntries();
    entries = entries.filter(entry => entry.date !== entryToDelete.date); //Фильтрует записи, удаляя ту, которую нужно удалить.
    localStorage.setItem('financialEntries', JSON.stringify(entries)); // Сохраняем обновленный массив
    document.getElementById('entryList').innerHTML = ''; // Очищаем список
    entries.forEach(displayEntry); // Перерисовывает список с оставшимися записями.
    updateTotalSum(); // Обновляем общую сумму
}