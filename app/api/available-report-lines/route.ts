import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function GET(req:Request) {
    try {
      // Coordinates of the point for the query
      const coordinates = [-37.80710644671382, 144.9424528954789];
  
      // Call the Postgres function that you've defined
      const { data, error } = await supabase
        .rpc('get_nearest_station_lines', { input_latitude: coordinates[0], input_longitude: coordinates[1] });
  
      // Handle errors
      if (error) {
        throw error;
      }
  
      // Return the result using NextResponse
      return NextResponse.json(data);
    } catch (error) {
      console.error('Error executing query', error);
      return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
  }