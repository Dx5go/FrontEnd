# Configuration MongoDB pour le Backend DOX

## 🔧 Étapes à suivre

### 1️⃣ Créer un cluster MongoDB Atlas

1. Va sur https://www.mongodb.com/cloud/atlas
2. Crée un compte ou connexion
3. Crée un nouveau cluster (Free tier suffit)
4. Attends que le cluster soit prêt

### 2️⃣ Récupérer la chaîne de connexion (Connection String)

1. Clique sur "Connect" en haut de ton cluster
2. Sélectionne "Drivers"
3. Choisis "Node.js"
4. Copie la chaîne de connexion ressemblant à :
   ```
   mongodb+srv://<username>:<password>@<cluster>.mongodb.net/?retryWrites=true&w=majority
   ```

### 3️⃣ Ajouter les variables d'environnement sur Vercel

Va dans ton projet Vercel et ajoute ces variables dans **Settings → Environment Variables** :

```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/?retryWrites=true&w=majority
MONGODB_DB=dox_treasure
```

⚠️ **Important** : Remplace `username` et `password` par tes vraies identifiants MongoDB.

### 4️⃣ Redéployer

Vercel redéploiera automatiquement une fois les variables ajoutées.

## ✨ Vérifier

Une fois déployé, chaque clic sur le coffre du front insérera un document dans MongoDB :
- Base de données : `dox_treasure` (ou celle configurée dans `MONGODB_DB`)
- Collection : `dox`

Pour voir les données :
1. Va sur MongoDB Atlas
2. Clique sur "Browse Collections"
3. Trouve la DB `dox_treasure` → collection `dox`

## 📝 Variables d'environnement

- `.env.local` : pour le développement local (ne pas committer)
- Variables Vercel : pour la production (configuré en Settings → Environment Variables)
