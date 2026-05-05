import { useState } from "react";
import { Box, TextField, Button, Alert, Typography, Paper } from "@mui/material";
import api from "../../config/api";
import DeployModal from "../../components/ai/DeployModal";

export default function AIControl() {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(null);
  const [error, setError] = useState("");

  const handleGenerate = async () => {
    setLoading(true); setError(""); setPreview(null);
    try {
      const { data } = await api.post("/ai/preview", { prompt, filePath: "client/src/pages/admin/Feed.jsx" });
      setPreview(data);
    } catch (err) { setError(err.response?.data?.error || err.message); }
    finally { setLoading(false); }
  };

  const handleDeploy = async (msg) => {
    if (!msg) { setPreview(null); return; }
    setLoading(true);
    try {
      await api.post("/ai/deploy", { patch: preview.patch, commitMsg: msg });
      alert("✅ File updated! Push to GitHub to deploy live.");
      setPreview(null); setPrompt("");
    } catch (err) { setError(err.message); }
    finally { setLoading(false); }
  };

  return (
    <Box sx={{ p: 3, maxWidth: 900, margin: "0 auto" }}>
      <Typography variant="h4" gutterBottom>🤖 AI Code Generator</Typography>
      <Paper sx={{ p: 3, mb: 2 }}>
        <TextField fullWidth label="Prompt (e.g., Add like button to Feed post)" value={prompt} onChange={(e) => setPrompt(e.target.value)} multiline rows={3} sx={{ mb: 2 }} />
        <Button variant="contained" onClick={handleGenerate} disabled={loading}>🔍 Generate Preview</Button>
      </Paper>
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      {preview && <DeployModal preview={preview} onDeploy={handleDeploy} />}
    </Box>
  );
}
