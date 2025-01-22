import dynamicLinks, { FirebaseDynamicLinksTypes } from '@react-native-firebase/dynamic-links';
import { useEffect, useMemo, useState } from 'react';
import { APP_BUNDLE_ID, APP_STORE_ID } from '@env';

type CreateDynamicLinkParams = {
  params: Record<string, any>;
  title: string;
  imageUrl: string;
};
export const createDynamicLink = async ({ params, title, imageUrl }: CreateDynamicLinkParams) => {
  const social = {
    title: title,
    imageUrl: imageUrl,
  };

  try {
    const createdLink = await dynamicLinks().buildShortLink(
      {
        link: encodeURI(`https://partyshare.page.link/App/${JSON.stringify(params)}`),
        domainUriPrefix: 'https://partyshare.page.link',
        ios: {
          appStoreId: APP_STORE_ID,
          bundleId: APP_BUNDLE_ID,
        },
        android: {
          packageName: APP_BUNDLE_ID,
        },
        analytics: {
          campaign: 'banner',
        },
        social,
      },
      dynamicLinks.ShortLinkType.SHORT,
    );

    console.log({ createdLink });
    return createdLink;
  } catch (e) {
    console.log({ errorCreateDynamicLink: e });
  }
};

export const useDynamicLink = () => {
  const [link, setLink] = useState<FirebaseDynamicLinksTypes.DynamicLink>();

  const handleDynamicLink = (newLink: FirebaseDynamicLinksTypes.DynamicLink) => {
    setLink(newLink);
  };

  useEffect(() => {
    const unsubscribe = dynamicLinks().onLink(handleDynamicLink);
    dynamicLinks()
      .getInitialLink()
      .then(newLink => {
        newLink && setLink(newLink);
      });

    return () => unsubscribe();
  }, []);

  const linkCode = useMemo(() => {
    try {
      if (link) {
        const parts = link.url.split('/');
        const code = parts[parts.length - 1];
        const textToParse = code
          .replaceAll('%7B', '{')
          .replaceAll('%7D', '}')
          .replaceAll('%22', '"');
        let data = textToParse;

        if (textToParse) {
          data = JSON.parse(textToParse);
        }

        return data;
      }
    } catch (e) {
      console.log({ errorDynamicLinkCode: e });
      return null;
    }
  }, [link]);

  console.log('dynamic link', link, linkCode);
  return {
    link,
    linkCode,
  };
};
