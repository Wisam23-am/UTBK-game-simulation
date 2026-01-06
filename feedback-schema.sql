-- ============================================
-- USER FEEDBACK TABLE SCHEMA
-- Run this in Supabase SQL Editor
-- ============================================

-- 1. Create user_feedback table
CREATE TABLE IF NOT EXISTS user_feedback (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users ON DELETE CASCADE NOT NULL,
  feedback_type VARCHAR(20) NOT NULL CHECK (feedback_type IN ('bug', 'question', 'comment')),
  title VARCHAR(200) NOT NULL,
  description TEXT NOT NULL,
  question_id VARCHAR(100), -- Optional, for question-related feedback
  screenshot_url TEXT, -- URL to uploaded screenshot
  user_comment TEXT, -- User's additional comments, feature requests, or suggestions
  status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'reviewed', 'resolved', 'rejected')),
  admin_notes TEXT, -- For admin to add notes
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- 2. Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_user_feedback_user ON user_feedback(user_id);
CREATE INDEX IF NOT EXISTS idx_user_feedback_type ON user_feedback(feedback_type);
CREATE INDEX IF NOT EXISTS idx_user_feedback_status ON user_feedback(status);
CREATE INDEX IF NOT EXISTS idx_user_feedback_created ON user_feedback(created_at DESC);

-- 3. Enable Row Level Security (RLS)
ALTER TABLE user_feedback ENABLE ROW LEVEL SECURITY;

-- 4. RLS Policies
-- IMPORTANT: Feedback is PRIVATE - users can only submit, NOT view their own feedback
-- Only admins can view all feedback through database access

-- Users can ONLY insert their own feedback (no SELECT access)
DROP POLICY IF EXISTS "Users can view own feedback" ON user_feedback;
DROP POLICY IF EXISTS "Users can update own pending feedback" ON user_feedback;

DROP POLICY IF EXISTS "Users can insert own feedback" ON user_feedback;
CREATE POLICY "Users can insert own feedback"
  ON user_feedback FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- No SELECT policy for users - feedback is private and only visible to admins via database

-- 5. Create storage bucket for feedback screenshots
-- Note: Run this in Supabase Dashboard -> Storage, or via SQL:
INSERT INTO storage.buckets (id, name, public)
VALUES ('feedback-screenshots', 'feedback-screenshots', true)
ON CONFLICT (id) DO NOTHING;

-- 6. Storage policies for feedback-screenshots bucket
-- IMPORTANT: Screenshots are PRIVATE - only admins can view via Supabase Dashboard

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Users can upload feedback screenshots" ON storage.objects;
DROP POLICY IF EXISTS "Users can delete own feedback screenshots" ON storage.objects;

-- Allow authenticated users to upload
CREATE POLICY "Users can upload feedback screenshots"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'feedback-screenshots');

-- NO public read access - screenshots are private
-- Admins can view via Supabase Dashboard Storage section

-- Allow users to delete their own screenshots (optional - for cleanup)
CREATE POLICY "Users can delete own feedback screenshots"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'feedback-screenshots' AND auth.uid()::text = (storage.foldername(name))[1]);

-- 7. Create view for feedback with user info (for admin)
-- Only accessible via Supabase Dashboard with admin credentials
CREATE OR REPLACE VIEW feedback_with_user AS
SELECT
  f.id,
  f.user_id,
  p.username,
  p.full_name,
  p.school,
  p.target_university,
  f.feedback_type,
  f.title,
  f.description,
  f.question_id,
  f.screenshot_url,
  f.user_comment,
  f.status,
  f.admin_notes,
  f.created_at,
  f.updated_at
FROM user_feedback f
LEFT JOIN profiles p ON f.user_id = p.id
ORDER BY f.created_at DESC;

-- 8. Function to auto-update updated_at timestamp
CREATE OR REPLACE FUNCTION update_feedback_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 9. Trigger for auto-updating timestamp
DROP TRIGGER IF EXISTS trigger_update_feedback_timestamp ON user_feedback;
CREATE TRIGGER trigger_update_feedback_timestamp
BEFORE UPDATE ON user_feedback
FOR EACH ROW
EXECUTE FUNCTION update_feedback_updated_at();

-- 10. Verify table and view
SELECT 
  table_name, 
  table_type
FROM information_schema.tables
WHERE table_schema = 'public' 
  AND (table_name = 'user_feedback' OR table_name = 'feedback_with_user');

-- 11. Sample queries for viewing feedback

-- View all pending feedback
SELECT * FROM feedback_with_user WHERE status = 'pending' ORDER BY created_at DESC;

-- View bug reports
SELECT * FROM feedback_with_user WHERE feedback_type = 'bug' ORDER BY created_at DESC;

-- View question reports
SELECT * FROM feedback_with_user WHERE feedback_type = 'question' ORDER BY created_at DESC;

-- Count feedback by type
SELECT 
  feedback_type,
  COUNT(*) as total,
  SUM(CASE WHEN status = 'pending' THEN 1 ELSE 0 END) as pending,
  SUM(CASE WHEN status = 'resolved' THEN 1 ELSE 0 END) as resolved
FROM user_feedback
GROUP BY feedback_type;

-- View user's feedback statistics
SELECT 
  p.username,
  COUNT(f.id) as total_feedback,
  SUM(CASE WHEN f.feedback_type = 'bug' THEN 1 ELSE 0 END) as bug_reports,
  SUM(CASE WHEN f.feedback_type = 'question' THEN 1 ELSE 0 END) as question_reports
FROM profiles p
LEFT JOIN user_feedback f ON p.id = f.user_id
GROUP BY p.id, p.username
ORDER BY total_feedback DESC
LIMIT 20;

-- 12. Documentation comments
COMMENT ON TABLE user_feedback IS 'User feedback submissions - PRIVATE, only visible to admins';
COMMENT ON COLUMN user_feedback.feedback_type IS 'Type: bug, question, or comment';
COMMENT ON COLUMN user_feedback.user_comment IS 'User comments for feature requests or additional suggestions';
COMMENT ON COLUMN user_feedback.status IS 'Status: pending, reviewed, resolved, rejected';
COMMENT ON VIEW feedback_with_user IS 'Admin-only view of all feedback with user information';
