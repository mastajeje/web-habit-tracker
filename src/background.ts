type IconSize = 16 | 32 | 64

const getFavicon = ({websiteUrl, iconSize}:{websiteUrl:string,iconSize:IconSize}) => {
    const extensionId = chrome.runtime.id;
    const faviconUrl = `chrome-extension://${extensionId}/_favicon/?pageUrl=${encodeURIComponent(websiteUrl)}&size=${iconSize}`;
    // const faviconUrl = `chrome-extension://+favicon/?pageUrl=${encodeURIComponent(url)}`;
    return faviconUrl;


}

chrome.webNavigation.onCompleted.addListener((details) => {
    if(details.frameId === 0){
        const url = details.url
        const urlHost = new URL(url).hostname
        const faviconUrl = getFavicon({websiteUrl:url,iconSize:16});
        console.log('onCompleted', url, urlHost,faviconUrl);

    }
}, {url: [{schemes: ['http', 'https']}]});