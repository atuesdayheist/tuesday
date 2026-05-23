from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    APP_NAME: str = "Tuesday"

    PGHOST: str
    PGPORT: int
    PGUSER: str
    PGPASSWORD: str
    PGDATABASE: str
    DATABASE_URL: str

    GOOGLE_CLIENT_ID: str

    JWT_SECRET: str

    CORS_ORIGINS: list[str]

    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        extra="ignore",
    )


settings = Settings()
