'use babel';

export default class AtomStickerView {

  constructor(serializedState) {
    // Create root element
    this.element = document.createElement('div');
    this.element.classList.add('atom-sticker');

    // Debugging? // ---
    const message = document.createElement('div');
    message.textContent = 'The Atom-Sticker package is Alive! Have Fun!';
    message.classList.add('message');
    this.element.appendChild(message);
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
