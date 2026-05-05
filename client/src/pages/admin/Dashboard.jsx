import { Box, Typography, Paper, Grid, Button } from "@mui/material";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const { user, isAdmin } = useAuth();
  const navigate = useNavigate();

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>Welcome, {user?.email}</Typography>
      {isAdmin() && (
        <Button variant="contained" onClick={() => navigate("/admin/ai")} sx={{ mb: 3 }}>
          🤖 AI Control Panel
        </Button>
      )}
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}><Paper sx={{ p: 3 }}>📰 Unified Feed</Paper></Grid>
        <Grid item xs={12} md={4}><Paper sx={{ p: 3 }}>📞 Live Courses</Paper></Grid>
        <Grid item xs={12} md={4}><Paper sx={{ p: 3 }}>🛒 Marketplace</Paper></Grid>
      </Grid>
    </Box>
  );
}
