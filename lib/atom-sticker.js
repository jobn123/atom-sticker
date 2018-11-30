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
    for (l in locals){
      console.log(locals[l]);
      this.ImageAlbum.push(locals[l]);
    }

    var stickersFolder = atom.config.get('atom-sticker.stickerFolder');
    this._recImgLoad(this._recImgLoad, this.ImageAlbum, stickersFolder, 0, "png");
    this._recImgLoad(this._recImgLoad, this.ImageAlbum, stickersFolder, 0, "gif");
    this._recImgLoad(this._recImgLoad, this.ImageAlbum, stickersFolder, 0, "tiff");
    this._recImgLoad(this._recImgLoad, this.ImageAlbum, stickersFolder, 0, "svg");
  },

  _recImgLoad(_self, imgAlbum, stickersFolder, i, extention){
    var potentialFile = stickersFolder + "\\" + i + "." + extention;
    var img = new Image();
    img.src = potentialFile;
    img.onload = function() {
      console.log(potentialFile);
      imgAlbum.push(potentialFile);
      _self(_self, imgAlbum, stickersFolder, i+1, "png");
      _self(_self, imgAlbum, stickersFolder, i+1, "gif");
      _self(_self, imgAlbum, stickersFolder, i+1, "tiff");
      _self(_self, imgAlbum, stickersFolder, i+1, "svg");
    };
  },

  _setImage(){
    this.ImageDiv.src = this.ImageAlbum[this.ImageIndex];
    this.ImageDiv.style.opacity = atom.config.get('atom-sticker.stickerOpacity');
  }

};
