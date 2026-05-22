from fastapi import FastAPI

from api.core.lifespan import lifespan
from api.core.logging import setup_logging
from api.routes.authroutes import router as auth_router


setup_logging()

app = FastAPI(title="My API", version="0.1.0", lifespan=lifespan)

@app.get("/")
async def root():
    return {"message": "Hello World"}


@app.get("/health")
async def health():
    return {"status": "ok"}


app.include_router(auth_router, prefix="/auth")
