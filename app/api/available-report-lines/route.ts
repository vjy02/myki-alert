import { createClient } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function GET(request: NextRequest) {
    const { searchParams } = request.nextUrl;
    const input_latitude = searchParams.get("latitude");
    const input_longitude = searchParams.get("longitude");

    if (!input_latitude || !input_longitude) {
        return NextResponse.json({ error: "Missing latitude or longitude" }, { status: 400 });
    }

    try {
        const { data, error } = await supabase.rpc('get_nearest_station_lines', {
            input_latitude: parseFloat(input_latitude),
            input_longitude: parseFloat(input_longitude)
        });

        if (error) {
            throw error;
        }

        return NextResponse.json(data);
    } catch (error) {
        console.error("Error executing query", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
