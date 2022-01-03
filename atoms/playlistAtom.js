import { atom } from 'recoil';

export const playlistState = atom({
  key: "playlistState",
  default: null,

});

export const playlistIdState = atom({
  key: "playlistIdState",
  default: '37i9dQZF1DXdLEN7aqioXM',

});

export const isLikedSongState = atom({
  key: "isLikedSongState",
  default: false,
});
