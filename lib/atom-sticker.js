'use babel';

import AtomStickerView from './atom-sticker-view';
import { CompositeDisposable } from 'atom';

export default {

  atomStickerView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.atomStickerView = new AtomStickerView(state.atomStickerViewState);
    this.elem = this.atomStickerView.getElement();
    document.querySelector('.workspace').appendChild(this.elem);
    // this.modalPanel = atom.workspace.addModalPanel({
    //   item: this.atomStickerView.getElement(),
    //   visible: false
    // });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'atom-sticker:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.atomStickerView.destroy();
  },

  serialize() {
    return {
      atomStickerViewState: this.atomStickerView.serialize()
    };
  },

  toggle() {
    console.log('AtomSticker was toggled!');
    // return (
    //   this.modalPanel.isVisible() ?
    //   this.modalPanel.hide() :
    //   this.modalPanel.show()
    // );
    if(this.elem.style.display == 'block') {
      this.elem.style.display = 'none';
    } else {
      this.elem.style.display = 'block';
    }
  }

};
