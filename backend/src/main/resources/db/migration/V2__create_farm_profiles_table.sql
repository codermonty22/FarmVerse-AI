-- V2: Farmer Profile and Farm Metadata Table
CREATE TABLE IF NOT EXISTS farm_profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES app_users(id) ON DELETE CASCADE,
    farm_name VARCHAR(150),
    state VARCHAR(80) NOT NULL,
    district VARCHAR(80) NOT NULL,
    village VARCHAR(100),
    land_size NUMERIC(10, 2) NOT NULL,
    land_unit VARCHAR(20) NOT NULL DEFAULT 'Acres',
    soil_type VARCHAR(60),
    water_availability VARCHAR(80),
    budget_range VARCHAR(60),
    farming_experience VARCHAR(50),
    machinery_available TEXT[],
    crops_grown TEXT[],
    is_onboarded BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT uk_farm_user UNIQUE(user_id)
);

CREATE TABLE IF NOT EXISTS farm_machinery (
    farm_profile_id UUID NOT NULL REFERENCES farm_profiles(id) ON DELETE CASCADE,
    machinery_name VARCHAR(100) NOT NULL
);

CREATE TABLE IF NOT EXISTS farm_crops_grown (
    farm_profile_id UUID NOT NULL REFERENCES farm_profiles(id) ON DELETE CASCADE,
    crop_name VARCHAR(100) NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_farm_profiles_user ON farm_profiles(user_id);
CREATE INDEX IF NOT EXISTS idx_farm_profiles_location ON farm_profiles(state, district);

