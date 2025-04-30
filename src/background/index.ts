import { setVisitCountByDate } from "../utils/storage";

type IconSize = 16 | 32 | 64;

const getFavicon = ({
  websiteUrl,
  iconSize,
}: {
  websiteUrl: string;
  iconSize: IconSize;
}) => {
  const extensionId = chrome.runtime.id;
  const faviconUrl = `chrome-extension://${extensionId}/_favicon/?pageUrl=${encodeURIComponent(
    websiteUrl
  )}&size=${iconSize}`;
  // const faviconUrl = `chrome-extension://+favicon/?pageUrl=${encodeURIComponent(url)}`;
  return faviconUrl;
};

chrome.webNavigation.onCompleted.addListener(
  async(details) => {
    if (details.frameId === 0) {
      const url = details.url;
      const urlHost = new URL(url).hostname;
      const faviconUrl = getFavicon({websiteUrl: url, iconSize: 16});
      console.log( 'icon',faviconUrl);
      const date = new Date();
        const dateString = date.toISOString().split('T')[0]; // YYYY-MM-DD format  
    //   chrome.storage.local.get(['visitCounts'], (data) => {
        // const visitCounts = data.visitCounts || {};
        // visitCounts[urlHost] = (visitCounts[urlHost] || 0) + 1;

        // chrome.storage.local.set({visitCounts});
    //   });
       await setVisitCountByDate(dateString, urlHost);

    }
  },
  {url: [{schemes: ['http', 'https']}]}
);
