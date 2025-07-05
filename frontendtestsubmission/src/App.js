import { useState } from 'react';
import './App.css';

function App() {
 const [url, setUrl] = useState('');
 const [validity, setVal] = useState('');
 const [shortcode, setShort] = useState('');
 const [shortUrl,setshortUrl]= useState([]);


 
  const ShortURl = async () => {
    if (!url) {
      alert('Please enter a URL');
      return;
    }
    try {
      const response = await fetch('http://localhost:6000/api/shorturls', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          url,
        validity: validity || 30,
        shortcode: shortcode || null
        }),
      });
      
      const data = await response.json();   
      setshortUrl([...shortUrl, data.shortLink]);
      alert(`Short URL generated: ${data.shortLink}`);
    } catch (error) {
      console.error('Error generating short URL:', error);
      alert('Failed to generate short URL. Please try again.');
    }
  };
  return (
    <div className="App">
      <h1>URL Generator</h1>
      <input placeholder="Url" value={url} onChange={e => setUrl(e.target.value)} />
      <input placeholder="Validity" value={validity} onChange={e => setVal(e.target.value)} />
      <input placeholder="Short code" value={shortcode} onChange={e => setShort(e.target.value)} />
      <button onClick={ShortURl}>Generate</button>

      <ul>
       {shortUrl.map((link, index) => (
         <li key={index}> {link}</li>
       ))}  
      </ul>
    </div>
  );
}

export default App;
