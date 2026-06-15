function highlight(table) {
  let tableRows = table.querySelectorAll('tbody tr');

  let ageCell;
  let genderCell;
  let statusCell;
  for(let prop of tableRows) {
    ageCell = prop.cells[1].textContent;
    genderCell = prop.cells[2].textContent;
    statusCell = prop.cells[3].getAttribute('data-available');

    let ageNumber = Number(ageCell);
    if (ageNumber < 18) {
      prop.style.textDecoration = 'line-through';
    }
    if (genderCell === 'm') {
      prop.classList.add('male');
    } else if (genderCell === 'f') {
      prop.classList.add('female');
    }
    if (statusCell === 'true') {
      prop.classList.add('available');
    } else if (statusCell === 'false') {
      prop.classList.add('unavailable');
    } else {
      prop.hidden = true;
    }
  }
}
