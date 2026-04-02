import { useEffect, useState } from 'react';
import { getProduits } from './apiService';

function App() {
  const [produits, setProduits] = useState<any[]>([]);
  const [langue, setLangue] = useState<'fr' | 'en' | 'bm'>('fr'); // Préparation pour FR, EN, BM

  useEffect(() => {
    getProduits().then(data => {
      console.log("Données reçues :", data);
      setProduits(data);
    });
  }, []);

  // Fonction vocale améliorée
  const lireProduit = (nom: string, prix: string) => {
    const synthese = window.speechSynthesis;
    let texte = `${nom}, prix ${prix} Francs CFA`;
    
    if (langue === 'en') texte = `${nom}, price ${prix} CFA`;
    // Note : Le Bambara sera ajouté dès que nous aurons vos traductions dans le Sheets
    
    const message = new SpeechSynthesisUtterance(texte);
    message.lang = langue === 'en' ? 'en-US' : 'fr-FR';
    synthese.speak(message);
  };

  return (
    <div style={{ padding: '20px', maxWidth: '450px', margin: 'auto', fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif', backgroundColor: '#fcfcfc', minHeight: '100vh' }}>
      
      {/* Header avec la couleur de LocalMart */}
      <header style={{ textAlign: 'center', marginBottom: '30px' }}>
        <h1 style={{ color: '#D37D3D', fontSize: '1.6rem', marginBottom: '5px' }}>DAVIES Local Voice Commerce</h1>
        <p style={{ margin: '0', color: '#666', fontSize: '0.9rem' }}>Catalogue Inclusif • Mali</p>
        
        {/* Sélecteur de langue simple */}
        <div style={{ marginTop: '15px', display: 'flex', justifyContent: 'center', gap: '10px' }}>
          <button onClick={() => setLangue('fr')} style={{ border: langue === 'fr' ? '2px solid #D37D3D' : '1px solid #ccc', borderRadius: '5px', padding: '5px 10px', cursor: 'pointer' }}>🇫🇷 FR</button>
          <button onClick={() => setLangue('en')} style={{ border: langue === 'en' ? '2px solid #D37D3D' : '1px solid #ccc', borderRadius: '5px', padding: '5px 10px', cursor: 'pointer' }}>🇬🇧 EN</button>
          <button onClick={() => setLangue('bm')} style={{ border: langue === 'bm' ? '2px solid #D37D3D' : '1px solid #ccc', borderRadius: '5px', padding: '5px 10px', cursor: 'pointer' }}>🇲🇱 BM</button>
        </div>
      </header>

      <hr style={{ border: '0', height: '1px', backgroundColor: '#eee', marginBottom: '20px' }} />
      
      {produits.length === 0 ? (
        <p style={{ textAlign: 'center', color: '#888' }}>Connexion au catalogue en cours...</p>
      ) : (
        <div style={{ display: 'grid', gap: '15px' }}>
          {produits.map((item, index) => (
            <div key={index} 
                 onClick={() => lireProduit(item.PRODUIT || "Article", item.PRIX || "0")}
                 style={{ 
                   padding: '15px', 
                   backgroundColor: '#fff',
                   border: '1px solid #efefef',
                   borderRadius: '16px', // Coins arrondis comme sur Rocket
                   boxShadow: '0 4px 6px rgba(0,0,0,0.02)',
                   cursor: 'pointer',
                   transition: 'transform 0.2s'
                 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <span style={{ fontSize: '1.1rem', color: '#333', fontWeight: '600', maxWidth: '70%' }}>
                  {item.PRODUIT || "Sans nom"}
                </span>
                <span style={{ color: '#D37D3D', fontWeight: 'bold', fontSize: '1.1rem' }}>
                  {item.PRIX} <small style={{fontSize: '0.7rem'}}>CFA</small>
                </span>
              </div>
              <div style={{ marginTop: '10px', fontSize: '0.85rem', color: '#D37D3D', display: 'flex', alignItems: 'center' }}>
                <span style={{ marginRight: '5px' }}>🔈</span> 
                {langue === 'fr' ? 'Cliquez pour écouter' : langue === 'en' ? 'Click to listen' : 'A bè fô k’a mèn'}
              </div>
            </div>
          ))}
        </div>
      )}
      
      <footer style={{ marginTop: '40px', textAlign: 'center', fontSize: '0.8rem', color: '#aaa' }}>
        &copy; 2026 DAVIES Collection - Bamako
      </footer>
    </div>
  );
}

export default App;
