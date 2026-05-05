import { useState } from "react";
import { Box, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Alert } from "@mui/material";

export default function FilesManager() {
  const [files] = useState([]);

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>📁 AI & User Files</Typography>
      <Alert severity="info" sx={{ mb: 2 }}>Files generated or uploaded via AI will appear here with version tracking.</Alert>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>File</TableCell>
              <TableCell>Version</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {files.length === 0 ? (
              <TableRow><TableCell colSpan={4} align="center">No files yet. Use AI or upload to start.</TableCell></TableRow>
            ) : (
              files.map(f => (
                <TableRow key={f.id}>
                  <TableCell>{f.name}</TableCell>
                  <TableCell>v{f.version}</TableCell>
                  <TableCell>{f.linkedAI ? "🤖 AI" : "👤 User"}</TableCell>
                  <TableCell><Button size="small" variant="outlined">View/Edit</Button></TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
