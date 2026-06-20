// import { createElement } from "react";

/**
 * Компонент, который реализует таблицу
 * с возможностью удаления строк
 *
 * Пример одного элемента, описывающего строку таблицы
 *
 *      {
 *          name: 'Ilia',
 *          age: 25,
 *          salary: '1000',
 *          city: 'Petrozavodsk'
 *      }
 *
 */
export default class UserTable {
    constructor(rows) {
    this.rows = rows;
    this.elem = document.createElement("table");
    this.render();
  }

  render() {
    this.elem.innerHTML = "";

    this.elem.appendChild(this.createHeader());
    this.elem.appendChild(this.createBody());
  }

  createHeader() {
    const thead = document.createElement("thead");
    const headerRow = document.createElement("tr");
    const firstRow = this.rows[0];

    Object.keys(firstRow).forEach((key) => {
      const th = document.createElement("th");
      th.innerText = key;
      headerRow.appendChild(th);
    });

    thead.appendChild(headerRow);
    return thead;
  }

  createBody() {
    const tbody = document.createElement("tbody");

    this.rows.forEach((rowData, index) => {
      const row = document.createElement("tr");

      Object.keys(rowData).forEach((key) => {
        row.appendChild(this.createCell(rowData[key]));
      });
      row.appendChild(this.createDeleteButton(index));

      tbody.appendChild(row);
    });

    return tbody;
  }

  createCell(content) {
    const cell = document.createElement("td");
    cell.innerText = content;
    return cell;
  }

  createDeleteButton(index) {
    const td = document.createElement("td");
    td.innerHTML = "<button>X</button>";
    td.dataset.index = index;
    td.addEventListener("click", () => td.closest('tr').remove());
    return td;
  }
}
