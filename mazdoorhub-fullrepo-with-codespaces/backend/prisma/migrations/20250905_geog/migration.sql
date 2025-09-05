-- Ensure PostGIS
CREATE EXTENSION IF NOT EXISTS postgis;

-- Add geography column to WorkerProfile
DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name='WorkerProfile' AND column_name='location'
  ) THEN
    ALTER TABLE "WorkerProfile" ADD COLUMN location geography(Point,4326);
  END IF;
END $$;

CREATE INDEX IF NOT EXISTS worker_location_gix ON "WorkerProfile" USING GIST (location);

-- Auto-sync geography from lat/lon
CREATE OR REPLACE FUNCTION set_worker_geog()
RETURNS trigger AS $$
BEGIN
  IF NEW.lat IS NOT NULL AND NEW.lon IS NOT NULL THEN
    NEW.location := ST_SetSRID(ST_MakePoint(NEW.lon, NEW.lat), 4326)::geography;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS worker_loc_trig ON "WorkerProfile";
CREATE TRIGGER worker_loc_trig
BEFORE INSERT OR UPDATE ON "WorkerProfile"
FOR EACH ROW EXECUTE PROCEDURE set_worker_geog();
