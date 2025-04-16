import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { 
    Container, Paper, Typography, TextField, IconButton, Box,
    Button, Modal, Table, TableBody, TableCell, TableContainer,
    TableHead, TableRow, MenuItem, Stack, FormHelperText, Select, 
    FormControl, InputLabel, Dialog, DialogTitle, DialogContent,
    useMediaQuery, useTheme, DialogActions, Alert, CircularProgress,
    Snackbar
} from '@mui/material';
import {
    Add,
    Edit,
    Delete,
    Search,
    Close
} from '@mui/icons-material';

const apiBaseURL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000';

const validationSchema = Yup.object().shape({
    week: Yup.string().required('Week selection is required'),
    day: Yup.string().required('Day selection is required')
});

const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    borderRadius: 2,
    boxShadow: 24,
    p: 4
};

export default function CompanyHolidays() {
    const [companyHolidays, setCompanyHolidays] = useState([]);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [editId, setEditId] = useState(null);
    const [initialValues, setInitialValues] = useState({ week: '', day: '' });
    
    // Add responsive hooks
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));

    // Add delete confirmation dialog states
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [holidayToDelete, setHolidayToDelete] = useState(null);
    const [loading, setLoading] = useState(false);
    const [snackbar, setSnackbar] = useState({
        open: false,
        message: "",
        severity: "success",
    });

    useEffect(() => {
        fetchCompanyHolidays();
    }, []);

    const toSentenceCase = (str) => {
        return str
            .toLowerCase()
            .split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    };

    const fetchCompanyHolidays = async () => {
        try {
            const { data } = await axios.get(`${apiBaseURL}/api/companyHolidays`);
            setCompanyHolidays(data);
        } catch (err) {
            console.error('Error fetching company holidays:', err);
            showSnackbar('Error fetching company holidays', 'error');
        }
    };

    const handleSubmit = async (values, { resetForm }) => {
        try {
            setLoading(true);
            const formattedValues = {
                week: toSentenceCase(values.week),
                day: toSentenceCase(values.day)
            };
    
            if (isEditing) {
                await axios.put(`${apiBaseURL}/api/companyHolidays/${editId}`, formattedValues);
                showSnackbar('Holiday updated successfully');
            } else {
                await axios.post(`${apiBaseURL}/api/companyHolidays`, formattedValues);
                showSnackbar('Holiday added successfully');
            }
            fetchCompanyHolidays();
            setIsAddModalOpen(false);
            resetForm();
            setIsEditing(false);
            setEditId(null);
        } catch (err) {
            console.error('Error creating/updating company holiday:', err);
            showSnackbar('Error saving holiday', 'error');
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (holiday) => {
        setEditId(holiday._id);
        setIsEditing(true);
        setInitialValues({ week: holiday.week, day: holiday.day });
        setIsAddModalOpen(true);
    };

    // Replace direct delete with confirmation dialog
    const handleDeleteClick = (holiday) => {
        setHolidayToDelete(holiday);
        setDeleteDialogOpen(true);
    };

    const handleCloseDeleteDialog = () => {
        setDeleteDialogOpen(false);
        setHolidayToDelete(null);
    };

    const handleConfirmDelete = async () => {
        if (!holidayToDelete) return;
        
        try {
            setLoading(true);
            await axios.delete(`${apiBaseURL}/api/companyHolidays/${holidayToDelete._id}`);
            fetchCompanyHolidays();
            showSnackbar('Holiday deleted successfully');
        } catch (err) {
            console.error('Error deleting company holiday:', err);
            showSnackbar('Error deleting holiday', 'error');
        } finally {
            setLoading(false);
            handleCloseDeleteDialog();
        }
    };

    const showSnackbar = (message, severity = "success") => {
        setSnackbar({
            open: true,
            message,
            severity,
        });
    };

    const handleCloseSnackbar = () => {
        setSnackbar({
            ...snackbar,
            open: false,
        });
    };

    return (
        <Container maxWidth="xl" sx={{ mt: 4, mb: 4, px: isMobile ? 1 : 3 }}>
            <Snackbar
                open={snackbar.open}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
            >
                <Alert
                    onClose={handleCloseSnackbar}
                    severity={snackbar.severity}
                    sx={{ width: "100%" }}
                >
                    {snackbar.message}
                </Alert>
            </Snackbar>
            
            <Paper elevation={3} sx={{ p: isMobile ? 2 : 3, borderRadius: 2, backgroundColor: '#ffffff' }}>

                <Box sx={{
                    backgroundColor: 'white',
                    borderRadius: '12px',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                    padding: isMobile ? '16px' : isTablet ? '20px 24px' : '24px 32px',
                    marginBottom: '24px'
                }}>
                    <Stack 
                        direction={isMobile ? "column" : "row"} 
                        justifyContent="space-between" 
                        alignItems={isMobile ? "flex-start" : "center"}
                        spacing={isMobile ? 2 : 0}
                    >
                        <Typography 
                            variant={isMobile ? "h5" : "h4"} 
                            sx={{ 
                                fontWeight: 600, 
                                background: "#1976d2",
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                mb: isMobile ? 1 : 0
                            }}
                        >
                            Company Holidays
                        </Typography>
                        
                        <Stack 
                            direction={isMobile ? "column" : "row"} 
                            spacing={isMobile ? 1 : 2} 
                            alignItems={isMobile ? "stretch" : "center"}
                            width={isMobile ? "100%" : "auto"}
                        >
                            <TextField 
                                placeholder="Search holidays..." 
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                size="small"
                                fullWidth={isMobile}
                                sx={{
                                    width: isMobile ? "100%" : isTablet ? "200px" : "300px",
                                    '& .MuiOutlinedInput-root': {
                                        backgroundColor: '#f8fafc',
                                        borderRadius: '8px',
                                        '&:hover fieldset': {
                                            borderColor: '#1976d2',
                                        }
                                    }
                                }}
                                InputProps={{
                                    startAdornment: <Search sx={{ color: 'action.active', mr: 1 }} />
                                }}
                            />
                            
                            <Button
                                onClick={() => {
                                    setIsEditing(false);
                                    setInitialValues({ week: '', day: '' });
                                    setIsAddModalOpen(true);
                                }}
                                startIcon={<Add />}
                                fullWidth={isMobile}
                                sx={{
                                    background: 'linear-gradient(45deg, #1976d2, #64b5f6)',
                                    color: 'white',
                                    '&:hover': {
                                        background: 'linear-gradient(45deg, #1565c0, #42a5f5)',
                                    },
                                    textTransform: 'none',
                                    borderRadius: '8px',
                                    height: '40px',
                                    boxShadow: '0 2px 8px rgba(25, 118, 210, 0.25)'
                                }}
                                variant="contained"
                            >
                                Add Holiday
                            </Button>
                        </Stack>
                    </Stack>
                </Box>

                {/* table */}
                <Box 
                    sx={{
                        backgroundColor: 'white',
                        borderRadius: '12px',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                        overflow: 'auto', // Changed from 'hidden' to 'auto' for mobile scrolling
                        margin: '24px 0'
                    }}
                >
                    <Table sx={{ minWidth: isMobile ? 450 : 650 }}>
                        <TableHead>
                            <TableRow sx={{ backgroundColor: '#f8fafc' }}>
                                <TableCell sx={{ fontWeight: 600, color: '#475569', py: 2 }}>Week</TableCell>
                                <TableCell sx={{ fontWeight: 600, color: '#475569', py: 2 }}>Day</TableCell>
                                <TableCell align="right" sx={{ fontWeight: 600, color: '#475569', py: 2 }}>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {companyHolidays
                                .filter(holiday =>
                                    holiday.week.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                    holiday.day.toLowerCase().includes(searchTerm.toLowerCase())
                                )
                                .map((holiday) => (
                                    <TableRow 
                                        key={holiday._id}
                                        sx={{ 
                                            '&:hover': { backgroundColor: '#f8fafc' },
                                            transition: 'background-color 0.2s ease'
                                        }}
                                    >
                                        <TableCell sx={{ color: '#d013d1', fontWeight: 500 }}>
                                            {holiday.week}
                                        </TableCell>
                                        <TableCell sx={{ color: '#2563eb', fontWeight: 500 }}>
                                            {holiday.day}
                                        </TableCell>
                                        <TableCell align="right">
                                            <Stack 
                                                direction="row" 
                                                spacing={1} 
                                                justifyContent="flex-end"
                                                flexWrap={isMobile ? "wrap" : "nowrap"}
                                            >
                                                <IconButton 
                                                    onClick={() => handleEdit(holiday)}
                                                    size="small"
                                                    sx={{ 
                                                        color: '#1976d2',
                                                        '&:hover': { 
                                                            backgroundColor: '#e3f2fd',
                                                            transform: 'translateY(-1px)'
                                                        },
                                                        transition: 'all 0.2s ease'
                                                    }}
                                                >
                                                    <Edit fontSize="small" />
                                                </IconButton>
                                                <IconButton 
                                                    onClick={() => handleDeleteClick(holiday)}
                                                    size="small"
                                                    sx={{ 
                                                        color: '#ef4444',
                                                        '&:hover': { 
                                                            backgroundColor: '#fee2e2',
                                                            transform: 'translateY(-1px)'
                                                        },
                                                        transition: 'all 0.2s ease'
                                                    }}
                                                >
                                                    <Delete fontSize="small" />
                                                </IconButton>
                                            </Stack>
                                        </TableCell>
                                    </TableRow>
                                ))}
                        </TableBody>
                    </Table>
                </Box>

                {/* create holiday */}
                <Dialog 
                    open={isAddModalOpen} 
                    maxWidth="md"
                    fullWidth
                    fullScreen={isMobile}
                    PaperProps={{
                        sx: {
                            width: isMobile ? "100%" : isTablet ? "600px" : "700px",
                            maxWidth: "90vw",
                            borderRadius: isMobile ? "0" : "20px",
                            overflow: "hidden",
                            margin: isMobile ? 0 : undefined,
                            height: isMobile ? "100%" : undefined,
                        }
                    }}
                >
                    <DialogTitle
                        sx={{
                            background: 'linear-gradient(45deg, #1976d2, #64b5f6)',
                            color: 'white',
                            fontSize: isMobile ? "1.25rem" : "1.5rem",
                            fontWeight: 600,
                            padding: isMobile ? "16px 20px" : "24px 32px",
                            position: 'relative'
                        }}
                    >
                        {isEditing ? 'Edit Holiday' : 'Add Holiday'}
                        <IconButton
                            onClick={() => {
                                setIsAddModalOpen(false);
                                setIsEditing(false);
                                setEditId(null);
                            }}
                            sx={{
                                position: 'absolute',
                                right: 16,
                                top: '50%',
                                transform: 'translateY(-50%)',
                                color: 'white'
                            }}
                        >
                            <Close />
                        </IconButton>
                    </DialogTitle>

                    <DialogContent sx={{ padding: isMobile ? "20px" : "32px" }}>
                    <Formik
                            initialValues={initialValues}
                            validationSchema={validationSchema}
                            onSubmit={handleSubmit}
                            enableReinitialize
                        >
                            {({ isSubmitting, errors, touched }) => (
                                <Form>
                                    <Stack spacing={3} sx={{mt:2}}>
                                        <FormControl fullWidth error={touched.week && errors.week}>
                                            <InputLabel>Week</InputLabel>
                                            <Field
                                                as={Select}
                                                name="week"
                                                label="Week"
                                                sx={{ borderRadius: '8px' }}
                                            >
                                                {['First', 'Second', 'Third', 'Fourth', 'Fifth', 'All Weeks'].map((option) => (
                                                    <MenuItem key={option} value={option}>
                                                        {option}
                                                    </MenuItem>
                                                ))}
                                            </Field>
                                            {touched.week && errors.week && (
                                                <FormHelperText>{errors.week}</FormHelperText>
                                            )}
                                        </FormControl>

                                        <FormControl fullWidth error={touched.day && errors.day}>
                                            <InputLabel>Day</InputLabel>
                                            <Field
                                                as={Select}
                                                name="day"
                                                label="Day"
                                                sx={{ borderRadius: '8px' }}
                                            >
                                                {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((option) => (
                                                    <MenuItem key={option} value={option}>
                                                        {option}
                                                    </MenuItem>
                                                ))}
                                            </Field>
                                            {touched.day && errors.day && (
                                                <FormHelperText>{errors.day}</FormHelperText>
                                            )}
                                        </FormControl>

                                        <Stack 
                                            direction={isMobile ? "column" : "row"} 
                                            spacing={2} 
                                            justifyContent={isMobile ? "stretch" : "flex-end"} 
                                            sx={{ mt: 4 }}
                                        >
                                            <Button 
                                                onClick={() => setIsAddModalOpen(false)}
                                                fullWidth={isMobile}
                                                sx={{
                                                    border: '2px solid #1976d2',
                                                    color: '#1976d2',
                                                    '&:hover': {
                                                        border: '2px solid #64b5f6',
                                                        backgroundColor: '#e3f2fd',
                                                    },
                                                    borderRadius: '8px',
                                                    px: 4,
                                                    py: 1,
                                                    fontWeight: 600,
                                                    order: isMobile ? 1 : 0,
                                                    mt: isMobile ? 1 : 0,
                                                }}
                                            >
                                                Cancel
                                            </Button>
                                            <Button 
                                                type="submit"
                                                disabled={isSubmitting || loading}
                                                fullWidth={isMobile}
                                                sx={{
                                                    background: 'linear-gradient(45deg, #1976d2, #64b5f6)',
                                                    color: 'white',
                                                    '&:hover': {
                                                        background: 'linear-gradient(45deg, #1565c0, #42a5f5)',
                                                    },
                                                    borderRadius: '8px',
                                                    px: 4,
                                                    py: 1,
                                                    fontWeight: 600,
                                                    order: isMobile ? 0 : 1,
                                                }}
                                            >
                                                {loading ? (
                                                    <CircularProgress size={24} color="inherit" />
                                                ) : isEditing ? (
                                                    'Update'
                                                ) : (
                                                    'Add'
                                                )}
                                            </Button>
                                        </Stack>
                                    </Stack>
                                </Form>
                            )}
                        </Formik>
                    </DialogContent>
                </Dialog>

                {/* Delete Confirmation Dialog */}
                <Dialog
                    open={deleteDialogOpen}
                    onClose={handleCloseDeleteDialog}
                    PaperProps={{
                        sx: {
                            width: { xs: "95%", sm: "500px" },
                            maxWidth: "500px",
                            borderRadius: "20px",
                            overflow: "hidden",
                            margin: { xs: "8px", sm: "32px" },
                        },
                    }}
                >
                    <DialogTitle
                        sx={{
                            background: "linear-gradient(45deg, #f44336, #ff7961)",
                            fontSize: { xs: "1.25rem", sm: "1.5rem" },
                            fontWeight: 600,
                            padding: { xs: "16px 24px", sm: "24px 32px" },
                            color: "white",
                            display: "flex",
                            alignItems: "center",
                            gap: 1,
                        }}
                    >
                        <Delete />
                        Confirm Deletion
                    </DialogTitle>
                    <DialogContent 
                        sx={{
                            padding: { xs: "24px", sm: "32px" },
                            backgroundColor: "#f8fafc",
                            paddingTop: { xs: "24px", sm: "32px" },
                        }}
                    >
                        <Alert severity="warning" sx={{ mb: 2 }}>
                            Are you sure you want to delete this company holiday?
                        </Alert>
                        {holidayToDelete && (
                            <Box sx={{ mt: 2, p: 2, bgcolor: "#f8fafc", borderRadius: 2 }}>
                                <Typography variant="body1" fontWeight={600} color="#2c3e50">
                                    Holiday Details:
                                </Typography>
                                <Typography variant="body2" color="#d013d1" sx={{ mt: 1, fontWeight: 500 }}>
                                    Week: {holidayToDelete.week}
                                </Typography>
                                <Typography variant="body2" color="#2563eb" sx={{ fontWeight: 500 }}>
                                    Day: {holidayToDelete.day}
                                </Typography>
                            </Box>
                        )}
                    </DialogContent>
                    <DialogActions 
                        sx={{
                            padding: { xs: "16px 24px", sm: "24px 32px" },
                            backgroundColor: "#f8fafc",
                            borderTop: "1px solid #e0e0e0",
                            gap: 2,
                        }}
                    >
                        <Button
                            onClick={handleCloseDeleteDialog}
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
                            onClick={handleConfirmDelete}
                            variant="contained"
                            color="error"
                            disabled={loading}
                            startIcon={
                                loading ? <CircularProgress size={20} color="inherit" /> : null
                            }
                            sx={{
                                background: "linear-gradient(45deg, #f44336, #ff7961)",
                                fontSize: "0.95rem",
                                textTransform: "none",
                                padding: "8px 32px",
                                borderRadius: "10px",
                                boxShadow: "0 4px 12px rgba(244, 67, 54, 0.2)",
                                color: "white",
                                "&:hover": {
                                    background: "linear-gradient(45deg, #d32f2f, #f44336)",
                                },
                            }}
                        >
                            {loading ? "Deleting..." : "Delete"}
                        </Button>
                    </DialogActions>
                </Dialog>
            </Paper>
        </Container>
    );
}

