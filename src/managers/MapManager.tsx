import { Position } from '@rnmapbox/maps/lib/typescript/src/types/Position';
import Mapbox, { CameraStop, MapView } from '@rnmapbox/maps';
import { RefObject } from 'react';

export class MapManager {
  viewRef: RefObject<MapView> | null = null;
  cameraRef: RefObject<Mapbox.Camera> | null = null;
  refetchPins: (filters: any) => Promise<any[]> = async () => [];
  setPinsToMap: (pins: any[]) => void = () => {};

  static instance: MapManager;

  static getInstance() {
    if (!MapManager.instance) {
      MapManager.instance = new MapManager();
    }
    return MapManager.instance;
  }

  static getZoom() {
    const viewRef = MapManager.getInstance().viewRef;
    if (viewRef && viewRef.current) {
      return viewRef.current.getZoom();
    }
    return 0;
  }

  static registerView(viewRef: RefObject<MapView>) {
    MapManager.getInstance().viewRef = viewRef;
  }
  static registerCamera(cameraRef: RefObject<Mapbox.Camera>) {
    MapManager.getInstance().cameraRef = cameraRef;
  }

  static registerRefetchPins(refetchPins: (filters: Partial<any>) => Promise<any[]>, setPins: (pins: any[]) => void) {
    MapManager.getInstance().refetchPins = refetchPins;
    MapManager.getInstance().setPinsToMap = setPins;
  }

  static flyTo() {
    const cameraRef = MapManager.getInstance().cameraRef;
    if (cameraRef && cameraRef.current) {
      cameraRef.current.flyTo([9.6772698, 45.6982642], 1000);
    }
  }
  static setCamera({ position, ...rest }: Partial<CameraStop> & { position: Position }) {
    if (!position || !position[0] || !position[1]) {
      return;
    }
    const cameraRef = MapManager.getInstance().cameraRef;
    if (cameraRef && cameraRef.current) {
      const cameraStop = {
        centerCoordinate: position,
        // bounds: CameraBoundsWithPadding,
        heading: 0,
        pitch: 0,
        zoomLevel: 14,
        // padding: CameraPadding,
        animationDuration: 1500,
        ...rest,
        // animationMode?: CameraAnimationMode;
      };
      cameraRef.current.setCamera(cameraStop);
    }
  }

}
