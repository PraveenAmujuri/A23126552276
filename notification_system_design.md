# Stage 1

## Notification APIs

### Get Notifications

**GET** `/notifications`

Headers:

```json
{
  "Authorization": "Bearer token"
}
```

Response:

```json
{
  "notifications": [
    {
      "id": "1",
      "studentId": 1042,
      "type": "Placement",
      "message": "Company hiring",
      "isRead": false,
      "createdAt": "2026-06-23T10:00:00Z"
    }
  ]
}
```

### Mark Notification As Read

**PATCH** `/notifications/:id/read`

Response:

```json
{
  "message": "Notification marked as read"
}
```

### Mark All Notifications As Read

**PATCH** `/notifications/read-all`

Response:

```json
{
  "message": "All notifications marked as read"
}
```

## Real-Time Notifications

I would use WebSockets for real-time notifications.

Reasons:

* Instant notification delivery
* Reduces repeated API polling
* Better user experience

---

# Stage 2

## Database Choice

I would use PostgreSQL.

Reasons:

* Structured notification data
* Reliable transactions
* Good indexing support
* Easy querying and reporting

## Schema

### Students

```sql
CREATE TABLE students (
    id INT PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(100)
);
```

### Notifications

```sql
CREATE TABLE notifications (
    id SERIAL PRIMARY KEY,
    studentId INT,
    notificationType VARCHAR(20),
    message TEXT,
    isRead BOOLEAN DEFAULT FALSE,
    createdAt TIMESTAMP
);
```

## Example Query

Get notifications:

```sql
SELECT *
FROM notifications
WHERE studentId = 1042
ORDER BY createdAt DESC;
```

## Growth Challenges

Problems:

* Slow queries
* Large storage requirements
* Increased database load

Solutions:

* Indexing
* Pagination
* Database partitioning
* Caching frequently accessed data

---

# Stage 3

Query:

```sql
SELECT *
FROM notifications
WHERE studentID = 1042
AND isRead = false
ORDER BY createdAt ASC;
```

## Why Slow?

* Scans many rows
* Sorting is expensive
* Uses SELECT *

## Improvement

Create composite index:

```sql
CREATE INDEX idx_notifications
ON notifications(studentID,isRead,createdAt);
```

Improved query:

```sql
SELECT id,message,createdAt
FROM notifications
WHERE studentID = 1042
AND isRead = false
ORDER BY createdAt ASC;
```

## Index Every Column?

No.

Reasons:

* Increases storage
* Slows inserts and updates
* Many indexes are never used

Indexes should only be added for frequently queried columns.

## Placement Notifications In Last 7 Days

```sql
SELECT DISTINCT studentID
FROM notifications
WHERE notificationType = 'Placement'
AND createdAt >= NOW() - INTERVAL '7 days';
```

---

# Stage 4

## Problem

Notifications are fetched on every page load causing heavy database traffic.

## Solutions

### Caching

Use Redis cache.

Pros:

* Faster response

Cons:

* Extra infrastructure

### Pagination

Load notifications in pages.

Pros:

* Less data transferred

Cons:

* Additional client logic

### WebSockets

Push notifications directly.

Pros:

* Real-time updates

Cons:

* Persistent connections required

---

# Stage 5

## Problems In Existing Design

* Sequential processing
* Slow for 50,000 students
* Email failures stop reliability
* No retry mechanism

## Improved Design

1. Save notifications to database.
2. Push notification jobs to queue.
3. Worker processes emails independently.
4. Retry failed email jobs.

### Revised Pseudocode

```text
function notify_all(student_ids, message):

    save_notifications(student_ids, message)

    for each student_id:
        add_email_job(student_id, message)

    push_realtime_notification(student_ids, message)
```

## Should DB Save And Email Happen Together?

No.

Database storage should happen first.

Reason:

* Notification record is preserved even if email delivery fails.
* Failed emails can be retried later without losing data.

```
```
