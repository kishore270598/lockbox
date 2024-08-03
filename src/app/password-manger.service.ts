import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  addDoc,
  collectionData,
  doc,
  updateDoc,
  deleteDoc,
} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class PasswordMangerService {
  constructor(private firestore: Firestore) {}
  addSite(data: object) {
    const dbInstance = collection(this.firestore, 'sites');
    return addDoc(dbInstance, data);
  }
  //IDfield is optional but if we don't give id it won't display
  loadSites() {
    const dbInstance = collection(this.firestore, 'sites');
    return collectionData(dbInstance, { idField: 'id' });
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
}
