/* eslint-disable */
const { createClient } = require('@supabase/supabase-js');

async function keepAlive() {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseKey) {
        console.error('Missing Supabase environment variables');
        process.exit(1);
    }

    const supabase = createClient(supabaseUrl, supabaseKey);

    console.log('Sending keep-alive ping to Supabase...');

    try {
        // Perform a simple query to keep the project active
        // Selecting 1 row from 'posts' table is a reliable way to check activity
        const { data, error } = await supabase.from('posts').select('id').limit(1);
 
        if (error) {
            console.warn('Ping results:', error.message);
        } else {
            console.log('Database Ping successful. Found', data.length, 'posts.');
        }
 
        console.log('Supabase project is active.');
    } catch (err) {
        console.error('Error during keep-alive:', err.message);
        process.exit(1);
    }
}

keepAlive();
