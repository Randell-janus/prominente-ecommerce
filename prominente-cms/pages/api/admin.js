import { auth } from "../../src/utils/firebase/initAdmin";
import { db } from "../../src/utils/firebase/initAdmin";

export default async function handler(req, res) {
  try {
    const { email, password, displayName } = req.body;
    const userRecord = await auth.createUser({
      displayName,
      email,
      password,
    });
    await db.collection("admin").doc(userRecord.uid).set({
      email,
      name: displayName,
    });

    return res.status(200).json({ uid: userRecord.uid });
  } catch (error) {
    return res.status(401).json({ error });
  }
}
