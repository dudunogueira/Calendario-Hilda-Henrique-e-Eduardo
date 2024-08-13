const holidays = {
    '01-01': 'Ano Novo',
    '25-12': 'Natal',
    '07-09': 'Independência do Brasil',
    '12-10': 'Nossa Senhora Aparecida',
    '15-11': 'Proclamação da República',
    // Adicione outros feriados aqui
};

const today = new Date();
let currentMonth = today.getMonth();
let currentYear = today.getFullYear();

const monthNames = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];

const prevMonthBtn = document.getElementById('prev-month');
const nextMonthBtn = document.getElementById('next-month');
const prevYearBtn = document.getElementById('prev-year');
const nextYearBtn = document.getElementById('next-year');
const monthYearDisplay = document.getElementById('month-year');
const calendarBody = document.getElementById('calendar-body');

function loadCalendar(month, year) {
    calendarBody.innerHTML = '';
    monthYearDisplay.textContent = `${monthNames[month]} ${year}`;

    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    let date = 1;
    for (let i = 0; i < 6; i++) {
        let row = document.createElement('tr');

        for (let j = 0; j < 7; j++) {
            let cell = document.createElement('td');
            if (i === 0 && j < firstDay) {
                cell.classList.add('empty');
            } else if (date > daysInMonth) {
                break;
            } else {
                let cellText = document.createTextNode(date);
                let dateKey = `${String(date).padStart(2, '0')}-${String(month + 1).padStart(2, '0')}`;
                
                cell.appendChild(cellText);
                if (dateKey in holidays) {
                    cell.classList.add('holiday');
                    cell.title = holidays[dateKey];
                }
                
                if (date === today.getDate() && year === today.getFullYear() && month === today.getMonth()) {
                    cell.classList.add('today');
                }

                date++;
            }
            row.appendChild(cell);
        }

        calendarBody.appendChild(row);
    }
}

prevMonthBtn.addEventListener('click', () => {
    currentMonth--;
    if (currentMonth < 0) {
        currentMonth = 11;
        currentYear--;
    }
    loadCalendar(currentMonth, currentYear);
});

nextMonthBtn.addEventListener('click', () => {
    currentMonth++;
    if (currentMonth > 11) {
        currentMonth = 0;
        currentYear++;
    }
    loadCalendar(currentMonth, currentYear);
});

prevYearBtn.addEventListener('click', () => {
    currentYear--;
    loadCalendar(currentMonth, currentYear);
});

nextYearBtn.addEventListener('click', () => {
    currentYear++;
    loadCalendar(currentMonth, currentYear);
});

// Carrega o calendário inicial
loadCalendar(currentMonth, currentYear);
