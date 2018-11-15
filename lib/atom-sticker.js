'use babel';

import AtomStickerView from './atom-sticker-view';
import { CompositeDisposable } from 'atom';

export default {

  _AtomStickerView: null,
  _ModalPanel: null,
  _Subscriptions: null,

  activate(state) {
    this._AtomStickerView = new AtomStickerView(state.atomStickerViewState);
    this.elem = this._AtomStickerView.getElement();
    document.querySelector('.workspace').appendChild(this.elem);

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this._Subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this._Subscriptions.add(atom.commands.add('atom-workspace', {
      'atom-sticker:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this._ModalPanel.destroy();
    this._Subscriptions.dispose();
    this._AtomStickerView.destroy();
  },

  serialize() {
    return {
      atomStickerViewState: this._AtomStickerView.serialize()
    };
  },

  toggle() {
    console.log('Atom-Sticker was toggled!');

    if(this.elem.style.display == 'block') {
      this.elem.style.display = 'none';
    } else {
      this.elem.style.display = 'block';
    }
  }

};
