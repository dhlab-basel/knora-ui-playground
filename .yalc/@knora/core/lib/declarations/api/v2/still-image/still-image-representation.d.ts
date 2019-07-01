import { ReadStillImageFileValue } from '../../../';
import { ImageRegion } from './image-region';
/**
 * Represents an image including its regions.
 */
export declare class StillImageRepresentation {
    readonly stillImageFileValue: ReadStillImageFileValue;
    readonly regions: ImageRegion[];
    readonly type: string;
    /**
     *
     * @param {ReadStillImageFileValue} stillImageFileValue a [[ReadStillImageFileValue]] representing an image.
     * @param {ImageRegion[]} regions the regions belonging to the image.
     */
    constructor(stillImageFileValue: ReadStillImageFileValue, regions: ImageRegion[], type?: string);
}
