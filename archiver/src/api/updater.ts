import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';
import type { VercelRequest, VercelResponse } from '@vercel/node'; // Recommended types

dotenv.config();

const supabase = createClient(
  process.env.SUPABASE_URL as string,
  process.env.SUPABASE_KEY as string
);

async function getNews() {
  try {
    const { data, error } = await supabase.from("sensor").select("*");
    if (error !== null) {
      console.error("Supabase fetch error:", error);
      return [];
    }
    return data || [];
  } catch (e) {
    console.error("Fetch catch block:", e);
    return [];
  }
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // 1. Ensure method is GET (Vercel Cron always sends a GET request)
  if (req.method !== 'GET') {
    return res.status(405).json({ msg: "Method Not Allowed" });
  }

  // 2. Validate CRON_SECRET authorization header
  const authHeader = req.headers.authorization;
  if (!authHeader || authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return res.status(401).json({ msg: "Unauthorized" });
  }

  // 3. Fetch data
  const newData = await getNews();
  if (newData.length === 0) {
    return res.status(200).json({ msg: "No new data to archive" });
  }

  // 4. Upsert data to archive
  try {
    const { error } = await supabase
      .from("sensorarchive")
      .upsert(newData, { onConflict: "id" });

    if (error !== null) {
      console.error("Supabase upsert error:", error);
      return res.status(500).json({ msg: "Error updating data" });
    }

    return res.status(200).json({ msg: "Data updated successfully" });
  } catch (e) {
    console.error("Upsert catch block:", e);
    return res.status(500).json({ msg: "An error occurred." });
  }
}
