import jwt
from datetime import datetime, timedelta, timezone

from .utils import verify_google_id_token
from .repository import UserRepository
from src.config import settings


class AuthService:
    def __init__(self, user_repo: UserRepository):
        self.user_repo = user_repo

    def create_access_token(self, user_id: int) -> str:
        now = datetime.now(timezone.utc)
        payload = {
            "sub": str(user_id),
            "iat": now,
            "exp": now + timedelta(hours=24),
        }

        token = jwt.encode(
            payload,
            settings.JWT_SECRET,
            algorithm="HS256",
        )
        return token

    async def google_login(self, id_token: str):
        user_data = verify_google_id_token(id_token)
        user = await self.user_repo.get_by_google_sub(user_data["sub"])
        if not user:
            user = await self.user_repo.create(user_data)

        jwt = self.create_access_token(user.id)

        return {
            "access_token": jwt,
            "user": user,
        }
