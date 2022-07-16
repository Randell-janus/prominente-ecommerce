import { auth } from "../../src/utils/firebase/initAdmin";
import { db } from "../../src/utils/firebase/initAdmin";

export default async function handler(req, res) {
  try {
    const { uid } = await auth.verifyIdToken(req.headers.token);
    const user = await db.collection("admin").doc(uid).get();

    if (!user.exists) {
      return res.status(404).json({ message: "not authorized" });
    }

    return res.status(200).json({ id: user.id, ...user.data() });
  } catch (error) {
    return res.status(401).json({ error });
  }
}
