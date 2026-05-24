from typing import Generic, TypeVar, Type
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

ModelType = TypeVar("ModelType")


class BaseRepository(Generic[ModelType]):
    def __init__(self, db, model: Type[ModelType]):
        self.db = db
        self.model = model

    async def get_by_id(self, id: int):
        result = await self.db.execute(
            select(self.model).where(self.model.id == id)
        )
        return result.scalar_one_or_none()

    async def get_all(self):
        result = await self.db.execute(select(self.model))
        return result.scalars().all()

    async def create(self, **kwargs):
        obj = self.model(**kwargs)
        self.db.add(obj)

        await self.db.flush()
        await self.db.refresh(obj)

        return obj

    async def delete(self, obj):
        await self.db.delete(obj)

    async def update(self, obj, **kwargs):
        for key, value in kwargs.items():
            if hasattr(obj, key):
                setattr(obj, key, value)

        self.db.add(obj)

        await self.db.flush()
        await self.db.refresh(obj)

        return obj
