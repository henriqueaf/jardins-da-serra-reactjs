import { findNearest, isPointInPolygon } from 'geolib';
import quatrains from '../../database/quatrain_allotments.json';
import condominiumPolygon from '../../database/condominium_polygon.json';
import { Allotment, Quatrain } from './types';
import { GeolibInputCoordinates } from 'geolib/es/types';

const allotments = quatrains.map((quatrain) => quatrain.allotments).flat();

export const getNearestAllotment = (
  gepoint: GeolibInputCoordinates
): Allotment => findNearest(gepoint, allotments) as Allotment;

export const getQuatrainByAllotment = (
  allotment: Allotment
): Quatrain | undefined =>
  quatrains.find((quatrain) => {
    return quatrain.allotments.includes(allotment);
  });

export const isPointInsideCondominium = (
  geopoint: GeolibInputCoordinates
): boolean => isPointInPolygon(geopoint, condominiumPolygon);
