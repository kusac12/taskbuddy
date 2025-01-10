import admin, { type ServiceAccount } from "firebase-admin";

import serviceAccount from "./serviceAccountKey.json" assert { type: "json" };

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as ServiceAccount)
});

export default admin;