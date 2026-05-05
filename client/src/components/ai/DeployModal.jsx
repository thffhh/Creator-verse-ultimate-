import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, Box, Typography } from "@mui/material";
import { useState } from "react";

export default function DeployModal({ preview, onDeploy }) {
  const [msg, setMsg] = useState(`AI: ${preview.patch.description}`);

  return (
    <Dialog open onClose={() => onDeploy(null)} maxWidth="md" fullWidth>
      <DialogTitle>✅ Preview & Approve AI Change</DialogTitle>
      <DialogContent>
        <TextField fullWidth label="Commit Message" value={msg} onChange={(e) => setMsg(e.target.value)} sx={{ mb: 2 }} />
        <Box sx={{ background: "#1e1e1e", color: "#d4d4d4", p: 2, borderRadius: 2, maxHeight: 350, overflow: "auto", fontSize: 13 }}>
          <Typography variant="body2" gutterBottom>📄 {preview.patch.filePath}</Typography>
          <pre>{preview.patch.newContent}</pre>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => onDeploy(null)} color="error">❌ Reject</Button>
        <Button variant="contained" color="success" onClick={() => onDeploy(msg)}>✅ Save & Deploy</Button>
      </DialogActions>
    </Dialog>
  );
}
