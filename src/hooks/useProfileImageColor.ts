import { User } from "../types";

export const useProfileImageColor = (user?: User) => {
  if (!user) {
    return
  }
  const name = user.name + user.surname;

  // Funzione di hash
  const hash = (str: string) => {
    let hash = 5381;
    for (let i = 0; i < str.length; i++) {
      hash = ((hash << 5) + hash) + str.charCodeAt(i);
    }
    return hash;
  };

  // Genera un valore hash dalla stringa
  const hashValue = hash(name);

  // Funzione per generare un componente di colore pastello
  const getPastelComponent = (value: number) => {
    // Limita il valore tra 156 e 240 per colori pastello
    return 156 + (value % 85);
  };

  // Genera componenti RGB pastello
  const r = getPastelComponent((hashValue & 0xFF0000) >> 16);
  const g = getPastelComponent((hashValue & 0x00FF00) >> 8);
  const b = getPastelComponent(hashValue & 0x0000FF);

  // Calcola la luminosità del colore
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

  // Aggiusta il colore se necessario per migliorare il contrasto
  const adjustColor = (color: number) => {
    if (luminance > 0.7) {
      // Se il colore è troppo chiaro, lo scuriamo
      return Math.max(0, color - 40);
    }
    return color;
  };

  const rFinal = adjustColor(r);
  const gFinal = adjustColor(g);
  const bFinal = adjustColor(b);

  // Converti in formato esadecimale
  const rHex = rFinal.toString(16).padStart(2, '0');
  const gHex = gFinal.toString(16).padStart(2, '0');
  const bHex = bFinal.toString(16).padStart(2, '0');

  return `#${rHex}${gHex}${bHex}`;
};
