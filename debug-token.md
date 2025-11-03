# Debug Token Lookup

## Your Token
```
d2fc0170947c446f8edd0cce76015c2c17b39f28e8274e4daadffc100cbf4952
```

## Step 1: Test Debug Endpoint

### Option A: Using Browser
1. Start the backend: `cd hrSystemServer && ./mvnw spring-boot:run`
2. Open in browser:
```
http://localhost:8080/v1/calendar/meeting/debug/d2fc0170947c446f8edd0cce76015c2c17b39f28e8274e4daadffc100cbf4952
```

### Option B: Using curl
```bash
curl -X GET "http://localhost:8080/v1/calendar/meeting/debug/d2fc0170947c446f8edd0cce76015c2c17b39f28e8274e4daadffc100cbf4952"
```

### Option C: Production Server
```bash
curl -X GET "https://oneplace-hr-326159028339.asia-southeast1.run.app/v1/calendar/meeting/debug/d2fc0170947c446f8edd0cce76015c2c17b39f28e8274e4daadffc100cbf4952"
```

This will show you exactly where the lookup is failing.

## Step 2: SQL Queries to Check Database

### Query 1: Check CalendarMeeting table
```sql
SELECT * FROM calendar_meeting
WHERE calendar_token = 'd2fc0170947c446f8edd0cce76015c2c17b39f28e8274e4daadffc100cbf4952';
```

### Query 2: Check AssessmentPlayer table
```sql
SELECT * FROM assessment_players
WHERE calendar_token = 'd2fc0170947c446f8edd0cce76015c2c17b39f28e8274e4daadffc100cbf4952';
```

### Query 3: Full Lookup Chain
```sql
-- Get AssessmentPlayer
SELECT
    ap.id as ap_id,
    ap.player_id,
    ap.calendar_token,
    p.id as player_id,
    p.phone_number,
    p.email
FROM assessment_players ap
LEFT JOIN players p ON p.id = ap.player_id
WHERE ap.calendar_token = 'd2fc0170947c446f8edd0cce76015c2c17b39f28e8274e4daadffc100cbf4952';
```

### Query 4: Check Talent
```sql
-- If you got phone number from Query 3, replace PHONE_HERE
SELECT * FROM talent
WHERE phone = 'PHONE_HERE'
ORDER BY id DESC;
```

### Query 5: Check CalendarMeeting by Talent
```sql
-- If you got talent_id and calendar_id from Query 4, replace them
SELECT * FROM calendar_meeting
WHERE talent_id = TALENT_ID_HERE
AND calendar_id = CALENDAR_ID_HERE
ORDER BY id DESC;
```

## Step 3: Test the Main API

```bash
# Test the actual endpoint
curl -X GET "http://localhost:8080/v1/calendar/meeting/by-token/d2fc0170947c446f8edd0cce76015c2c17b39f28e8274e4daadffc100cbf4952"
```

Or production:
```bash
curl -X GET "https://oneplace-hr-326159028339.asia-southeast1.run.app/v1/calendar/meeting/by-token/d2fc0170947c446f8edd0cce76015c2c17b39f28e8274e4daadffc100cbf4952"
```

## Expected Debug Output

### Success:
```json
{
  "token": "d2fc0170947c446f8edd0cce76015c2c17b39f28e8274e4daadffc100cbf4952",
  "timestamp": "2025-01-10",
  "step1_direct_meeting": "Not found",
  "step2_assessment_player": "Found: id=123, playerId=456",
  "step3_player": "Found: id=456, phone=99001234",
  "step4_talent": "Found: id=789, calendarId=1, phone=99001234",
  "step5_meetings": "Found 1 meeting(s), most recent: id=999, date=2025-01-15, startTime=10:00",
  "status": "completed"
}
```

### Failure at Step 2:
```json
{
  "token": "d2fc0170947c446f8edd0cce76015c2c17b39f28e8274e4daadffc100cbf4952",
  "timestamp": "2025-01-10",
  "step1_direct_meeting": "Not found",
  "step2_assessment_player": "Not found",
  "status": "completed"
}
```
This means: No AssessmentPlayer with this token exists.

## What Each Step Means

- **Step 1**: Check if booking already has token (for new bookings)
- **Step 2**: Find the AssessmentPlayer record (should exist)
- **Step 3**: Get the Player details (should have phone number)
- **Step 4**: Find the Talent using phone number
- **Step 5**: Find the CalendarMeeting for this talent

## Next Steps Based on Results

### If Step 2 fails (No AssessmentPlayer):
The token `d2fc0170947c446f8edd0cce76015c2c17b39f28e8274e4daadffc100cbf4952` doesn't exist in assessment_players table.

**Solution**: Check where this token comes from. It should be in the URL when the interview invitation was sent.

### If Step 3 fails (No Player):
The playerId doesn't exist in players table.

**Solution**: Data inconsistency. Check assessment_players.player_id.

### If Step 4 fails (No Talent):
No talent found with that phone number.

**Solution**: The user hasn't booked yet, OR used a different phone number when booking.

### If Step 5 fails (No Meetings):
Talent exists but no bookings.

**Solution**: The user hasn't booked yet. This is normal for first-time visitors.
