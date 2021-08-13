import {
	Card,
	CardActionArea,
	CardContent,
	CardMedia,
	CardProps,
	Typography,
	useTheme,
} from "@material-ui/core";
import React from "react";

const Campainha: React.FC<CardProps> = (props) =>  {
	const { palette, spacing } = useTheme()
	return (
		<Card
			{...props}
			style={{
				background: palette.primary.main,
				...props.style,
			}}
		>
			<CardActionArea
				style={{
					display: 'flex',
					justifyContent: 'center',
				}}
			>
				<CardMedia
					image={`${process.env.PUBLIC_URL}/img/bell-icon.png`}
					title="Campainha"
					height="64"
					component="img"
					style={{
						objectFit: 'contain',
						filter: 'invert(100%)',
						width: 'auto',
						margin: spacing(2),
					}}
				/>
				<CardContent style={{ flexGrow: 1 }}>
					<Typography
						variant="h5"
						component="h2"
						style={{
							color: palette.primary.contrastText,
							flexGrow: 1,
						}}
					>
						Chamar o Garçom
					</Typography>
				</CardContent>
			</CardActionArea>
		</Card>
	)
}
export default Campainha