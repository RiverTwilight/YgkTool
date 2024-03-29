import React from "react";
import table from "./table";
import cem from "./dic";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import BorderColorSharpIcon from "@mui/icons-material/BorderColorSharp";
import FormControl from "@mui/material/FormControl";
import Input from "@mui/material/Input";
import InputAdornment from "@mui/material/InputAdornment";
import InputLabel from "@mui/material/InputLabel";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import ClipboardJS from "clipboard";

const Result = ({ result, eleClass }: any) => {
	if (result === "") return null;
	const pt = JSON.parse(table);
	let info: any = [];
	pt.map((stance: any) => {
		eleClass.map((ele: any) => {
			if (ele.ele === stance.symbol) info.push(stance);
		});
	});
	return (
		<>
			<br />

			<Paper component={Box} padding={2}>
				<Typography
					data-clipboard-text={"sdfasdf"}
					align="center"
					variant="h5"
					dangerouslySetInnerHTML={{ __html: result }}
				></Typography>
			</Paper>

			<br />

			<TableContainer component={Paper}>
				<Table aria-label="simple table">
					<TableHead>
						<TableRow>
							<TableCell>原子序数</TableCell>
							<TableCell>元素名</TableCell>
							<TableCell>相对原子质量</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{info.map((stance, i) => (
							<TableRow key={i}>
								<TableCell>{stance.atomicNumber}</TableCell>

								<TableCell>{stance.symbol}</TableCell>

								<TableCell>{stance.atomicMass}</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</>
	);
};

type UiState = any;

class Cem extends React.Component<{ classes: any }, UiState> {
	constructor(props: { classes: any } | Readonly<{ classes: any }>) {
		super(props);
		this.state = {
			input: "Cu + HNO3 = Cu(NO3)2 + NO2 + H2O",
			result: "",
			eleClass: [],
			snackbar: false,
		};
	}
	handleClose = () => {
		this.setState({
			snackbar: false,
		});
	};
	componentDidMount() {
		var clipboard = new ClipboardJS("h5");
		clipboard.on("success", (e) => {
			window.snackbar({
				message: "复制成功",
			});
			e.clearSelection();
		});
	}
	render() {
		return (
			<>
				<Paper
					component={Box}
					paddingBottom={1}
					paddingTop={3}
					paddingX={3}
				>
					<FormControl fullWidth>
						<InputLabel htmlFor="standard-adornment-amount">
							输入化学方程式
						</InputLabel>
						<Input
							onChange={(newText) => {
								this.setState({ input: newText.target.value });
							}}
							startAdornment={
								<InputAdornment position="start">
									<BorderColorSharpIcon />
								</InputAdornment>
							}
							value={this.state.input}
							multiline
							rows={2}
						/>
					</FormControl>
					<br />
					<br />
					<Box display="flex" justifyContent="flex-end">
						<Button
							onClick={() => {
								try {
									var library = cem(this.state.input);
									this.setState({
										result: library.result,
										eleClass: library.eleClass,
									});
								} catch (err) {
									console.log(err);
									window.snackbar({
										message: "方程式有误",
									});
								}
							}}
							variant="outlined"
							color="primary"
						>
							配平
						</Button>
					</Box>
				</Paper>
				<Result
					eleClass={this.state.eleClass}
					result={this.state.result}
				/>
			</>
		);
	}
}

export default Cem;
