import React from "react";
import Drawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import Toolbar from '@mui/material/Toolbar';

const drawerWidth = 260;

const RightDrawer: React.FC<{
	open?: boolean;
	onClose?: () => void;
	children?: React.ReactNode;
}> = ({ children, open, onClose }) => {
	return (
		<Box
			component="nav"
			sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
			aria-label="mailbox folders"
		>
			<Drawer
				anchor="right"
				variant="temporary"
				open={!open}
				onClose={onClose}
				ModalProps={{
					keepMounted: true, // Better open performance on mobile.
				}}
				sx={{
					display: { xs: "block", sm: "none" },
					"& .MuiDrawer-paper": {
						boxSizing: "border-box",
						width: drawerWidth,
					},
				}}
			>
				<Box
					sx={{
						display: { xl: "block", sm: "none", xs: "none" },
					}}
				>
					<Toolbar />
				</Box>
				{children}
			</Drawer>
			<Drawer
				anchor="right"
				variant="persistent"
				sx={{
					display: { xs: "none", sm: "block" },
					"& .MuiDrawer-paper": {
						boxSizing: "border-box",
						width: drawerWidth,
					},
				}}
				open={open}
			>
				{children}
			</Drawer>
		</Box>
	);
};

export default RightDrawer;
