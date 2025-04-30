interface VisitCounts {
    [date: string]: {
      [urlHost: string]: number;
    };
  }

export const getFromStorage = <T>(key: string): Promise<T>=> {
    return new Promise((resolve, reject) => {
        chrome.storage.local.get([key], (result) => {
            if (chrome.runtime.lastError) {
                reject(chrome.runtime.lastError);
            } else {
                resolve(result[key] as T);
            }
        }
        );
    }
    );
}

export const setToStorage = (items:object): Promise<void> => {
    return new Promise((resolve, reject) => {
        chrome.storage.local.set(items , () => {
            if (chrome.runtime.lastError) {
                reject(chrome.runtime.lastError);
            } else {
                resolve();
            }
        }
        );
    }
    );
}

export const removeFromStorage = (key:string): Promise<void> => {
    return new Promise((resolve, reject) => {
        chrome.storage.local.remove([key], () => {
            if(chrome.runtime.lastError) {
                reject(chrome.runtime.lastError);
            } else {
                resolve();
            }   
        })
    })
}

export const setVisitCountByDate = async (date:string, urlHost:string) => {
    const visitCounts:VisitCounts = await getFromStorage<VisitCounts>('visitCounts') || {};

    if(!visitCounts[date]){
        visitCounts[date] = {};
    }
    visitCounts[date][urlHost] = (visitCounts[date][urlHost] || 0) + 1;
    console.log('visitCounts', visitCounts,'utils');
    await setToStorage({visitCounts});

} 