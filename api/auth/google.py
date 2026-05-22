from google.oauth2 import id_token
from google.auth.transport.requests import Request
from api.settings import settings


def verify_google_id_token(token: str):
    try:
        idinfo = id_token.verify_oauth2_token(
            token, Request(), settings.GOOGLE_CLIENT_ID, clock_skew_in_seconds=300
        )
        print("VALID TOKEN:", idinfo)
        return idinfo

    except Exception as e:
        print("TOKEN ERROR:", str(e))
        return None
