import { useEffect, useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import '../styles/App.css'
import { getFromStorage } from '../utils/storage';

interface VisitCounts {
    [date: string]: {
        [url: string]: number;
    };
}


function App() {
//   const [count, setCount] = useState(0)
    const [visitCounts, setVisitCounts] = useState<VisitCounts>();
useEffect(() => {
    const fetchVisitCounts = async () => {
        const visitCounts = await getFromStorage<VisitCounts>('visitCounts');
        setVisitCounts(visitCounts);
        console.log('visitCounts', visitCounts);
    }
    fetchVisitCounts();

},[])


  return ( 
<main>
    {visitCounts && Object.keys(visitCounts).length > 0 ? (
        <div>
            <h1>Websites Tracker</h1>
            <ul>
                {Object.entries(visitCounts).map(([date, urls]) => (
                    <li key={date}>
                        <h2>{date}</h2>
                        <ul>
                            {Object.entries(urls).map(([url, count]) => (
                                <li key={url}>
                                    {url} - Visited {count} times
                                    <img src={`chrome-extension://${chrome.runtime.id}/_favicon/?pageUrl=${encodeURIComponent(url)}&size=16`} alt="favicon" />
                                </li>
                            ))}
                        </ul>
                    </li>
                ))}
            </ul>
        </div>
    ) : (
        <div>
            <h1>No websites visited yet</h1>
        </div>
    )}
</main>
  )
}

export default App


{/* <>
<div>
  <a href="https://vite.dev" target="_blank">
    <img src={viteLogo} className="logo" alt="Vite logo" />
  </a>
  <a href="https://react.dev" target="_blank">
    <img src={reactLogo} className="logo react" alt="React logo" />
  </a>
</div>
<h1>Vite + React</h1>
<div className="card">
  <button onClick={() => setCount((count) => count + 1)}>
    count is {count} !
  </button>
  <p>
    Edit <code>src/App.tsx</code> and save to test HMR
  </p>
</div>
<p className="read-the-docs">
  Click on the Vite and React logos to learn more
</p>
</> */}