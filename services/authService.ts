// services/authService.ts
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User,
  updateProfile
} from "firebase/auth";
import { auth } from "../config/firebase";

export const authService = {
  // Registrar novo usuário
  async register(email: string, password: string, username: string) {
    try {
      console.log('Tentando registrar:', email);
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      
      // Atualizar o perfil com o nome de usuário
      if (userCredential.user) {
        await updateProfile(userCredential.user, {
          displayName: username
        });
      }
      
      console.log('Registro bem-sucedido!');
      return { success: true, user: userCredential.user };
    } catch (error: any) {
      console.error('Erro no registro:', error);
      console.error('Código do erro:', error.code);
      console.error('Mensagem do erro:', error.message);
      return { 
        success: false, 
        error: this.getErrorMessage(error.code) 
      };
    }
  },

  // Fazer login
  async login(email: string, password: string) {
    try {
      console.log('Tentando login:', email);
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log('Login bem-sucedido!');
      return { success: true, user: userCredential.user };
    } catch (error: any) {
      console.error('Erro no login:', error);
      console.error('Código do erro:', error.code);
      console.error('Mensagem do erro:', error.message);
      return { 
        success: false, 
        error: this.getErrorMessage(error.code) 
      };
    }
  },

  // Fazer logout
  async logout() {
    try {
      await signOut(auth);
      return { success: true };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  },

  // Observar mudanças no estado de autenticação
  onAuthChange(callback: (user: User | null) => void) {
    return onAuthStateChanged(auth, callback);
  },

  // Obter usuário atual
  getCurrentUser() {
    return auth.currentUser;
  },

  // Traduzir mensagens de erro do Firebase
  getErrorMessage(errorCode: string): string {
    const errorMessages: { [key: string]: string } = {
      'auth/email-already-in-use': 'Este email já está em uso',
      'auth/invalid-email': 'Email inválido',
      'auth/operation-not-allowed': 'Operação não permitida',
      'auth/weak-password': 'Senha muito fraca. Use pelo menos 6 caracteres',
      'auth/user-disabled': 'Usuário desabilitado',
      'auth/user-not-found': 'Usuário não encontrado',
      'auth/wrong-password': 'Senha incorreta',
      'auth/invalid-credential': 'Credenciais inválidas',
      'auth/too-many-requests': 'Muitas tentativas. Tente novamente mais tarde',
      'auth/network-request-failed': 'Erro de conexão. Verifique sua internet',
    };

    return errorMessages[errorCode] || 'Erro ao processar sua solicitação';
  }
};