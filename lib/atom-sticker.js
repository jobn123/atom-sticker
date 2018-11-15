'use babel';

import AtomStickerSettings from './config-schema'
import AtomStickerView from './atom-sticker-view';
import { CompositeDisposable } from 'atom';

export default {

  Subscriptions: null,
  config: AtomStickerSettings,

  AtomStickerView: null,

  ImageDiv: null,
  ImageAlbum: [],
  ImageIndex: 0,

  activate(state) {

    this.AtomStickerView = new AtomStickerView(state.atomStickerViewState);
    this.elem = this.AtomStickerView.getElement();
    document.querySelector('.workspace').appendChild(this.elem);

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.Subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.Subscriptions.add(atom.commands.add('atom-workspace', {
      'atom-sticker:toggle': () => this.toggle()
    }));
    // Register command that chooses another image
    this.Subscriptions.add(atom.commands.add('atom-workspace', {
      'atom-sticker:cycle-new': () => this.cycle_new()
    }));

    this.ImageDiv = this.elem.querySelector('.atom-sticker-image');
  },

  deactivate() {
    this.Subscriptions.dispose();
    this.AtomStickerView.destroy();
  },

  serialize() {
    return {
      atomStickerViewState: this.AtomStickerView.serialize()
    };
  },

  toggle() {
    if(this.elem.style.display == 'block') {
      this.elem.style.display = 'none';
    } else {
      this._loadImages();
      this._setImage();
      this.elem.style.display = 'block';
    }

    console.log('Atom-Sticker: Toggled['+ this.elem.style.display +']');
  },

  cycle_new() {
    this.ImageIndex = (this.ImageIndex + 1) % this.ImageAlbum.length;
    this._setImage();

    console.log('AtomSticker: CycledImage[' + this.ImageIndex + ']');
  },


  // Helper Functions // ---
  _loadImages() {
    var locals = atom.config.get('atom-sticker.stickerLocations');

    console.log(locals);

    for (l in locals){
      console.log(locals[l]);
      this.ImageAlbum.push(locals[l]);
    }
  },

  _setImage(){
    this.ImageDiv.src = this.ImageAlbum[this.ImageIndex];
    this.ImageDiv.style.opacity = atom.config.get('atom-sticker.stickerOpacity');
  }

};
