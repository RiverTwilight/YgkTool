import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import { GetStaticProps } from "next";
import Placeholder from "@/components/Placeholder";
import PricingCard from "@/components/PricingCard";
import translator from "@/utils/translator";
import { styled } from "@mui/material/styles";
import OutlinedCard from "@/components/OutlinedCard/index";
import PaperBackground from "@/components/PaperBackground";
import { Alert } from "@mui/material";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
const Root = styled("div")(({ theme: Theme }) => ({
	maxWidth: "864px",
	margin: "0 auto",
	padding: `${Theme.spacing(2)}`,
	paddingBottom: "50px",
}));

const FREE_DONATION_WAYS = [
	{
		title: "支付宝",
		subtitles: ["你可以获得随机红包"],
		price: "¥0.1",
		href: "/image/alipay_pocket.png",
		bgColor: "#0e78ff",
		color: "#fff",
	},
	{
		title: "GitHub",
		subtitles: ["给我打个⭐"],
		price: "¥1.00",
		href: "https://github.com/rivertwilight/ygktool",
		bgColor: "#000",
		color: "#fff",
	},
	{
		title: "DigitalOcean",
		subtitles: ["注册后你可获得 $200"],
		price: "$100",
		href: "https://m.do.co/c/eed8a86797c9",
		bgColor: "linear-gradient(to top right, #031b4e 52%, #00359c)",
		color: "#fff",
	},
	{
		title: "Wise",
		subtitles: ["注册后你可获得 4500 元免费转账额度"],
		price: "¥450",
		href: "https://wise.com/invite/imc/renew279",
		bgColor: "#87eb5c",
		color: "#000",
	},
	{
		title: "N26",
		subtitles: ["注册后你可免费获得德国万事达银行卡一张"],
		price: "¥312",
		href: "https://n26.com/r/renjiew1161",
		bgColor: "#36a18c",
		color: "#fff",
	},
	{
		title: "OKX",
		subtitles: ["注册后你可获得神秘盲盒（最高50刀）"],
		price: "$50",
		href: "https://ouxyi.space/join/82087068",
		bgColor: "#000",
		color: "#fff",
	},
];

const PAIED_DONATION_WAYS = [
	{
		title: "☕一杯咖啡",
		price: "$2.00",
		href: "",
	},
	{
		title: "📗一本好书",
		price: "$5.00",
		href: "",
	},
];

export const getStaticProps: GetStaticProps = ({ locale }) => {
	const dic = require("../data/i18n.json");

	const trans = new translator(dic, locale);

	return {
		props: {
			currentPage: {
				title: "捐赠",
				description: trans.use(""),
				path: "/donate",
			},
			dic: JSON.stringify(trans.get()),
			locale,
		},
	};
};

const ProductItem = ({ href, ...props }) => (
	<Grid item xs={6} sm={4}>
		<OutlinedCard padding={1}>
			<CardContent>
				<Typography
					sx={{ fontSize: 14 }}
					color="text.secondary"
					gutterBottom
				>
					{props.title}
				</Typography>
				<Typography variant="h5" component="div">
					{props.price}
				</Typography>
				<Typography
					sx={{ height: { xs: "4em", sm: "2em" } }}
					variant="body2"
				>
					{props.subtitles}
				</Typography>
			</CardContent>
			<CardActions>
				<Link href={href} target="_blank">
					<Button
						sx={{ background: props.bgColor, color: props.color }}
						size="small"
					>
						前往
					</Button>
				</Link>
			</CardActions>
		</OutlinedCard>
	</Grid>
);

export default function Donate() {
	return (
		<PaperBackground contentWidth={900}>
			<Box height="200px">
				<Placeholder illustrationUrl="/illustration/undraw_fatherhood_-7-i19.svg" />
			</Box>

			<Typography variant="body1">
				感谢您对我们的开源项目的关注。我们的项目已经开发了三年多，这期间我投入了大量的时间、精力和金钱，包括购买域名和服务器。作为一名没有收入的学生，这一切对我来说是非常昂贵的。但是，我仍然坚守着对这个项目的热爱。如果您愿意，您可以通过捐赠来支持我们，帮助我们继续开发这个项目，使其对更多人有所帮助。我们非常感谢您的支持！
				<br />
				<br />
				无论哪种捐赠方式，都是对我们莫大的支持。所有的收益都将用于开发、维护、运行
				Geekits。
			</Typography>

			<br />
			{/* <Typography variant="h5">免费捐赠</Typography> */}
			<Alert severity="info">
				以下方式都是免费的，你只需要动动手指，我和你都能从中获益。
			</Alert>
			<Grid
				spacing={{ xs: 1, md: 2 }}
				sx={{ paddingY: (theme) => theme.spacing(1) }}
				container
			>
				{FREE_DONATION_WAYS.map((way) => (
					<ProductItem {...way} />
				))}
			</Grid>

			<br />

			{/* <Typography variant="h5">付费捐赠</Typography>
			<Grid
				spacing={1}
				sx={{ paddingY: (theme) => theme.spacing(1) }}
				container
			>
				{PAIED_DONATION_WAYS.map((way) => (
					<ProductItem {...way} />
				))}
			</Grid> */}
		</PaperBackground>
	);
}
