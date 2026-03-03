
export const logout = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        res.clearCookie('token', { httpOnly: true, secure: process.env.NODE_ENV === 'production' });
        res.status(200).json({ message: 'Logged out successfully' });
    } catch (error) {
        console.error("Logout Error:", error);
        res.status(500).json({ message: 'Error logging out', error: error.message });   
    }
};  