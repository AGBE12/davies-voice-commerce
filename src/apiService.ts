// Assurez-vous qu'il y a bien "export" devant "const"
export const getProduits = async () => {
    const API_URL = "https://script.google.com/macros/s/AKfycby7MFbJrZcIDzQdcHFSweENTLS--Csard-LdkDmBiudrmaT9SEjyU-xmYPKR77MvIKS/exec "; 
    
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Erreur API :", error);
      return [];
    }
  };