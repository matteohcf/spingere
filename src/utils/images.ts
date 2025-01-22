import ImageCropPicker from "react-native-image-crop-picker";
import _ from "lodash";
import { OdinImageType } from "../types/odin.ts";
import FastImage from "react-native-fast-image";
import { EventType } from "../types/event.ts";
import { Disco } from "../types/disco.ts";

export const openGalleryImagePicker = async (
  cropping?: boolean,
  freeStyleCropEnabled?: boolean
) => {
  try {
    const image = await ImageCropPicker.openPicker({
      height: 2000,
      width: 2000,
      mediaType: "photo",
      cropping: cropping,
      includeExif: true,
      freeStyleCropEnabled,
    });
    if (image) {
      return {
        sourceURL: image.sourceURL || image.path,
      };
    }
    return null;
  } catch (e) {
    console.log({ errorGallery: e });
    return null;
  }
};
export const openCameraImagePicker = async (
  cropping?: boolean,
  freeStyleCropEnabled?: boolean
) => {
  try {
    const image = await ImageCropPicker.openCamera({
      height: 2000,
      width: 2000,
      mediaType: "photo",
      cropping: cropping,
      includeExif: true,
      freeStyleCropEnabled,
    });
    if (image) {
      return {
        sourceURL: image.sourceURL || image.path,
        ...image,
      };
    }
    return null;
  } catch (e) {
    console.log({ errorGallery: e });
    return null;
  }
};

interface OdinImageParams {
  image?: OdinImageType;
  format?: "full" | "medium" | "squared";
  placeholder?: any;
}

export const getOdinImage = ({
  image,
  format = "medium",
  placeholder,
}: OdinImageParams) => {
  if (_.get(image, "thumbnail.squared") && format === "squared") {
    return { uri: _.get(image, "thumbnail.squared") };
  }
  if (_.get(image, "thumbnail.medium") && format === "medium") {
    return { uri: _.get(image, "thumbnail.medium") };
  }
  if (_.get(image, "full") && format === "full") {
    return { uri: _.get(image, "full") };
  }

  return placeholder;
};

export const saveEventImagesToCache = (events: EventType[]) => {
  const imageUris = events.map((event) => event?.coverImage?.full);
  saveImagesToCache(_.compact(imageUris));
};

export const saveDiscoImagesToCache = (discos: Disco[]) => {
  const imageUris = discos.map((event) => event?.logo?.full);
  saveImagesToCache(_.compact(imageUris));
};

export const saveImagesToCache = (imageUris: string[]) => {
  const sources = imageUris.map((uri) => ({ uri }));
  FastImage.preload(sources);
};

export const getBase64FromUrl = async (imageUrl: string) => {
  try {
    // Scarica l'immagine come blob
    const response = await fetch(imageUrl);
    const blob = await response.blob();

    // Converti il blob in base64
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const base64data = reader.result;
        resolve(base64data);
      };
      reader.onerror = (error) => {
        reject(error);
      };
      reader.readAsDataURL(blob);
    });
  } catch (error) {
    console.error("Errore nel recupero dell'immagine:", error);
    return null;
  }
};
