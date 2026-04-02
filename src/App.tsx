import { useEffect, useState } from 'react';
import { getProduits } from './apiService';

function App() {
  const [produits, setProduits] = useState<any[]>([]);
  const [langue, setLangue] = useState<'fr' | 'en' | 'bm'>('fr');

  useEffect(() => {
    getProduits().then(data => {
      setProduits(data);
    });
  }, []);

  const lireProduit = (nom: string, prix: string) => {
    const synthese = window.speechSynthesis;
    let texte = `${nom}, prix ${prix} Francs CFA`;
    if (langue === 'en') texte = `${nom}, price ${prix} CFA`;
    const message = new SpeechSynthesisUtterance(texte);
    message.lang = langue === 'en' ? 'en-US' : 'fr-FR';
    synthese.speak(message);
  };

  return (
    <div style={{ backgroundColor: '#F9FAFB', minHeight: '100vh', fontFamily: 'Inter, sans-serif' }}>
      
      {/* Header Style App Mobile */}
      <header style={{ 
        backgroundColor: '#fff', 
        padding: '20px 15px', 
        textAlign: 'center', 
        boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
        position: 'sticky',
        top: 0,
        zIndex: 100
      }}>
        <h1 style={{ color: '#D37D3D', fontSize: '1.2rem', margin: 0, fontWeight: '800' }}>DAVIES Local Voice Commerce</h1>
        
        {/* Sélecteur de langue simple */}
        <div style={{ marginTop: '15px', display: 'flex', justifyContent: 'center', gap: '10px' }}>
          <button onClick={() => setLangue('fr')} style={{ border: langue === 'fr' ? '2px solid #D37D3D' : '1px solid #ccc', borderRadius: '5px', padding: '5px 10px', cursor: 'pointer' }}>🇫🇷 FR</button>
          <button onClick={() => setLangue('en')} style={{ border: langue === 'en' ? '2px solid #D37D3D' : '1px solid #ccc', borderRadius: '5px', padding: '5px 10px', cursor: 'pointer' }}>🇬🇧 EN</button>
          <button onClick={() => setLangue('bm')} style={{ border: langue === 'bm' ? '2px solid #D37D3D' : '1px solid #ccc', borderRadius: '5px', padding: '5px 10px', cursor: 'pointer' }}>🇲🇱 BM</button>
        </div>
      </header>

      {/* Grille de Produits (Comme dans Rocket) */}
      <main style={{ padding: '15px' }}>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(2, 1fr)', // 2 colonnes comme sur image_4.png
          gap: '12px' 
        }}>
          {produits.map((item, index) => (
            <div 
              key={index}
              onClick={() => lireProduit(item.PRODUIT, item.PRIX)}
              style={{
                backgroundColor: '#fff',
                borderRadius: '12px',
                overflow: 'hidden',
                boxShadow: '0 2px 5px rgba(0,0,0,0.05)',
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              {/* Image du produit */}
              <div style={{ width: '100%', height: '120px', backgroundColor: '#F3F4F6', position: 'relative' }}>
                <img 
                  src={item.IMAGE || "https://via.placeholder.com/150"} 
                  alt={item.PRODUIT}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <div style={{ 
                  position: 'absolute', 
                  bottom: '8px', 
                  right: '8px', 
                  backgroundColor: 'rgba(211, 125, 61, 0.9)', 
                  borderRadius: '50%', 
                  width: '30px', 
                  height: '30px', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  color: '#fff'
                }}>
                  🔈
                </div>
              </div>

              {/* Infos Produit */}
              <div style={{ padding: '10px' }}>
                <h3 style={{ fontSize: '0.9rem', margin: '0 0 5px 0', color: '#1F2937', fontWeight: '500' }}>
                  {item.PRODUIT}
                </h3>
                <p style={{ fontSize: '1rem', margin: 0, color: '#D37D3D', fontWeight: '700' }}>
                  {item.PRIX} <small style={{ fontSize: '0.6rem' }}>CFA</small>
                </p>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default App;
