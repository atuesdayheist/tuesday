import jwt
from datetime import datetime, timedelta, timezone

from src.unit_of_work import UnitOfWork
from src.config import settings
from .utils import verify_google_id_token
from .schemas import LoginResponse


class AuthService:
    def __init__(self, uow: UnitOfWork):
        self.uow = uow

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

    async def google_login(self, id_token: str) -> LoginResponse:
        user_data = verify_google_id_token(id_token)
        user = await self.uow.users.get_by_google_sub(user_data["sub"])
        if not user:
            user = await self.uow.users.create(user_data)
            await self.uow.commit()

        jwt = self.create_access_token(user.id)

        return {
            "access_token": jwt,
            "user": {
                "name": user["name"],
                "email": user["email"],
                "picture": user.get("picture")
            },
        }
