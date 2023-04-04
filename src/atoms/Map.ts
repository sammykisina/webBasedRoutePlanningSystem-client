import { atom } from 'recoil';

const showPathMarkerState = atom({
  key: 'showPathMarkerState',
  default: false,
});

const showAddStopWidgetState = atom({
  key: 'showAddStopWidgetState',
  default: false,
});

const directionResponseState = atom<google.maps.DirectionsResult | null>({
  key: 'directionResponseState',
  default: null,
});

const mapAtoms = {
  showPathMarkerState,
  showAddStopWidgetState,
  directionResponseState,
};

export default mapAtoms;
