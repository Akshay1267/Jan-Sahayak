from supabase import create_client, Client
from config import SUPABASE_URL, SUPABASE_ANON_KEY

_supabase: Client | None = None


def get_supabase() -> Client:
    """Return the Supabase client instance (lazy initialization)."""
    global _supabase
    if _supabase is None:
        if not SUPABASE_URL or not SUPABASE_ANON_KEY:
            raise RuntimeError(
                "Supabase is not configured. "
                "Please set SUPABASE_URL and SUPABASE_ANON_KEY in your backend/.env file."
            )
        _supabase = create_client(SUPABASE_URL, SUPABASE_ANON_KEY)
    return _supabase
