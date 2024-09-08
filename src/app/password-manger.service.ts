import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  addDoc,
  collectionData,
  doc,
  updateDoc,
  deleteDoc,
  query,
  where,
} from '@angular/fire/firestore';
import {
  Auth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from '@angular/fire/auth';
@Injectable({
  providedIn: 'root',
})
export class PasswordMangerService {
  constructor(private firestore: Firestore, private auth: Auth) {}
  addSite(data: object) {
    const dbInstance = collection(this.firestore, 'sites');
    return addDoc(dbInstance, data);
  }
  //IDfield is optional but if we don't give id it won't display
  loadSites(emailid: string) {
    const dbInstance = collection(this.firestore, 'sites');
    const q = query(dbInstance, where('email', '==', emailid));
    return collectionData(q, { idField: 'id' });
  }

  updateSite(id: string, data: object) {
    const docInstance = doc(this.firestore, 'sites', id);
    return updateDoc(docInstance, data);
  }
  deleteSite(id: string) {
    const docInstance = doc(this.firestore, 'sites', id);
    return deleteDoc(docInstance);
  }

  //password list queries
  addPassword(data: object, siteId: string) {
    const dbInstance = collection(this.firestore, `sites/${siteId}/passwords`);
    return addDoc(dbInstance, data);
  }
  loadPasswords(siteId: string) {
    const dbInstance = collection(this.firestore, `sites/${siteId}/passwords`);
    return collectionData(dbInstance, { idField: 'id' });
  }
  updatePassword(siteId: string, passwordId: string, data: object) {
    const docInstance = doc(
      this.firestore,
      `sites/${siteId}/passwords`,
      passwordId
    );
    return updateDoc(docInstance, data);
  }
  deletePassword(siteId: string, passwordId: string) {
    const docInstance = doc(
      this.firestore,
      `sites/${siteId}/passwords`,
      passwordId
    );
    return deleteDoc(docInstance);
  }
  //login
  login(email: string, password: string) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }
  //signup
  signup(email: string, password: string) {
    return createUserWithEmailAndPassword(this.auth, email, password);
  }
}
