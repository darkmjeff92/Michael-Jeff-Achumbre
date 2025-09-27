-- AI Labs Database Schema for Supabase
-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "vector";

-- Enable Row Level Security
ALTER DEFAULT PRIVILEGES REVOKE EXECUTE ON FUNCTIONS FROM PUBLIC;

-- Documents table for storing uploaded file metadata
CREATE TABLE IF NOT EXISTS documents (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  filename TEXT NOT NULL,
  original_filename TEXT NOT NULL,
  file_size BIGINT NOT NULL,
  content_type TEXT NOT NULL,
  ip_address INET NOT NULL,
  upload_date TIMESTAMPTZ DEFAULT NOW(),
  expires_at TIMESTAMPTZ NOT NULL,
  chunk_count INTEGER DEFAULT 0,
  word_count INTEGER DEFAULT 0,
  processing_status TEXT DEFAULT 'pending' CHECK (processing_status IN ('pending', 'processing', 'completed', 'error')),
  storage_path TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Document embeddings table for RAG vector storage
CREATE TABLE IF NOT EXISTS document_embeddings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  document_id UUID NOT NULL REFERENCES documents(id) ON DELETE CASCADE,
  chunk_text TEXT NOT NULL,
  embedding VECTOR(1536), -- OpenAI text-embedding-3-small dimension
  chunk_index INTEGER NOT NULL,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),

  -- Create index for faster similarity search
  CONSTRAINT unique_document_chunk UNIQUE (document_id, chunk_index)
);

-- Usage analytics table for tracking questions and uploads
CREATE TABLE IF NOT EXISTS usage_analytics (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  ip_address INET NOT NULL,
  action_type TEXT NOT NULL CHECK (action_type IN ('question', 'upload', 'delete')),
  document_id UUID REFERENCES documents(id) ON DELETE SET NULL,
  timestamp TIMESTAMPTZ DEFAULT NOW(),
  week_start DATE NOT NULL,
  response_time_ms INTEGER,
  user_agent TEXT,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_documents_ip_expires ON documents(ip_address, expires_at);
CREATE INDEX IF NOT EXISTS idx_documents_expires_at ON documents(expires_at);
CREATE INDEX IF NOT EXISTS idx_documents_processing_status ON documents(processing_status);

-- Vector similarity search index
CREATE INDEX IF NOT EXISTS idx_document_embeddings_vector ON document_embeddings USING ivfflat (embedding vector_cosine_ops);
CREATE INDEX IF NOT EXISTS idx_document_embeddings_document_id ON document_embeddings(document_id);

-- Analytics indexes for fast queries
CREATE INDEX IF NOT EXISTS idx_usage_analytics_ip_week ON usage_analytics(ip_address, week_start);
CREATE INDEX IF NOT EXISTS idx_usage_analytics_action_timestamp ON usage_analytics(action_type, timestamp);
CREATE INDEX IF NOT EXISTS idx_usage_analytics_timestamp ON usage_analytics(timestamp);

-- Function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to update updated_at on documents table
CREATE TRIGGER update_documents_updated_at
  BEFORE UPDATE ON documents
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Function to get current week start (Monday) in Korean timezone
CREATE OR REPLACE FUNCTION get_korean_week_start()
RETURNS DATE AS $$
BEGIN
  RETURN (NOW() AT TIME ZONE 'Asia/Seoul')::DATE - EXTRACT(DOW FROM (NOW() AT TIME ZONE 'Asia/Seoul'))::INTEGER + 1;
END;
$$ LANGUAGE plpgsql;

-- Function to clean up expired documents (run via cron or periodically)
CREATE OR REPLACE FUNCTION cleanup_expired_documents()
RETURNS INTEGER AS $$
DECLARE
  deleted_count INTEGER;
BEGIN
  -- Delete expired documents (cascades to embeddings via FK)
  DELETE FROM documents
  WHERE expires_at < NOW();

  GET DIAGNOSTICS deleted_count = ROW_COUNT;

  -- Log cleanup activity
  INSERT INTO usage_analytics (ip_address, action_type, week_start, metadata)
  VALUES ('127.0.0.1'::INET, 'delete', get_korean_week_start(),
          jsonb_build_object('cleanup_count', deleted_count, 'type', 'automated_cleanup'));

  RETURN deleted_count;
END;
$$ LANGUAGE plpgsql;

-- Function to check rate limits for IP address
CREATE OR REPLACE FUNCTION check_rate_limit(
  user_ip INET,
  action_type_param TEXT
)
RETURNS JSONB AS $$
DECLARE
  current_week DATE;
  question_count INTEGER;
  upload_count INTEGER;
  result JSONB;
BEGIN
  current_week := get_korean_week_start();

  -- Count questions this week
  SELECT COUNT(*) INTO question_count
  FROM usage_analytics
  WHERE ip_address = user_ip
    AND week_start = current_week
    AND action_type = 'question';

  -- Count uploads this week
  SELECT COUNT(*) INTO upload_count
  FROM usage_analytics
  WHERE ip_address = user_ip
    AND week_start = current_week
    AND action_type = 'upload';

  result := jsonb_build_object(
    'questions_used', question_count,
    'questions_limit', 10,
    'uploads_used', upload_count,
    'uploads_limit', 3,
    'week_start', current_week,
    'can_question', question_count < 10,
    'can_upload', upload_count < 3
  );

  RETURN result;
END;
$$ LANGUAGE plpgsql;

-- Function to track usage
CREATE OR REPLACE FUNCTION track_usage(
  user_ip INET,
  action_type_param TEXT,
  document_id_param UUID DEFAULT NULL,
  response_time_param INTEGER DEFAULT NULL,
  user_agent_param TEXT DEFAULT NULL,
  metadata_param JSONB DEFAULT '{}'
)
RETURNS BOOLEAN AS $$
DECLARE
  current_week DATE;
BEGIN
  current_week := get_korean_week_start();

  INSERT INTO usage_analytics (
    ip_address,
    action_type,
    document_id,
    week_start,
    response_time_ms,
    user_agent,
    metadata
  ) VALUES (
    user_ip,
    action_type_param,
    document_id_param,
    current_week,
    response_time_param,
    user_agent_param,
    metadata_param
  );

  RETURN TRUE;
END;
$$ LANGUAGE plpgsql;

-- Row Level Security policies (optional, for additional security)
ALTER TABLE documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE document_embeddings ENABLE ROW LEVEL SECURITY;
ALTER TABLE usage_analytics ENABLE ROW LEVEL SECURITY;

-- Allow all operations for now (adjust based on your auth strategy)
CREATE POLICY "Allow all operations on documents" ON documents FOR ALL USING (true);
CREATE POLICY "Allow all operations on document_embeddings" ON document_embeddings FOR ALL USING (true);
CREATE POLICY "Allow all operations on usage_analytics" ON usage_analytics FOR ALL USING (true);

-- Sample data for testing (optional)
-- INSERT INTO documents (filename, original_filename, file_size, content_type, ip_address, expires_at, processing_status)
-- VALUES ('test-doc.pdf', 'Test Document.pdf', 1024000, 'application/pdf', '192.168.1.1'::INET, NOW() + INTERVAL '2 hours', 'completed');