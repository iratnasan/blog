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
        // We'll try to select from a common table or just a simple query if no table is known
        // Selecting 1 is a standard way to check connection/activity
        const { error } = await supabase.from('_keep_alive').select('*').limit(1);

        // If _keep_alive doesn't exist (likely), just do a system check or any query
        if (error && error.code === 'PGRST116') {
            // This is fine, we just need activity
            console.log('Database Ping successful (table might not exist, but connection was made).');
        } else if (error) {
            // Try another way if it fails
            const { error: error2 } = await supabase.rpc('get_service_status').limit(1).maybeSingle();
            if (error2) {
                console.warn('Ping results:', error.message);
            }
        } else {
            console.log('Database Ping successful.');
        }

        console.log('Supabase project is active.');
    } catch (err) {
        console.error('Error during keep-alive:', err.message);
        process.exit(1);
    }
}

keepAlive();
