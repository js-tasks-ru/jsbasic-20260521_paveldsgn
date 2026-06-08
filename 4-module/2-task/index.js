function makeDiagonalRed(table) {
  for(let i = 0; i < table.rows.length; i++) {
    // console.log(table.rows[i].cells[i]);
    table.rows[i].cells[i].style.backgroundColor = 'red';
  }
}
