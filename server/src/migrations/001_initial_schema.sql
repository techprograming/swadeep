-- Swadeep Shikshan Vikas Sanstha Database Schema
-- Migration: 001_initial_schema.sql

-- 1. Admin Users Table
CREATE TABLE IF NOT EXISTS admin_users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(80) NOT NULL UNIQUE,
    password_hash TEXT NOT NULL,
    role VARCHAR(30) NOT NULL DEFAULT 'admin',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. Contact Inquiries Table
CREATE TABLE IF NOT EXISTS inquiries (
    id SERIAL PRIMARY KEY,
    name VARCHAR(120) NOT NULL,
    email VARCHAR(150) NOT NULL,
    phone VARCHAR(30),
    subject VARCHAR(200) NOT NULL DEFAULT 'General Inquiry',
    message TEXT NOT NULL,
    status VARCHAR(30) NOT NULL DEFAULT 'new', -- 'new', 'reviewed', 'replied', 'archived'
    is_read BOOLEAN NOT NULL DEFAULT FALSE,
    ip_address VARCHAR(60),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_inquiries_created_at ON inquiries(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_inquiries_status ON inquiries(status);
CREATE INDEX IF NOT EXISTS idx_inquiries_is_read ON inquiries(is_read);

-- 3. Verified Impact Metrics Table
CREATE TABLE IF NOT EXISTS impact_metrics (
    id SERIAL PRIMARY KEY,
    metric_key VARCHAR(50) NOT NULL UNIQUE,
    label_en VARCHAR(120) NOT NULL,
    label_gu VARCHAR(120) NOT NULL,
    metric_value VARCHAR(50) NOT NULL,
    subtext_en VARCHAR(150),
    subtext_gu VARCHAR(150),
    reporting_period VARCHAR(100) DEFAULT '2005 - Present',
    source VARCHAR(150) DEFAULT 'Swadeep Official Records',
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_impact_metrics_key ON impact_metrics(metric_key);

-- 4. Programs Master Table
CREATE TABLE IF NOT EXISTS programs (
    id SERIAL PRIMARY KEY,
    slug VARCHAR(60) NOT NULL UNIQUE,
    title_en VARCHAR(150) NOT NULL,
    title_gu VARCHAR(150) NOT NULL,
    summary_en TEXT NOT NULL,
    summary_gu TEXT NOT NULL,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_programs_slug ON programs(slug);
