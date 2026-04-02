import { useEffect, useState } from 'react';
import { getProduits } from './apiService';

function App() {
  const [produits, setProduits] = useState<any[]>([]);
  const [langue, setLangue] = useState<'fr' | 'en' | 'bm'>('fr');
  const [recherche, setRecherche] = useState('');
  const [page, setPage] = useState<'accueil' | 'catalogue'>('accueil');

  useEffect(() => {
    getProduits().then(data => setProduits(data));
  }, []);

  // Filtrage réel des produits
  const produitsFiltrés = produits.filter(p => 
    p.PRODUIT?.toLowerCase().includes(recherche.toLowerCase())
  );

  const lireProduit = (nom: string, prix: string) => {
    const synthese = window.speechSynthesis;
    let texte = `${nom}, prix ${prix} Francs CFA`;
    if (langue === 'en') texte = `${nom}, price ${prix} CFA`;
    const message = new SpeechSynthesisUtterance(texte);
    message.lang = langue === 'en' ? 'en-US' : 'fr-FR';
    synthese.speak(message);
  };

  // --- PAGE D'ACCUEIL ---
  if (page === 'accueil') {
    return (
      <div style={{ backgroundColor: '#fff', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '30px', textAlign: 'center', fontFamily: 'Inter, sans-serif' }}>
        <div style={{ backgroundColor: '#D37D3D', padding: '20px', borderRadius: '25px', marginBottom: '20px' }}>
          <span style={{ fontSize: '3rem' }}>🏬</span>
        </div>
        <h1 style={{ color: '#333', fontSize: '1.8rem', marginBottom: '10px' }}>DAVIES Local Voice Commerce</h1>
        <p style={{ color: '#666', lineHeight: '1.5', marginBottom: '30px' }}>
          Le premier catalogue inclusif au Mali. <br/> Achetez par la voix, soutenez l'artisanat local.
        </p>
        <button 
          onClick={() => setPage('catalogue')}
          style={{ backgroundColor: '#D37D3D', color: '#fff', border: 'none', padding: '15px 40px', borderRadius: '30px', fontSize: '1.1rem', fontWeight: 'bold', cursor: 'pointer', boxShadow: '0 4px 15px rgba(211, 125, 61, 0.3)' }}
        >
          Découvrir le catalogue
        </button>
      </div>
    );
  }

  // --- PAGE CATALOGUE (Design corrigé) ---
  return (
    <div style={{ backgroundColor: '#F9FAFB', minHeight: '100vh', fontFamily: 'Inter, sans-serif' }}>
      <header style={{ backgroundColor: '#fff', padding: '15px', boxShadow: '0 2px 10px rgba(0,0,0,0.03)', position: 'sticky', top: 0, zIndex: 100 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
          <div onClick={() => setPage('accueil')} style={{ color: '#D37D3D', fontWeight: '800', fontSize: '1.1rem', cursor: 'pointer' }}>← DAVIES</div>
          <div style={{ display: 'flex', gap: '15px', fontSize: '1.2rem' }}>
            <span onClick={() => alert('Profil bientôt disponible')} style={{ cursor: 'pointer' }}>👤</span>
            <span onClick={() => alert('Aucune nouvelle notification')} style={{ cursor: 'pointer' }}>🔔</span>
          </div>
        </div>
        
        <div style={{ position: 'relative', marginBottom: '15px' }}>
          <span style={{ position: 'absolute', left: '12px', top: '10px' }}>🔍</span>
          <input 
            type="text" 
            placeholder="Rechercher (ex: Dell, Wax...)" 
            value={recherche}
            onChange={(e) => setRecherche(e.target.value)}
            style={{
              width: '100%',
              boxSizing: 'border-box', // Empêche le débordement
              padding: '10px 10px 10px 40px',
              borderRadius: '25px',
              border: '1px solid #E5E7EB',
              backgroundColor: '#F3F4F6',
              color: '#333', // Texte bien visible en gris foncé
              fontSize: '0.9rem'
            }}
          />
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '8px' }}>
          {['fr', 'en', 'bm'].map((l) => (
            <button key={l} onClick={() => setLangue(l as any)} style={{ padding: '6px 12px', borderRadius: '20px', border: 'none', backgroundColor: langue === l ? '#D37D3D' : '#E5E7EB', color: langue === l ? '#fff' : '#4B5563', fontSize: '0.8rem', fontWeight: '600', cursor: 'pointer' }}>
              {l.toUpperCase()}
            </button>
          ))}
        </div>
      </header>

      <main style={{ padding: '15px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
          {produitsFiltrés.map((item, index) => (
            <div key={index} onClick={() => lireProduit(item.PRODUIT, item.PRIX)} style={{ backgroundColor: '#fff', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 2px 5px rgba(0,0,0,0.02)', display: 'flex', flexDirection: 'column' }}>
              <div style={{ width: '100%', height: '120px', backgroundColor: '#F3F4F6', position: 'relative' }}>
                <img src={item.IMAGE || "https://via.placeholder.com/150"} alt={item.PRODUIT} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <div style={{ position: 'absolute', bottom: '8px', right: '8px', backgroundColor: '#D37D3D', borderRadius: '50%', width: '30px', height: '30px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>🔈</div>
              </div>
              <div style={{ padding: '10px' }}>
                <h3 style={{ fontSize: '0.85rem', margin: '0 0 5px 0', color: '#1F2937', height: '32px', overflow: 'hidden' }}>{item.PRODUIT}</h3>
                <p style={{ fontSize: '1rem', margin: 0, color: '#D37D3D', fontWeight: '700' }}>{item.PRIX} <small style={{ fontSize: '0.6rem' }}>CFA</small></p>
              </div>
            </div>
          ))}
        </div>
        {produitsFiltrés.length === 0 && <p style={{ textAlign: 'center', marginTop: '20px', color: '#888' }}>Aucun produit trouvé pour "{recherche}"</p>}
      </main>
    </div>
  );
}

export default App;
