import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '@/firebase.js';

export const uploadFile = async (file) => {
  const id = crypto.randomUUID();
  const name = `${id}-${file.name}`;

  const storageRef = ref(storage, name);

  await uploadBytes(storageRef, file);
  const url = await getDownloadURL(storageRef);

  return url;
}

