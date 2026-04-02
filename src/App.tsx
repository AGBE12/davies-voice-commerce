import { useEffect, useState } from 'react';
import { getProduits } from './apiService';

function App() {
  const [produits, setProduits] = useState<any[]>([]);

  useEffect(() => {
    getProduits().then(data => {
      console.log("Données reçues :", data); // Pour vérifier dans la console
      setProduits(data);
    });
  }, []);

  // Fonction vocale pour l'accessibilité à Bamako
  const lireProduit = (nom: string, prix: string) => {
    const synthese = window.speechSynthesis;
    const message = new SpeechSynthesisUtterance(`${nom}, prix ${prix} Francs CFA`);
    message.lang = 'fr-FR';
    synthese.speak(message);
  };

  return (
    <div style={{ padding: '20px', maxWidth: '450px', margin: 'auto', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ color: '#1e40af', textAlign: 'center' }}>DAVIES Local Voice Commerce</h1>
      <p style={{ textAlign: 'center', color: '#666' }}>Catalogue Connecté</p>
      <hr />
      
      {produits.length === 0 ? (
        <p style={{ textAlign: 'center' }}>Connexion à Google Sheets...</p>
      ) : (
        produits.map((item, index) => (
          <div key={index} 
               onClick={() => lireProduit(item.PRODUIT || "Article", item.PRIX || "0")}
               style={{ 
                 padding: '15px', 
                 border: '1px solid #eee',
                 borderRadius: '10px',
                 marginBottom: '10px',
                 cursor: 'pointer',
                 backgroundColor: '#fdfdfd'
               }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '1.1em' }}>
                <strong>{item.PRODUIT || "Sans nom"}</strong>
              </span>
              <span style={{ color: '#c2410c', fontWeight: 'bold' }}>
                {item.PRIX} CFA
              </span>
            </div>
            <div style={{ marginTop: '5px', fontSize: '0.8em', color: '#3b82f6' }}>
              🔈 Cliquez pour écouter le prix
            </div>
          </div>
        ))
      )}
    </div>
  );
}

// CETTE LIGNE EST LA PLUS IMPORTANTE :DAVIES LOCAL VOICE COMMERCE
export default App;
