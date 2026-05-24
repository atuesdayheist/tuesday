from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from src.repository import BaseRepository
from src.auth.models import User


class UserRepository(BaseRepository[User]):
    def __init__(self, db: AsyncSession):
        super().__init__(db, User)

    async def get_by_google_sub(self, sub: str) -> User | None:
        result = await self.db.execute(select(User).where(User.sub == sub))
        return result.scalar_one_or_none()

    async def create(
        self,
        *,
        email: str,
        name: str | None = None,
        picture: str | None = None,
        sub: str,
    ) -> User:
        user = User(
            email=email,
            name=name,
            picture=picture,
            sub=sub,
        )

        self.db.add(user)

        return user
