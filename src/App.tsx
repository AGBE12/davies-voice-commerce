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
      
      {/* Header Style App Mobile (Comme dans image_2.png) */}
      <header style={{ 
        backgroundColor: '#fff', 
        padding: '15px', 
        boxShadow: '0 2px 10px rgba(0,0,0,0.03)',
        position: 'sticky',
        top: 0,
        zIndex: 100
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
          <div style={{ color: '#D37D3D', fontWeight: '800', fontSize: '1.2rem' }}>DAVIES Local Voice</div>
          <div style={{ display: 'flex', gap: '15px', color: '#6B7280' }}>
            <span>👤</span> {/* Icône de profil fictive */}
            <span>🔔</span> {/* Icône de notification fictive */}
          </div>
        </div>
        
        {/* Barre de recherche fictive (Comme dans image_2.png) */}
        <div style={{ position: 'relative', marginBottom: '15px' }}>
          <span style={{ position: 'absolute', left: '12px', top: '10px', color: '#9CA3AF' }}>🔍</span>
          <input 
            type="text" 
            placeholder="Rechercher des produits, artisans..." 
            style={{
              width: '100%',
              padding: '10px 10px 10px 40px',
              borderRadius: '25px',
              border: '1px solid #E5E7EB',
              backgroundColor: '#F3F4F6',
              fontSize: '0.9rem'
            }}
          />
        </div>

        {/* Sélecteur de Langue (Boutons Pilotes) */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '8px' }}>
          {['fr', 'en', 'bm'].map((l) => (
            <button 
              key={l}
              onClick={() => setLangue(l as any)}
              style={{
                padding: '6px 12px',
                borderRadius: '20px',
                border: 'none',
                backgroundColor: langue === l ? '#D37D3D' : '#E5E7EB',
                color: langue === l ? '#fff' : '#4B5563',
                fontSize: '0.8rem',
                fontWeight: '600',
                cursor: 'pointer'
              }}
            >
              {l.toUpperCase()}
            </button>
          ))}
        </div>
      </header>

      {/* Grille de Produits (Comme dans image_4.png) */}
      <main style={{ padding: '15px' }}>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(2, 1fr)', 
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
                boxShadow: '0 2px 5px rgba(0,0,0,0.02)',
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
      
      {/* Footer minimaliste */}
      <footer style={{ marginTop: '40px', padding: '20px', textAlign: 'center', fontSize: '0.75rem', color: '#aaa', backgroundColor: '#fff', borderTop: '1px solid #eee' }}>
        &copy; 2026 DAVIES Collection - Bamako
      </footer>
    </div>
  );
}

export default App;
