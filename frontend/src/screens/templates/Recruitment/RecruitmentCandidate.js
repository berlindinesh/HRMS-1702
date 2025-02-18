import React, { useState, useEffect } from "react";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  IconButton,
  Avatar,
  TextField,
  Button,
  Box,
  Menu,
  MenuItem,
  ToggleButton,
  ToggleButtonGroup,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  Select,
  Chip,
  Fade,
  Snackbar,
  Alert,
  Paper,
} from "@mui/material";
import {
  Add,
  Search,
  List,
  GridView,
  FilterList,
  MoreVert,
  Delete,
  GroupWork,
} from "@mui/icons-material";
import axios from "axios";

const styles = {
  root: {
    padding: {
      xs: "12px",
      sm: "16px",
      md: "24px"
    },
    backgroundColor: "#f8fafc",
    minHeight: "100vh",
  },
  header: {
    display: "flex",
    flexDirection: {
      xs: "column",
      md: "row"
    },
    alignItems: {
      xs: "flex-start",
      md: "center"
    },
    gap: {
      xs: 2,
      md: 0
    },
    justifyContent: "space-between",
    marginBottom: "32px",
    padding: {
      xs: "16px",
      sm: "20px",
      md: "24px"
    },
    backgroundColor: "white",
    borderRadius: "12px",
    boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
  },
  actionButtons: {
    display: "flex",
    flexWrap: "wrap",
    gap: "16px",
    alignItems: "center",
    width: {
      xs: "100%",
      md: "auto"
    }
  },
  searchBar: {
    marginRight: 2,
    width: {
      xs: "100%",
      sm: "280px"
    },
    backgroundColor: "#fff",
    borderRadius: "8px",
    "& .MuiOutlinedInput-root": {
      "&:hover fieldset": {
        borderColor: "#2196f3",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#1976d2",
      },
    },
  },
  card: {
    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    borderRadius: "12px",
    "&:hover": {
      transform: "translateY(-4px)",
      boxShadow: "0 12px 24px rgba(0,0,0,0.1)",
    },
  },
  cardContent: {
    padding: "24px !important",
  },
  avatar: {
    width: 56,
    height: 56,
    fontWeight: "bold",
    fontSize: "1.5rem",
    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
  },
  statusChip: {
    marginTop: 1,
    fontWeight: 600,
    borderRadius: "8px",
    padding: "4px 12px",
    height: "28px",
  },
  dialog: {
    "& .MuiDialog-paper": {
      width: "560px",
      padding: "24px",
      borderRadius: "16px",
    },
  },
  toggleButton: {
    "&.Mui-selected": {
      backgroundColor: "#1976d2",
      color: "white",
      "&:hover": {
        backgroundColor: "#1565c0",
      },
    },
  },
  actionButton: {
    borderRadius: "8px",
    textTransform: "none",
    padding: "8px 16px",
    fontWeight: 600,
  },
  menuItem: {
    gap: "8px",
    padding: "12px 24px",
    "&:hover": {
      backgroundColor: "#f5f5f5",
    },
  },
};

