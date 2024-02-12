export interface FormResult {
  nom: string;
  prenom: string;
  adresse: string;
  codePostal: number;
  ville: string;
  telephone: string;
  email: string;
  civilite: 'male' | 'female';
  login: string;
  password: string;
  passwordConfirmation: string;
}
