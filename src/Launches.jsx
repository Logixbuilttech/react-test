import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";

const LaunchManager = () => {
  // State for managing data
  const [launches, setLaunches] = useState([]);
  const [newLaunch, setNewLaunch] = useState({
    name: "",
    username: "",
    email: "",
  });
  const [errors, setErrors] = useState({});
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedLaunchId, setSelectedLaunchId] = useState(null);

  // Pagination functions
  const handleChangePage = (event, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Dummy API URL
  const API_URL = "http://localhost:4000/launches";

  // Fetch data on component mount
  useEffect(() => {
    setLoading(true);
    axios
      .get(API_URL)
      .then((res) => setLaunches(res.data))
      .catch((err) => console.error("Error loading launches:", err))
      .finally(() => setLoading(false));
  }, []);

  // Text field handling
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewLaunch({ ...newLaunch, [name]: value });
    setErrors({ ...errors, [name]: "" }); // Clear individual field error
  };

  // Text field validation
  const validate = () => {
    let tempErrors = {};
    if (!newLaunch.name.trim()) tempErrors.name = "Name is required";
    if (!newLaunch.username.trim())
      tempErrors.username = "Username is required";
    if (!newLaunch.email.trim()) {
      tempErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newLaunch.email)) {
      tempErrors.email = "Invalid email address";
    }
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  // Create or update data
  const handleSubmit = () => {
    if (!validate()) return;
    if (editingId) {
      axios
        .put(`${API_URL}/${editingId}`, { ...newLaunch, id: editingId })
        .then((res) => {
          setLaunches(launches.map((l) => (l.id === editingId ? res.data : l)));
          setNewLaunch({ name: "", username: "", email: "" });
          setEditingId(null);
        })
        .catch((err) => console.error("Update error:", err));
    } else {
      axios
        .post(API_URL, newLaunch)
        .then((res) => {
          setLaunches([...launches, res.data]);
          setNewLaunch({ name: "", username: "", email: "" });
        })
        .catch((err) => console.error("Create error:", err));
    }
  };

  // Edit data
  const editLaunch = (launch) => {
    setNewLaunch({
      name: launch.name,
      username: launch.username,
      email: launch.email,
    });
    setEditingId(launch.id);
    setErrors({});
  };

  const handleDialogOpen = (id) => {
    setSelectedLaunchId(id);
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
    setSelectedLaunchId(null);
  };

  const handleDeleteConfirm = () => {
    if (selectedLaunchId) {
      axios
        .delete(`${API_URL}/${selectedLaunchId}`)
        .then(() => {
          setLaunches(launches.filter((l) => l.id !== selectedLaunchId));
          handleDialogClose(); // Close the dialog after deletion
        })
        .catch((err) => console.error(":Delete error", err));
    }
  };

  // Search filter
  const filteredLaunches = launches.filter(
    (launch) =>
      launch.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      launch.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      launch.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-5">
      <h2 className="mb-4">{editingId ? "Edit Launch" : "Add Launch"}</h2>
      <Box className="flex flex-col gap-4">
        <TextField
          name="name"
          label="Name"
          variant="outlined"
          value={newLaunch.name}
          onChange={handleChange}
          error={!!errors.name}
          helperText={errors.name}
        />
        <TextField
          name="username"
          label="User"
          variant="outlined"
          value={newLaunch.username}
          onChange={handleChange}
          error={!!errors.username}
          helperText={errors.username}
        />
        <TextField
          name="email"
          label="Email"
          variant="outlined"
          value={newLaunch.email}
          onChange={handleChange}
          error={!!errors.email}
          helperText={errors.email}
        />
        <Button onClick={handleSubmit} variant="contained">
          {editingId ? "Update" : "Create"}
        </Button>
      </Box>

      {/* Search Input */}
      <Box className="mt-12">
        <TextField
          label="Search"
          variant="outlined"
          fullWidth
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </Box>

      <TableContainer component={Paper} className="mt-4">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>User</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={4} align="center">
                  <CircularProgress />
                </TableCell>
              </TableRow>
            ) : filteredLaunches.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} align="center">
                  No launches available.
                </TableCell>
              </TableRow>
            ) : (
              filteredLaunches
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((launch) => (
                  <TableRow key={launch.id}>
                    <TableCell>{launch.name}</TableCell>
                    <TableCell>{launch.username}</TableCell>
                    <TableCell>{launch.email}</TableCell>
                    <TableCell>
                      <Button onClick={() => editLaunch(launch)}>Edit</Button>
                      <Button
                        onClick={() => handleDialogOpen(launch.id)}
                        color="error"
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
            )}
          </TableBody>
        </Table>
        <TablePagination
          component="div"
          count={filteredLaunches.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          rowsPerPageOptions={[5, 10, 15]}
        />
      </TableContainer>
      {/* Delete Confirmation Dialog */}
      <Dialog open={openDialog} onClose={handleDialogClose}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <p>Are you sure you want to delete this launch?</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDeleteConfirm} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default LaunchManager;