const statusColors = {
  "Not-Hired": "#ff9800",
  Hired: "#4caf50",
};
const RecruitmentCandidate = () => {
  const [view, setView] = useState("grid");
  const [candidates, setCandidates] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("");
  const [groupBy, setGroupBy] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const [newCandidate, setNewCandidate] = useState({
    name: "",
    email: "",
    position: "",
    status: "Not-Hired",
    color: statusColors["Not-Hired"],
  });

  useEffect(() => {
    fetchCandidates();
  }, []);

  const fetchCandidates = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/applicantProfiles"
      );
      setCandidates(response.data);
    } catch (error) {
      showSnackbar("Error fetching candidates", "error");
    }
  };

  const handleCreateSubmit = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/applicantProfiles",
        newCandidate
      );
      setCandidates([...candidates, response.data]);
      setCreateDialogOpen(false);
      resetNewCandidate();
      showSnackbar("Candidate created successfully");
    } catch (error) {
      showSnackbar("Error creating candidate", "error");
    }
  };

  const handleDeleteCandidate = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/applicantProfiles/${id}`);
      setCandidates(candidates.filter((c) => c._id !== id));
      setDeleteDialogOpen(false);
      showSnackbar("Candidate deleted successfully");
    } catch (error) {
      showSnackbar("Error deleting candidate", "error");
    }
  };

  const handleStatusChange = (event) => {
    const status = event.target.value;
    setNewCandidate({
      ...newCandidate,
      status: status,
      color: statusColors[status],
    });
  };

  const showSnackbar = (message, severity = "success") => {
    setSnackbar({ open: true, message, severity });
  };

  const resetNewCandidate = () => {
    setNewCandidate({
      name: "",
      email: "",
      position: "",
      status: "Not-Hired",
      color: statusColors["Not-Hired"],
    });
  };

  const filteredCandidates = candidates.filter(
    (candidate) =>
      candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (filter ? candidate.status === filter : true)
  );

  const groupedCandidates = groupBy
    ? filteredCandidates.reduce((groups, candidate) => {
        const position = candidate.position;
        if (!groups[position]) groups[position] = [];
        groups[position].push(candidate);
        return groups;
      }, {})
    : { All: filteredCandidates };

  return (
    <Box sx={styles.root}>
      <Box maxWidth="1800px" margin="0 auto">
        <Paper elevation={0} sx={styles.header}>
          <Typography variant="h6" fontWeight="700" color="#1a2027">
            Recruitment Candidates
          </Typography>
          <Box sx={styles.actionButtons}>
            <TextField
              variant="outlined"
              placeholder="Search candidates..."
              size="small"
              InputProps={{
                startAdornment: <Search sx={{ color: "#94a3b8", mr: 1 }} />,
              }}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              sx={styles.searchBar}
            />

            <ToggleButtonGroup
              value={view}
              exclusive
              onChange={(e, nextView) => nextView && setView(nextView)}
              sx={{ backgroundColor: "white" }}
            >
              <ToggleButton value="list" sx={styles.toggleButton}>
                <List />
              </ToggleButton>
              <ToggleButton value="grid" sx={styles.toggleButton}>
                <GridView />
              </ToggleButton>
            </ToggleButtonGroup>

            <Button
              variant="outlined"
              startIcon={<FilterList />}
              onClick={() =>
                setFilter(
                  filter === "" ? "Hired" : filter === "Hired" ? "Not-Hired" : ""
                )
              }
              sx={styles.actionButton}
            >
              {filter || "All Status"}
            </Button>

            <Button
              variant="outlined"
              startIcon={<GroupWork />}
              onClick={() => setGroupBy(!groupBy)}
              sx={styles.actionButton}
            >
              {groupBy ? "Ungroup" : "Group by Position"}
            </Button>

            <Button
              variant="contained"
              startIcon={<Add />}
              onClick={() => setCreateDialogOpen(true)}
              sx={{
                ...styles.actionButton,
                backgroundColor: "#1976d2",
                "&:hover": { backgroundColor: "#1565c0" },
              }}
            >
              Add Candidate
            </Button>
          </Box>
        </Paper>

        {Object.entries(groupedCandidates).map(([position, candidates]) => (
          <Fade in={true} timeout={500} key={position}>
            <Box mb={4}>
              {groupBy && (
                <Typography
                  variant="h5"
                  fontWeight="600"
                  color="#1a2027"
                  sx={{ mb: 3, pl: 1 }}
                >
                  {position || "Unspecified Position"}
                </Typography>
              )}

              <Grid container spacing={3}>
                {candidates.map((candidate) => (
                  <Grid
                    item
                    xs={12}
                    md={view === "grid" ? 4 : 12}
                    key={candidate._id}
                  >
                    <Card
                      sx={{
                        ...styles.card,
                        borderLeft: `4px solid ${candidate.color}`,
                        backgroundColor: "white",
                      }}
                    >
                      <CardContent sx={styles.cardContent}>
                        <Box display="flex" alignItems="center" gap={2}>
                          <Avatar
                            sx={{
                              ...styles.avatar,
                              bgcolor: candidate.color,
                              color: "white",
                            }}
                          >
                            {(candidate?.name?.[0] || "U").toUpperCase()}
                          </Avatar>
                          <Box flexGrow={1}>
                            <Typography
                              variant="h6"
                              fontWeight="600"
                              color="#1a2027"
                            >
                              {candidate.name}
                            </Typography>
                            <Typography color="text.secondary" sx={{ mb: 1 }}>
                              {candidate.email}
                            </Typography>
                            <Typography
                              variant="body2"
                              sx={{
                                color: "#64748b",
                                fontWeight: 500,
                                mb: 1,
                              }}
                            >
                              {candidate.position}
                            </Typography>
                            <Chip
                              label={candidate.status}
                              sx={{
                                bgcolor: candidate.color,
                                color: "white",
                                ...styles.statusChip,
                              }}
                            />
                          </Box>
                          <IconButton
                            onClick={(e) => {
                              setAnchorEl(e.currentTarget);
                              setSelectedCandidate(candidate);
                            }}
                            sx={{
                              color: "#64748b",
                              "&:hover": {
                                backgroundColor: "#f1f5f9",
                              },
                            }}
                          >
                            <MoreVert />
                          </IconButton>
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Fade>
        ))}
      </Box>

      <Dialog
        open={createDialogOpen}
        onClose={() => setCreateDialogOpen(false)}
        PaperProps={{
          sx: {
            width: "600px",
            borderRadius: "20px",
            overflow: "hidden",
          },
        }}
      >
        <DialogTitle
          sx={{
            background: "linear-gradient(45deg, #1976d2, #64b5f6)",
            color: "white",
            fontSize: "1.5rem",
            fontWeight: 600,
            padding: "24px 32px",
            display: "flex",
            alignItems: "center",
            gap: 2,
          }}
        >
          Add New Candidate
        </DialogTitle>

        <DialogContent
          sx={{
            padding: "32px",
            backgroundColor: "#f8fafc",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 3,
            }}
          >
            <TextField
              fullWidth
              label="Name"
              name="name"
              value={newCandidate.name}
              onChange={(e) =>
                setNewCandidate({ ...newCandidate, name: e.target.value })
              }
              sx={{ mt:2,
                "& .MuiOutlinedInput-root": {
                  backgroundColor: "white",
                  borderRadius: "12px",
                  "&:hover fieldset": {
                    borderColor: "#1976d2",
                  },
                },
                "& .MuiInputLabel-root.Mui-focused": {
                  color: "#1976d2",
                },
                mt: 2
              }}
            />

            <TextField 
              fullWidth
              label="Email"
              name="email"
              type="email"
              value={newCandidate.email}
              onChange={(e) =>
                setNewCandidate({ ...newCandidate, email: e.target.value })
              }
              sx={{
                "& .MuiOutlinedInput-root": {
                  backgroundColor: "white",
                  borderRadius: "12px",
                  "&:hover fieldset": {
                    borderColor: "#1976d2",
                  },
                },
              }}
            />

            <TextField
              fullWidth
              label="Position"
              name="position"
              value={newCandidate.position}
              onChange={(e) =>
                setNewCandidate({ ...newCandidate, position: e.target.value })
              }
              sx={{
                "& .MuiOutlinedInput-root": {
                  backgroundColor: "white",
                  borderRadius: "12px",
                  "&:hover fieldset": {
                    borderColor: "#1976d2",
                  },
                },
              }}
            />

            <FormControl fullWidth>
              <InputLabel sx={{ "&.Mui-focused": { color: "#1976d2" } }}>
                Status
              </InputLabel>
              <Select
                value={newCandidate.status}
                onChange={handleStatusChange}
                label="Status"
                sx={{
                  backgroundColor: "white",
                  borderRadius: "12px",
                  "& .MuiOutlinedInput-notchedOutline": {
                    "&:hover": {
                      borderColor: "#1976d2",
                    },
                  },
                }}
              >
                <MenuItem value="Not-Hired" sx={{ color: "#f44336" }}>
                  Not Hired
                </MenuItem>
                <MenuItem value="Hired" sx={{ color: "#4caf50" }}>
                  Hired
                </MenuItem>
              </Select>
            </FormControl>
          </Box>
        </DialogContent>

        <DialogActions
          sx={{
            padding: "24px 32px",
            backgroundColor: "#f8fafc",
            borderTop: "1px solid #e0e0e0",
            gap: 2,
          }}
        >
          <Button
            onClick={() => setCreateDialogOpen(false)}
            sx={{
              border: "2px solid #1976d2",
              color: "#1976d2",
              "&:hover": {
                border: "2px solid #64b5f6",
                backgroundColor: "#e3f2fd",
                color: "#1976d2",
              },
              textTransform: "none",
              borderRadius: "8px",
              px: 3,
              fontWeight: 600,
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleCreateSubmit}
            variant="contained"
            sx={{
              background: "linear-gradient(45deg, #1976d2, #64b5f6)",
              fontSize: "0.95rem",
              textTransform: "none",
              padding: "8px 32px",
              borderRadius: "10px",
              boxShadow: "0 4px 12px rgba(25, 118, 210, 0.2)",
              "&:hover": {
                background: "linear-gradient(45deg, #1565c0, #42a5f5)",
              },
            }}
          >
            Create Candidate
          </Button>
        </DialogActions>
      </Dialog>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
        PaperProps={{
          elevation: 3,
          sx: {
            mt: 1,
            borderRadius: "8px",
            minWidth: "160px",
          },
        }}
      >
        <MenuItem
          onClick={() => {
            setDeleteDialogOpen(true);
            setAnchorEl(null);
          }}
          sx={styles.menuItem}
        >
          <Delete sx={{ color: "#ef4444" }} />
          <Typography color="#ef4444">Delete</Typography>
        </MenuItem>
      </Menu>

      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        sx={styles.dialog}
      >
        <DialogTitle sx={{ pb: 2, fontWeight: 600 }}>
          Delete Candidate
        </DialogTitle>
        <DialogContent>
          <Typography color="text.secondary">
            Are you sure you want to delete this candidate? This action cannot
            be undone.
          </Typography>
        </DialogContent>
        <DialogActions sx={{ p: 3, pt: 2 }}>
          <Button
            onClick={() => setDeleteDialogOpen(false)}
            sx={{
              border: "2px solid #1976d2",
              color: "#1976d2",
              "&:hover": {
                border: "2px solid #64b5f6",
                backgroundColor: "#e3f2fd",
                color: "#1976d2",
              },
              textTransform: "none",
              borderRadius: "8px",
              px: 3,
              fontWeight: 600,
            }}
          >
            Cancel

          </Button>
          <Button
            onClick={() => handleDeleteCandidate(selectedCandidate?._id)}
            color="error"
            variant="contained"
            sx={styles.actionButton}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          severity={snackbar.severity}
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          sx={{ borderRadius: "8px", fontWeight: 500 }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default RecruitmentCandidate;
