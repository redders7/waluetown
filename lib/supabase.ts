import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://kquamcriebflfrxyiqne.supabase.co'
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtxdWFtY3JpZWJmbGZyeHlpcW5lIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NTMwMTU1MDAsImV4cCI6MTk2ODU5MTUwMH0.9BSwfm4BqC-fykkwk3Fw9ByNFbhQTy2Fb0RReXO9LOE"


const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  localStorage: AsyncStorage as any,
  autoRefreshToken: true,
  persistSession: true,
  detectSessionInUrl: false,
});

async function getShopData(){
  let { data: shop2, error } = await supabase
  .from('shop2')
  .select('*')
  return {shop2, error}
}

export {supabase, getShopData};