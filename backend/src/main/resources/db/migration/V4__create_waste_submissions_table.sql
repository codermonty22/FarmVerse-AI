-- V4: Waste-to-Wealth Farmer Submissions & Off-Take Inquiries Table
CREATE TABLE IF NOT EXISTS waste_submissions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES app_users(id) ON DELETE CASCADE,
    crop_source VARCHAR(100) NOT NULL,
    residue_type VARCHAR(120) NOT NULL,
    estimated_quantity_tonnes NUMERIC(10, 2) NOT NULL,
    expected_availability_date DATE NOT NULL,
    district VARCHAR(80) NOT NULL,
    state VARCHAR(80) NOT NULL,
    contact_phone VARCHAR(20) NOT NULL,
    notes TEXT,
    status VARCHAR(30) NOT NULL DEFAULT 'PENDING_REVIEW',
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_waste_submissions_user ON waste_submissions(user_id);
CREATE INDEX IF NOT EXISTS idx_waste_submissions_status ON waste_submissions(status);
