import { appAxios } from './config';

type uploadFileProps = {
  uri: string;
  linkedEntityId?: string;
  entityName: string;
  linkedEntityType: string;
  additionalInfo?: any;
  refetchEntity?: boolean;
  mimeType?: string;
  name?: string;
};

export const uploadFile = async ({
  uri,
  linkedEntityId,
  entityName,
  linkedEntityType,
  additionalInfo = {},
  refetchEntity,
  mimeType,
  name,
}: uploadFileProps) => {
  try {
    console.log({ uri, linkedEntityId, entityName, linkedEntityType, additionalInfo });

    const formData = new FormData();
    formData.append('file', {
      uri,
      name: name || 'image.png',
      type: mimeType || 'image/png',
    });

    if (linkedEntityId) {
      formData.append('linkedEntity.linkedEntityId', linkedEntityId);
    }
    formData.append('linkedEntity.entityName', entityName);
    formData.append('linkedEntity.linkedEntityType', linkedEntityType);
    formData.append('JSONbody', JSON.stringify({ additionalInfo }));

    const { data } = await appAxios.post('/uploads', formData, {
      headers: { 'content-type': 'multipart/form-data' },
    });
    console.log({ data });
    if (refetchEntity) {
      const { data: item } = await appAxios.get(`${entityName}/${linkedEntityId}`);
    }
    return data;
  } catch (e) {
    console.error({ uploadFile: e });
    return null;
  }
};
