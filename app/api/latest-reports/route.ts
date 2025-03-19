import { createClient } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function GET(request: NextRequest) {
    try {
        const { data, error } = await supabase.rpc('get_latest_reports');

        if (error) {
            throw error;
        }

        return NextResponse.json(data);
    } catch (error) {
        console.error("Error executing query", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
