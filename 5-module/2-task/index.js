function toggleText() {
  let triggerBtn = document.querySelector('.toggle-text-button');
  let toggledText = document.querySelector('#text');
  // console.log(toggledText, triggerBtn);
  triggerBtn.addEventListener('click', () => {
    toggledText.toggleAttribute('hidden');
  })
}
