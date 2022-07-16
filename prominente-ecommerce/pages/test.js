import { db } from "../src/utils/firebase/initClient";
import {
  collection,
  addDoc,
  getDocs,
  serverTimestamp,
  collectionGroup,
  query,
  orderBy,
} from "firebase/firestore";

const Test = () => {
  const handleAddDoc = async () => {
    const ordersRef = collection(db, "users/2/orders");
    const docRef = await addDoc(ordersRef, {
      order: "order of user 2",
      timestamp: serverTimestamp(),
    });
  };

  const retrieveCollectionGroup = async () => {
    const collectionGrpRef = collectionGroup(db, "orders");
    const q = query(collectionGrpRef, orderBy("timestamp", "desc"));

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      console.log(doc.id, " => ", doc.data());
    });
  };

  return (
    <div>
      <p>This is a test file</p>
      <p onClick={handleAddDoc}>add doc</p>
      <button onClick={retrieveCollectionGroup}>retrieveCollectionGroup</button>
      testpage
    </div>
  );
};

export default Test;
