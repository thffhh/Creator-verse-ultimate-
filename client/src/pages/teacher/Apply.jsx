import { useState } from "react";
import { Box, Typography, Paper, TextField, Button, Alert, Checkbox, FormControlLabel } from "@mui/material";
import api from "../../config/api";

export default function TeacherApply() {
  const [bio, setBio] = useState("");
  const [expertise, setExpertise] = useState([]);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  const handleApply = async () => {
    setLoading(true); setMsg("");
    try {
      await api.post("/teachers/apply", { bio, expertise });
      setMsg("✅ Application submitted! Admin will review.");
    } catch (e) { setMsg("❌ " + (e.response?.data?.error || "Failed")); }
    finally { setLoading(false); }
  };

  const toggleExp = (val) => setExpertise(prev => prev.includes(val) ? prev.filter(e => e !== val) : [...prev, val]);

  return (
    <Box sx={{ p: 2, maxWidth: 500, mx: "auto" }}>
      <Typography variant="h5" gutterBottom>👨‍🏫 Apply as Teacher</Typography>
      {msg && <Alert severity={msg.includes("✅") ? "success" : "error"} sx={{ mb: 2 }}>{msg}</Alert>}
      <Paper sx={{ p: 2 }}>
        <TextField fullWidth multiline label="Bio" value={bio} onChange={e => setBio(e.target.value)} sx={{ mb: 2 }} />
        <Typography gutterBottom>Expertise (Select):</Typography>
        {["dubbing", "video-editing", "acting", "animation"].map(e => (
          <FormControlLabel key={e} control={<Checkbox checked={expertise.includes(e)} onChange={() => toggleExp(e)} />} label={e} />
        ))}
        <Button fullWidth variant="contained" sx={{ mt: 2 }} onClick={handleApply} disabled={loading}>Submit Application</Button>
      </Paper>
    </Box>
  );
}
