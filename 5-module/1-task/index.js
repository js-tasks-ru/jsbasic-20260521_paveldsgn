function hideSelf() {
  let hiddenBtn = document.querySelector('.hide-self-button');
  
  hiddenBtn.addEventListener('click', () => {
    hiddenBtn.hidden = true;
  })
}
