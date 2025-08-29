import React, { useState } from 'react';
import {
  Box,
  Button,
  Typography,
  IconButton,
  MenuItem,
  Paper,
  Grid,
  Stack,
  Input,
} from '@mui/material';
import { Add, Delete, UploadFile, InsertDriveFile } from '@mui/icons-material';

function DocumentsForm() {
  const [sections, setSections] = useState([{ name: '', type: '', files: [] }]);
  const [allFiles, setAllFiles] = useState([]);

  const addSection = () => {
    setSections([...sections, { name: '', type: '', files: [] }]);
  };

  const removeSection = (index) => {
    const removedFiles = sections[index].files;
    const updatedFiles = allFiles.filter(
      (f) => !removedFiles.find((rf) => rf.name === f.file.name && f.sectionIndex === index)
    );
    setAllFiles(updatedFiles);
    setSections(sections.filter((_, i) => i !== index));
  };

  const handleChange = (index, field, value) => {
    const updated = [...sections];
    updated[index][field] = value;
    setSections(updated);
  };

  const handleDrop = (index, files) => {
    const dropped = Array.from(files);
    const updatedSections = [...sections];
    updatedSections[index].files = [...updatedSections[index].files, ...dropped];
    setSections(updatedSections);
    const newGlobalFiles = dropped.map((file) => ({ file, sectionIndex: index }));
    setAllFiles((prev) => [...prev, ...newGlobalFiles]);
  };

  const handleInputFileChange = (index, files) => {
    handleDrop(index, files);
  };

  const removeFileFromSection = (sectionIndex, fileName) => {
    const updatedSections = [...sections];
    updatedSections[sectionIndex].files = updatedSections[sectionIndex].files.filter(
      (file) => file.name !== fileName
    );
    setSections(updatedSections);
    setAllFiles(
      allFiles.filter((f) => !(f.file.name === fileName && f.sectionIndex === sectionIndex))
    );
  };

  const getFileType = (name) => {
    if (/\.(jpe?g|png|gif)$/i.test(name)) return 'image';
    if (/\.pdf$/i.test(name)) return 'pdf';
    if (/\.(doc|docx)$/i.test(name)) return 'word';
    return 'other';
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitted:', sections);
    alert('Form submitted! Check console for details.');
  };

  return (
    <Box sx={{ display: 'flex', padding: '80px 24px 24px 280px', gap: 4 }}>
      <Box component="form" onSubmit={handleSubmit} sx={{ flex: 3 }}>
        <Typography variant="h5" mb={2}>
          Upload Employee Documents
        </Typography>

        {sections.map((section, index) => (
          <Paper key={index} sx={{ p: 3, mb: 3 }} elevation={3}>
            <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
              <Typography variant="subtitle1">Document Section {index + 1}</Typography>
              <IconButton onClick={() => removeSection(index)}>
                <Delete color="error" />
              </IconButton>
            </Stack>

            <Input
              fullWidth
              placeholder="Document Name"
              value={section.name}
              onChange={(e) => handleChange(index, 'name', e.target.value)}
              required
              sx={{ mb: 2 }}
            />

            <Input
              fullWidth
              select
              value={section.type}
              onChange={(e) => handleChange(index, 'type', e.target.value)}
              required
              sx={{ mb: 2 }}
            >
              <MenuItem value="">Select Document Type</MenuItem>
              <MenuItem value="ID">ID</MenuItem>
              <MenuItem value="Resume">Resume</MenuItem>
              <MenuItem value="Contract">Contract</MenuItem>
            </Input>

            <Button variant="outlined" component="label" startIcon={<UploadFile />} fullWidth>
              Upload File(s)
              <input
                type="file"
                hidden
                multiple
                onChange={(e) => handleInputFileChange(index, e.target.files)}
              />
            </Button>

            <Stack direction="row" spacing={2} mt={2} flexWrap="wrap">
              {section.files.map((file, idx) => {
                const type = getFileType(file.name);
                return (
                  <Box
                    key={idx}
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1,
                      background: '#f3f4f6',
                      p: 1,
                      borderRadius: 1,
                    }}
                  >
                    {type === 'image' ? (
                      <img
                        src={URL.createObjectURL(file)}
                        alt={file.name}
                        style={{ width: 30, height: 30, borderRadius: 4 }}
                      />
                    ) : (
                      <InsertDriveFile sx={{ fontSize: 30 }} />
                    )}
                    <Typography variant="body2">{file.name}</Typography>
                    <IconButton
                      onClick={() => removeFileFromSection(index, file.name)}
                      size="small"
                      color="error"
                    >
                      ×
                    </IconButton>
                  </Box>
                );
              })}
            </Stack>
          </Paper>
        ))}

        <Button variant="contained" startIcon={<Add />} onClick={addSection} sx={{ mr: 2 }}>
          Add More Documents
        </Button>

        <Button type="submit" variant="contained" color="success" fullWidth sx={{ mt: 3 }}>
          Submit
        </Button>
      </Box>

      <Box
        sx={{
          flex: 1,
          background: '#fff',
          p: 3,
          borderRadius: 2,
          boxShadow: 2,
          height: 'fit-content',
          maxHeight: 'calc(100vh - 120px)',
          overflowY: 'auto',
        }}
      >
        <Typography variant="h6" gutterBottom>
          Uploaded Files
        </Typography>
        {allFiles.length === 0 ? (
          <Typography variant="body2" sx={{ color: 'gray' }}>
            No documents uploaded yet.
          </Typography>
        ) : (
          <Stack spacing={2}>
            {allFiles.map((item, idx) => (
              <Box
                key={idx}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 2,
                  background: '#f0f0f0',
                  p: 1,
                  borderRadius: 1,
                }}
              >
                {getFileType(item.file.name) === 'image' ? (
                  <img
                    src={URL.createObjectURL(item.file)}
                    alt={item.file.name}
                    style={{ width: 32, height: 32, borderRadius: 4 }}
                  />
                ) : (
                  <InsertDriveFile sx={{ fontSize: 28 }} />
                )}
                <Typography
                  variant="body2"
                  sx={{
                    flex: 1,
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                >
                  {item.file.name}
                </Typography>
                <IconButton
                  onClick={() => removeFileFromSection(item.sectionIndex, item.file.name)}
                  size="small"
                  color="error"
                >
                  ×
                </IconButton>
              </Box>
            ))}
          </Stack>
        )}
      </Box>
    </Box>
  );
}

export default DocumentsForm;
