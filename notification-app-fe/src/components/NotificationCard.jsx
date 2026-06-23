import {
  Card,
  CardContent,
  Chip,
  Stack,
  Typography
} from "@mui/material";

export function NotificationCard({
  notification,
  viewed
}) {
  return (
    <Card>
      <CardContent>
        <Stack
          direction="row"
          justifyContent="space-between"
        >
          <Typography
            fontWeight="bold"
          >
            {notification.Type}
          </Typography>

          <Chip
            label={
              viewed
                ? "Viewed"
                : "New"
            }
            color={
              viewed
                ? "default"
                : "primary"
            }
            size="small"
          />
        </Stack>

        <Typography mt={1}>
          {notification.Message}
        </Typography>

        <Typography
          variant="caption"
        >
          {notification.Timestamp}
        </Typography>
      </CardContent>
    </Card>
  );
}