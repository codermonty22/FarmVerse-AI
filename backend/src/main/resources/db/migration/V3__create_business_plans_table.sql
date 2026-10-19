-- V3: Farm Business Plans & Financial Projections Table
CREATE TABLE IF NOT EXISTS farm_business_plans (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES app_users(id) ON DELETE CASCADE,
    farm_profile_id UUID REFERENCES farm_profiles(id) ON DELETE SET NULL,
    plan_name VARCHAR(150) NOT NULL,
    crop_name VARCHAR(100) NOT NULL,
    land_size NUMERIC(10, 2) NOT NULL,
    land_unit VARCHAR(20) NOT NULL DEFAULT 'Acres',
    seed_cost NUMERIC(12, 2) NOT NULL DEFAULT 0.00,
    fertilizer_cost NUMERIC(12, 2) NOT NULL DEFAULT 0.00,
    labor_cost NUMERIC(12, 2) NOT NULL DEFAULT 0.00,
    irrigation_cost NUMERIC(12, 2) NOT NULL DEFAULT 0.00,
    machinery_cost NUMERIC(12, 2) NOT NULL DEFAULT 0.00,
    transport_cost NUMERIC(12, 2) NOT NULL DEFAULT 0.00,
    contingency_percent NUMERIC(5, 2) NOT NULL DEFAULT 10.00,
    expected_yield_quintals NUMERIC(10, 2) NOT NULL,
    selling_price_per_quintal NUMERIC(12, 2) NOT NULL,
    total_cost NUMERIC(14, 2) NOT NULL,
    gross_revenue NUMERIC(14, 2) NOT NULL,
    net_profit NUMERIC(14, 2) NOT NULL,
    roi_percent NUMERIC(8, 2) NOT NULL,
    break_even_price_per_quintal NUMERIC(12, 2) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_plans_user ON farm_business_plans(user_id);
CREATE INDEX IF NOT EXISTS idx_plans_created_at ON farm_business_plans(created_at DESC);
