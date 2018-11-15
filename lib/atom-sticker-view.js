'use babel';

export default class AtomStickerView {

  constructor(serializedState) {
    // Create sticker message
    const message = document.createElement('div');
      message.classList.add('atom-sticker-message');
      message.textContent = 'The Atom-Sticker package is Alive! Have Fun!';

    // Create sticker image
    const sticker = document.createElement('img');
      sticker.classList.add('atom-sticker-image');

    // Create root element
    this.element = document.createElement('div');
      this.element.classList.add('atom-sticker');
      // this.element.appendChild(message);
      this.element.appendChild(sticker);
  }

  // Returns an object that can be retrieved when package is activated
  serialize() {}

  // Tear down any state and detach
  destroy() {
    this.element.remove();
  }

  getElement() {
    return this.element;
  }

}
